const TelegramBot = require('node-telegram-bot-api');
const { createClient } = require('@supabase/supabase-js');

// ➔ 1. CREDENTIALS SETUP
const TELEGRAM_TOKEN = '8701005184:AAGA1hguJ-wy8KfeCuBdwg1vi2CGdbA3vUc';
const SUPABASE_URL = 'https://ajperaygfzsgfksfugem.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_b3Df9dPRJBukv6WtXi1_qw_9bv91jUs';

// Initialize Cloud Database Connection
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize Telegram Bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// --- BOT LOGIC ---

// Command: /start (Checks if you exist in the database, if not, it creates you!)
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', chatId)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      // Create user profile - defaults automatically to $500 cash row settings
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ telegram_id: chatId }]);

      if (insertError) throw insertError;

      bot.sendMessage(chatId, "💰 Welcome to Nexus Finance! A brand new cloud wallet has been initialized for you with **$500.00 USD** dummy cash. Type /balance to view.");
    } else {
      bot.sendMessage(chatId, "👋 Welcome back to Nexus Finance! Type /balance to check your current holdings.");
    }
  } catch (err) {
    console.error("Database Error Detail:", err);
    bot.sendMessage(chatId, "❌ Database syncing... Please try typing /start again in a moment!");
  }
});

// Command: /balance (Pulls live cloud data instantly from Supabase)
bot.onText(/\/balance/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('balance')
      .eq('telegram_id', chatId)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      bot.sendMessage(chatId, "❌ Could not find a registered wallet. Please type /start first!");
    } else {
      bot.sendMessage(chatId, `💰 Live Cloud Balance: $${parseFloat(user.balance).toFixed(2)} USD`);
    }
  } catch (err) {
    console.error("Database Error Detail:", err);
    bot.sendMessage(chatId, "❌ Failed to fetch balance.");
  }
});

// 👨‍💻 DEVELOPER TESTING FEATURE: /testsend [amount]
// Directly simulates sending money to your Ghost User on Row 2
bot.onText(/\/testsend\s+(\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const amountToSend = parseInt(match[1], 10);

  try {
    // 1. Fetch your current live balance
    const { data: sender } = await supabase.from('users').select('balance').eq('telegram_id', senderId).single();
    
    if (parseFloat(sender.balance) < amountToSend) {
      return bot.sendMessage(chatId, "📉 Declined: You don't have enough dummy cash!");
    }

    // 2. Fetch Ghost Row Balance directly via ID entry 2
    const { data: ghost } = await supabase.from('users').select('balance').eq('id', 2).single();

    if (!ghost) {
      return bot.sendMessage(chatId, "❌ Error: Could not locate Row 2 in your Supabase sheet.");
    }

    // 3. Process the transfer math ledger
    const newSenderBalance = parseFloat(sender.balance) - amountToSend;
    const newGhostBalance = parseFloat(ghost.balance) + amountToSend;

    // 4. Force save changes straight to the cloud tables
    await supabase.from('users').update({ balance: newSenderBalance }).eq('telegram_id', senderId);
    await supabase.from('users').update({ balance: newGhostBalance }).eq('id', 2);

    bot.sendMessage(chatId, `💸 **Developer Ghost Transfer Successful!**\n\n💵 Amount: $${amountToSend}.00 USD pushed to Row 2.\n📉 Your remaining balance: **$${newSenderBalance.toFixed(2)} USD**.`);
  } catch (err) {
    console.error("Database Error Detail:", err);
    bot.sendMessage(chatId, "❌ Database error running the test code.");
  }
});

console.log("🚀 Live Supabase-connected bot engine is ready...");
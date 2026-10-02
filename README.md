# CHA Telegram ChatBot & Landing Page 🩸

Official automated chatbot and landing page repository for the **Cambodia Hemophilia Association (CHA)** (សមាគមជំងឺហេម៉ូហ្វីលាកម្ពុជា).

![CHA Project Preview](aseet%20cha.png)

---

## 📌 Project Overview

This project provides an automated 24/7 informational gateway for the **Cambodia Hemophilia Association**:
- **Landing Page (`index.html`)**: Mobile-first landing page with Khmer and English typography and direct CTA to connect to the bot.
- **Telegram Bot (`bot.js`)**: Telegram Bot engine powered by `node-telegram-bot-api` and Supabase cloud database integration.

---

## 🚀 Live Demo & Links

- **Telegram Bot**: [@Chacambodia_bot](https://t.me/Chacambodia_bot)
- **Organization**: Cambodia Hemophilia Association (CHA)

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3, Google Fonts (`Khmer OS Koulen`, `Noto Sans Khmer`, `Poppins`)
- **Backend / Bot**: Node.js, `node-telegram-bot-api`, `@supabase/supabase-js`
- **Database**: [Supabase](https://supabase.com/) PostgreSQL Cloud

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- Supabase Project credentials

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/ndxdigitalsupport/Cha_Bot_Landing-page.git
cd Cha_Bot_Landing-page
```

Install dependencies:
```bash
npm install
```

### 3. Running the Project

**Run the Telegram Bot:**
```bash
node bot.js
```

**Run the Landing Page:**
Simply open `index.html` in any web browser.

---

## 📁 Project Structure

```text
├── Asset Cha.png       # Design asset
├── aseet cha.png       # Phone preview mockup
├── bot.js              # Telegram bot server logic
├── cha logo small.png  # CHA icon logo
├── cha-logo-left.png   # Full horizontal CHA branding logo
├── index.html          # Landing page
├── package-lock.json   # Lockfile
├── package.json        # Dependencies & package configuration
└── README.md           # Project documentation
```

---

## 🤝 Contribution & License

Maintained by **NDX Digital Support** for the **Cambodia Hemophilia Association**.

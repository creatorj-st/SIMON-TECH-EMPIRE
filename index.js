require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

// Initialize bot with polling
const bot = new TelegramBot(TOKEN, {
  polling: true
});

// Initialize Express server
const app = express();
app.use(express.json());

// Bot start time for uptime calculation
const startTime = Date.now();

// =====================
// SYSTEM COMMANDS
// =====================

bot.onText(/\/start|\.start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `╭━━〔 🤖 SIMON TECH BOT 〕━━⬣
│
│ Welcome to SIMON TECH BOT
│ 
│ A powerful Telegram bot for 
│ WhatsApp control & automation
│
│ Use .menu to view all commands
│
╰━━━━━━━━━━━━━━━━━⬣`,
    {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [
          [{ text: ".menu" }, { text: ".help" }],
          [{ text: ".ping" }, { text: ".status" }]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    }
  );
});

bot.onText(/\.menu|\/menu/, (msg) => {
  const chatId = msg.chat.id;
  const menuText = `╭━━〔 🤖 SIMON TECH BOT MENU 〕━━⬣
│
├⊷ 👑 OWNER
│  ├ .owner - Bot owner info
│  ├ .addowner - Add owner
│  ├ .delowner - Remove owner
│  └ .ownermenu - Owner panel
│
├⊷ ⚙️ SYSTEM
│  ├ .menu - Show commands
│  ├ .help - Help information
│  ├ .ping - Check bot status
│  ├ .alive - Bot alive status
│  ├ .status - WhatsApp status
│  ├ .uptime - Bot uptime
│  ├ .info - Bot information
│  ├ .restart - Restart bot
│  ├ .version - Bot version
│  └ .about - About bot
│
├⊷ 👤 PROFILE
│  ├ .profile - Your profile
│  ├ .setname - Set username
│  ├ .setbio - Set biography
│  ├ .avatar - Set avatar
│  └ .mystats - Your statistics
│
├⊷ 👥 GROUP
│  ├ .groupinfo - Group info
│  ├ .grouplink - Group link
│  ├ .members - List members
│  ├ .admins - List admins
│  ├ .tagall - Tag all members
│  └ .groupstats - Stats
│
├⊷ 🔐 SECURITY
│  ├ .security - Security info
│  ├ .scan - Security scan
│  ├ .lock - Lock chat
│  ├ .unlock - Unlock chat
│  ├ .verify - Verify user
│  └ .audit - Audit log
│
├⊷ 🧠 AI
│  ├ .ai - AI chat
│  ├ .ask - Ask question
│  ├ .gpt - GPT response
│  ├ .translate - Translate text
│  ├ .summarize - Summarize text
│  └ .codeai - Code assistance
│
├⊷ 📥 DOWNLOAD
│  ├ .play - Play music
│  ├ .song - Download song
│  ├ .video - Download video
│  ├ .ytmp3 - YouTube to MP3
│  ├ .ytmp4 - YouTube to MP4
│  └ .tiktok - TikTok download
│
├⊷ 🎨 MEDIA
│  ├ .sticker - Make sticker
│  ├ .image - Create image
│  ├ .removebg - Remove background
│  ├ .enhance - Enhance image
│  ├ .compress - Compress media
│  └ .resize - Resize image
│
├⊷ 🎮 GAMES
│  ├ .tictactoe - Tic-tac-toe
│  ├ .hangman - Hangman game
│  ├ .riddle - Riddle game
│  ├ .chess - Chess game
│  ├ .dice - Roll dice
│  └ .coinflip - Flip coin
│
├⊷ 💰 ECONOMY
│  ├ .wallet - Your wallet
│  ├ .daily - Daily reward
│  ├ .work - Work for money
│  ├ .shop - View shop
│  ├ .buy - Buy item
│  └ .sell - Sell item
│
╰━━━━━━━━━━━━━━━━━⬣

Type a command to continue...`;

  bot.sendMessage(chatId, menuText, {
    parse_mode: "HTML"
  });
});

bot.onText(/\.ping|\/ping/, (msg) => {
  const chatId = msg.chat.id;
  const responseTime = Date.now();
  bot.sendMessage(chatId, "🏓 Pong! Bot is responding...", {
    parse_mode: "HTML"
  }).then(() => {
    const ping = Date.now() - responseTime;
    bot.editMessageText(`🏓 Pong!\n⚡ Response time: ${ping}ms`, {
      chat_id: chatId,
      message_id: msg.message_id
    }).catch(() => {});
  });
});

bot.onText(/\.status|\/status/, (msg) => {
  const chatId = msg.chat.id;
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  
  const statusText = `╭━━〔 BOT STATUS 〕━━⬣
│
├ 🟢 Status: ONLINE
├ ⏱ Uptime: ${uptime}s
├ 📊 Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB
├ 🔋 Battery: 100%
├ 📡 Connection: ACTIVE
├ 🌐 WhatsApp: DISCONNECTED
├ 📱 Device: Multi-Device
│
╰━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, statusText, {
    parse_mode: "HTML"
  });
});

bot.onText(/\.help|\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpText = `╭━━〔 HELP 〕━━⬣
│
│ SIMON TECH BOT is a powerful
│ Telegram bot for WhatsApp control
│
│ 📖 How to use:
│
│ 1️⃣ Type .menu for all commands
│ 2️⃣ Use dot (.) before commands
│ 3️⃣ Example: .ping
│ 4️⃣ For help: .help or /help
│
│ 🔗 Links:
│ GitHub: github.com/creatorj-st
│ Support: @SimonTechSupport
│
│ 👨‍💻 Developer: Simon Tech
│ 📱 WhatsApp: 09166265317
│
╰━━━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, helpText, {
    parse_mode: "HTML"
  });
});

bot.onText(/\.owner|\/owner/, (msg) => {
  const chatId = msg.chat.id;
  const ownerText = `╭━━〔 👑 OWNER INFO 〕━━⬣
│
├ 👨‍💻 Name: Simon Tech
├ 📱 WhatsApp: 09166265317
├ 🌐 Website: simon-tech.com
├ 🐙 GitHub: creatorj-st
├ 📧 Email: contact@simon-tech.com
│
│ 💬 Contact Owner:
│ /contact - Send message
│
╰━━━━━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, ownerText, {
    parse_mode: "HTML"
  });
});

bot.onText(/\.uptime|\/uptime/, (msg) => {
  const chatId = msg.chat.id;
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;

  bot.sendMessage(
    chatId,
    `⏱️ Bot Uptime:\n\n${days}d ${hours}h ${minutes}m ${seconds}s`,
    {
      parse_mode: "HTML"
    }
  );
});

bot.onText(/\.alive|\/alive/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `✅ Yes, I'm alive!\n\n🤖 SIMON TECH BOT is running smoothly.\n\nUse .menu for commands.`,
    {
      parse_mode: "HTML"
    }
  );
});

bot.onText(/\.version|\/version/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `📦 Bot Version: 1.0.0\n⚙️ Node.js: ${process.version}\n📅 Last Update: ${new Date().toDateString()}`,
    {
      parse_mode: "HTML"
    }
  );
});

bot.onText(/\.about|\/about/, (msg) => {
  const chatId = msg.chat.id;
  const aboutText = `╭━━〔 ABOUT 〕━━⬣
│
│ SIMON TECH BOT v1.0.0
│
│ 🤖 Features:
│  • Telegram Integration
│  • WhatsApp Control
│  • Command Processing
│  • Auto Replies
│  • Group Management
│  • Security Features
│  • AI Integration
│  • Media Processing
│
│ 🚀 Powered by:
│  • Node.js
│  • Telegram Bot API
│  • Express.js
│
│ 📜 License: MIT
│
╰━━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, aboutText, {
    parse_mode: "HTML"
  });
});

// =====================
// ERROR HANDLING
// =====================

bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
});

bot.on("error", (error) => {
  console.error("Bot error:", error.message);
});

// =====================
// EXPRESS SERVER
// =====================

app.get("/", (req, res) => {
  res.json({
    status: "online",
    bot: "SIMON TECH BOT",
    version: "1.0.0",
    uptime: Math.floor((Date.now() - startTime) / 1000)
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✅ SIMON TECH BOT is running on port ${PORT}`);
  console.log(`🤖 Bot Status: Online`);
  console.log(`📊 Started at: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n⛔ Bot shutting down...");
  bot.stopPolling();
  process.exit(0);
});

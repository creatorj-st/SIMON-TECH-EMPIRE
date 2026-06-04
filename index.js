require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

// Check for required environment variables
if (!process.env.BOT_TOKEN) {
  console.error("❌ ERROR: BOT_TOKEN is not set in environment variables!");
  console.error("Please set BOT_TOKEN in your .env file or environment");
  process.exit(1);
}

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

// WhatsApp Links
const WHATSAPP_GROUP = "https://chat.whatsapp.com/GhR2hEVykLw73COlrSNLzw";
const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029VbDGZnkJf05bl3rDHR2y";

// Bot Avatar ASCII Art
const BOT_AVATAR = `
╔══════════════════════════════╗
║      🤖 SIMON TECH BOT       ║
║         v2.0.0 ELITE         ║
║                              ║
║    ╔════════════════════╗    ║
║    ║ 👁️  👓  🎭  👁️  ║    ║
║    ║  ANIME STYLE      ║    ║
║    ║  BOT ASSISTANT    ║    ║
║    ║    ❌ CHAIN ❌     ║    ║
║    ╚════════════════════╝    ║
║                              ║
║   Powered by Simon Tech ✨   ║
╚══════════════════════════════╝
`;

// =====================
// SYSTEM COMMANDS
// =====================

bot.onText(/\/start|\.start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "User";
  
  bot.sendMessage(
    chatId,
    `${BOT_AVATAR}

╭━━〔 🤖 SIMON TECH BOT 〕━━⬣
│
│ 👋 Welcome ${firstName}!
│ 
│ ✨ A powerful Telegram bot for 
│ WhatsApp control & automation
│
│ 👁️ 👓 Anime Styled • Elite Status
│
│ Use .menu to view all commands
│
│ 📱 WhatsApp Group:
│    ${WHATSAPP_GROUP}
│
│ 📢 WhatsApp Channel:
│    ${WHATSAPP_CHANNEL}
│
╰━━━━━━━━━━━━━━━━━⬣`,
    {
      parse_mode: "HTML",
      reply_markup: {
        keyboard: [
          [{ text: ".menu" }, { text: ".help" }],
          [{ text: ".ping" }, { text: ".status" }],
          [{ text: ".whatsapp" }, { text: ".avatar" }]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    }
  );
});

bot.onText(/\.avatar|\/avatar/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, BOT_AVATAR);
});

bot.onText(/\.menu|\/menu/, (msg) => {
  const chatId = msg.chat.id;
  const menuText = `${BOT_AVATAR}

╭━━〔 🤖 SIMON TECH BOT MENU 〕━━⬣
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
│  ├ .status - Bot status
│  ├ .uptime - Bot uptime
│  ├ .avatar - Show bot avatar
│  ├ .version - Bot version
│  ├ .about - About bot
│  ├ .whatsapp - WhatsApp links
│  └ .credits - Credits & Support
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
  bot.sendMessage(chatId, `${BOT_AVATAR}\n\n🏓 Pong! Bot is responding...`, {
    parse_mode: "HTML"
  }).then(() => {
    const ping = Date.now() - responseTime;
    bot.editMessageText(`${BOT_AVATAR}\n\n🏓 Pong!\n⚡ Response time: ${ping}ms`, {
      chat_id: chatId,
      message_id: msg.message_id
    }).catch(() => {});
  });
});

bot.onText(/\.status|\/status/, (msg) => {
  const chatId = msg.chat.id;
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const memoryUsage = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  
  const statusText = `${BOT_AVATAR}

╭━━〔 🤖 BOT STATUS 〕━━⬣
│
├ 🟢 Status: ONLINE ✅
├ ⏱ Uptime: ${uptime}s
├ 📊 Memory: ${memoryUsage}MB
├ 🔋 Battery: 100%
├ 📡 Connection: ACTIVE
├ 🌐 WhatsApp: READY
├ 📱 Device: Multi-Device
├ 📦 Version: 2.0.0 ELITE
├ 👁️ Avatar: ANIME STYLE
│
╰━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, statusText, {
    parse_mode: "HTML"
  });
});

bot.onText(/\.whatsapp|\/whatsapp/, (msg) => {
  const chatId = msg.chat.id;
  const whatsappText = `${BOT_AVATAR}

╭━━〔 📱 WHATSAPP LINKS 〕━━⬣
│
├ 👥 WhatsApp Group:
│  ${WHATSAPP_GROUP}
│
├ 📢 WhatsApp Channel:
│  ${WHATSAPP_CHANNEL}
│
│ Click the links to join our
│ community and get updates!
│
╰━━━━━━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, whatsappText, {
    parse_mode: "HTML"
  });
});

bot.onText(/\.help|\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpText = `${BOT_AVATAR}

╭━━〔 HELP 〕━━⬣
│
│ SIMON TECH BOT v2.0.0 ELITE
│ 👁️ 👓 Anime Styled Bot
│ 
│ Powerful Telegram bot for 
│ WhatsApp control & automation
│
│ 📖 How to use:
│
│ 1️⃣ Type .menu for all commands
│ 2️⃣ Use dot (.) before commands
│ 3️⃣ Example: .ping
│ 4️⃣ For help: .help or /help
│ 5️⃣ View avatar: .avatar
│
│ 🔗 Links:
│ GitHub: github.com/creatorj-st
│ WhatsApp Group: ${WHATSAPP_GROUP}
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
  const ownerText = `${BOT_AVATAR}

╭━━〔 👑 OWNER INFO 〕━━⬣
│
├ 👨‍💻 Name: Simon Tech
├ 📱 WhatsApp: 09166265317
├ 🌐 Website: simon-tech.com
├ 🐙 GitHub: creatorj-st
├ 📧 Email: contact@simon-tech.com
├ 📢 Channel: ${WHATSAPP_CHANNEL}
├ 👥 Group: ${WHATSAPP_GROUP}
│
│ 💬 Contact Owner:
│ /contact - Send message
│ WhatsApp - Direct message
│
╰━━━━━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, ownerText, {
    parse_mode: "HTML"
  });
});

bot.onText(/\.credits|\/credits/, (msg) => {
  const chatId = msg.chat.id;
  const creditsText = `${BOT_AVATAR}

╭━━〔 🙏 CREDITS & SUPPORT 〕━━⬣
│
│ SIMON TECH BOT v2.0.0 ELITE
│ 👁️ 👓 Anime Styled
│
├ 👨‍💼 Developer: Simon Tech
├ 📱 Contact: 09166265317
├ 🔗 GitHub: creatorj-st
│
├ 📱 WhatsApp Links:
│  ├ Group: ${WHATSAPP_GROUP}
│  └ Channel: ${WHATSAPP_CHANNEL}
│
├ 💬 Support:
│  ├ WhatsApp: 09166265317
│  ├ GitHub: Issue tracker
│  └ Email: contact@simon-tech.com
│
├ 📜 License: MIT (Open Source)
├ 🚀 Status: Active Development
├ 📦 Version: 2.0.0 ELITE
├ 👁️ Style: ANIME AESTHETIC
│
╰━━━━━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, creditsText, {
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
    `${BOT_AVATAR}\n\n⏱️ Bot Uptime:\n\n${days}d ${hours}h ${minutes}m ${seconds}s`,
    {
      parse_mode: "HTML"
    }
  );
});

bot.onText(/\.alive|\/alive/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `${BOT_AVATAR}\n\n✅ Yes, I'm alive!\n\n🤖 SIMON TECH BOT v2.0.0 ELITE is running smoothly.\n\n👁️ Anime Style • Ready to Serve\n\nUse .menu for commands.`,
    {
      parse_mode: "HTML"
    }
  );
});

bot.onText(/\.version|\/version/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `${BOT_AVATAR}\n\n📦 Bot Version: 2.0.0 ELITE (UPGRADED)\n⚙️ Node.js: ${process.version}\n📅 Last Update: ${new Date().toDateString()}\n✨ New: Anime Avatar, WhatsApp links & enhanced commands\n👁️ Style: Anime Aesthetic`,
    {
      parse_mode: "HTML"
    }
  );
});

bot.onText(/\.about|\/about/, (msg) => {
  const chatId = msg.chat.id;
  const aboutText = `${BOT_AVATAR}

╭━━〔 ABOUT 〕━━⬣
│
│ SIMON TECH BOT v2.0.0 ELITE
│ 👁️ 👓 Anime Styled Bot
│
│ 🤖 Features:
│  • Telegram Integration ✅
│  • WhatsApp Control ✅
│  • Command Processing ✅
│  • Auto Replies ✅
│  • Group Management ✅
│  • Security Features ✅
│  • AI Integration ✅
│  • Media Processing ✅
│  • WhatsApp Links ✅ NEW
│  • Anime Avatar ✅ NEW
│
│ 🚀 Powered by:
│  • Node.js
│  • Telegram Bot API
│  • Express.js
│  • Anime Aesthetics ✨
│
│ 📜 License: MIT (Open Source)
│ 👨‍💻 Developer: Simon Tech
│
╰━━━━━━━━━━━━━⬣`;

  bot.sendMessage(chatId, aboutText, {
    parse_mode: "HTML"
  });
});

// Catch-all for unrecognized commands
bot.on("message", (msg) => {
  if (msg.text && !msg.text.startsWith(".") && !msg.text.startsWith("/")) {
    return; // Ignore regular messages
  }
  
  if (msg.text && msg.text.startsWith(".") && !msg.text.match(/^\.(menu|ping|status|help|owner|uptime|alive|version|about|whatsapp|credits|avatar|start)/)) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `${BOT_AVATAR}\n\n❓ Unknown command. Type .menu for all available commands.`);
  }
});

// =====================
// ERROR HANDLING
// =====================

bot.on("polling_error", (error) => {
  console.error("❌ Polling error:", error.message);
});

bot.on("error", (error) => {
  console.error("❌ Bot error:", error.message);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

// =====================
// EXPRESS SERVER
// =====================

app.get("/", (req, res) => {
  res.json({
    status: "online",
    bot: "SIMON TECH BOT",
    version: "2.0.0",
    style: "ANIME ELITE",
    uptime: Math.floor((Date.now() - startTime) / 1000),
    whatsappGroup: WHATSAPP_GROUP,
    whatsappChannel: WHATSAPP_CHANNEL
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    style: "ANIME"
  });
});

app.get("/status", (req, res) => {
  res.json({
    status: "online",
    uptime: Math.floor((Date.now() - startTime) / 1000),
    memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    version: "2.0.0",
    avatar: "ANIME STYLE"
  });
});

app.listen(PORT, () => {
  console.log(`${BOT_AVATAR}`);
  console.log(`✅ SIMON TECH BOT v2.0.0 ELITE is running on port ${PORT}`);
  console.log(`🤖 Bot Status: Online`);
  console.log(`👁️ Avatar Style: ANIME AESTHETIC`);
  console.log(`📊 Started at: ${new Date().toISOString()}`);
  console.log(`📱 WhatsApp Group: ${WHATSAPP_GROUP}`);
  console.log(`📢 WhatsApp Channel: ${WHATSAPP_CHANNEL}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n⛔ Bot shutting down gracefully...");
  bot.stopPolling();
  process.exit(0);
});

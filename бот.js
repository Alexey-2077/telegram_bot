const TelegramBot = require('node-telegram-bot-api');
const Filter = require('bad-words');
const fs = require('fs');
const rateLimiter = require('rate-limiter');
const chai = require('chai');
const expect = chai.expect;

const BAN_DURATION = 60; // секунд

function log(message) {
  fs.appendFileSync('bot.log', `${Date.now()} ${message}\n`);
}

const config = require('./config.json');

const bot = new TelegramBot(config.token, { polling: true });

const limiter = new rateLimiter({
  interval: 1000, // 1 request per second
  max: 100, // 100 requests per 1000 seconds
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  log(`Получено сообщение от ${msg.from.username}: ${msg.text}`);

  if (limiter.get(userId) > 100) {
    bot.sendMessage(chatId, 'Слишком много запросов. Пожалуйста, подождите.');
    return;
  }

  if (msg.text === '/start') {
    bot.sendMessage(chatId, 'Привет! Это бот для ...');
  } else if (msg.text === '/help') {
    bot.sendMessage(chatId, 'Список доступных команд: ...');
  } else if (msg.text === '/ban') {
    if (config.admins.includes(userId)) {
      // ...
    } else {
      bot.sendMessage(chatId, 'У вас нет прав для использования этой команды.');
    }
  } else {
    if (isBanned(msg.text)) {
      banUser(chatId, userId);
    }
  }
});

function isBanned(text) {
  return filter.isProfane(text);
}

async function banUser(chatId, userId) {
  try {
    const banReason = filter.clean(msg.text);
    await bot.sendMessage(userId, banReason);
    await bot.banChatMember(chatId, userId, { until_date: Date.now() / 1000 + BAN_DURATION });
    console.log('клоун забанен');
  } catch (error) {
    console.error('Ошибка бана:', error);
  }
}

describe('Bot', () => {
  it('should send a message', () => {
    const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: false });
    const chatId = 123456789;
    const text = 'Привет!';

    bot.sendMessage(chatId, text);

    // ...
  });
});

npm test


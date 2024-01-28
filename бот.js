const TelegramBot = require('node-telegram-bot-api');
const Filter = require('bad-words');
const token = 'здесь должен быть твой токен';
const bot = new TelegramBot(token, { polling: true });

const BAN_DURATION = 60; // секунд

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

bot.on('message', async (msg) => {
  const { chat: { id: chatId }, from: { id: userId } } = msg;

  if (isBanned(msg.text)) {
    await banUser(chatId, userId);
  }
});

function isBanned(text) {
  return filter.isProfane(text);
}

const filter = new Filter();


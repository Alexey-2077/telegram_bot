const TelegramBot = require('node-telegram-bot-api');
const Filter = require('bad-words');
let filter = new Filter();
const token = 'здесь должен быть твой токен';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Слова, за которые будет раздача банов
  const bannedWords = ['крипта', 'лс', 'заработок'];

  // Проверка наличие запрещенных слов в сообщении
  if (filter.isProfane(msg.text) || bannedWords.some(word => msg.text.toLowerCase().includes(word))) {
    const banReason = 'Вы устроили цирк, по этой причине вы покинули чат';

    // Отправляем информацию о причине бана в личные сообщения
    bot.sendMessage(userId, banReason);

    // Баним пользователя на 60 секунд
    bot.banChatMember(chatId, userId, { until_date: Date.now() / 1000 + 60 });

    console.log('клоун забанен');
  }
});
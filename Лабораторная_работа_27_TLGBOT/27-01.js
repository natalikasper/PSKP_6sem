const TOKEN = '1133558052:AAFVb-jOhk6RfFgvEWY1yQC9WuKkSihrF1k';
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN, {polling:true});

bot.onText(/(.)/, msg =>{
    bot.sendMessage(msg.chat.id, 'echo: ' + msg.text);
});
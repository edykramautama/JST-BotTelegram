var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1855816107:AAEQSd42C0VCw8Q2SVAm7bB1yZJ3dq6Yrwo'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /menu to main menu`
    );   
});

bot.onText(/\/menu/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `this is your main menu`
    );   
});

// routers
r.get('/prediction/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;

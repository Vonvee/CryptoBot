const TelegramBot = require('node-telegram-bot-api');
const token = '380213482:AAEyv3lVrOkandYIMBeR_SI6LUikEOBPTho';
const bot = new TelegramBot(token, {polling: true});
let price = require('./lib/price')


//Bot part
bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["BTC price"],["ETH price"],["LTC price"],["BCH price"]]
        }
    });

    // var date = new Date();
    // var current_hour = date.getHours();
    // var min  = date.getMinutes();
    // if(date.getMinutes()==7){
    //     bot.sendMessage(msg.chat.id, "HELLO THERE!");
    // }

});

bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, "Hello dear user");
    }
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again. Bye!");
    }

    var text = msg.text.toLowerCase()
    switch(true) {
        case text.includes("btc"):
            price.getCryptoPrice("usd", "BTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH
                bot.sendMessage(msg.chat.id, obj.price + "$", {
                    "reply_markup": {
                        "keyboard": [["BTC price"],["ETH price"],["LTC price"],["BCH price"]]
                    }
                });
            }).catch(err => {
                console.log(err)
            })
            break;
        case text.includes("eth"):
            price.getCryptoPrice("usd", "ETH").then(obj => { // Base for ex - USD, Crypto for ex - ETH
                bot.sendMessage(msg.chat.id, obj.price + "$", {
                    "reply_markup": {
                        "keyboard": [["BTC price"],["ETH price"],["LTC price"],["BCH price"]]
                    }
                });
            }).catch(err => {
                console.log(err)
            })
            break;
        case text.includes("ltc"):
            price.getCryptoPrice("usd", "LTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH
                bot.sendMessage(msg.chat.id, obj.price + "$", {
                    "reply_markup": {
                        "keyboard": [["BTC price"],["ETH price"],["LTC price"],["BCH price"]]
                    }
                });
            }).catch(err => {
                console.log(err)
            })
            break;
        case text.includes("bch"):
            price.getCryptoPrice("usd", "BCH").then(obj => { // Base for ex - USD, Crypto for ex - ETH
                bot.sendMessage(msg.chat.id, obj.price + "$", {
                    "reply_markup": {
                        "keyboard": [["BTC price"],["ETH price"],["LTC price"],["BCH price"]]
                    }
                });
            }).catch(err => {
                console.log(err)
            })
            break;
        default:
            price.getCryptoPrice("usd", text).then(obj => { // Base for ex - USD, Crypto for ex - ETH
                bot.sendMessage(msg.chat.id, obj.price + "$", {
                    "reply_markup": {
                        "keyboard": [["BTC price"],["ETH price"],["LTC price"],["BCH price"]]
                    }
                });
            }).catch(err => {
                console.log("There is no such crypto-currency")
            })
            break;
    }
});

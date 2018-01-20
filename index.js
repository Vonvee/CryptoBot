const TelegramBot = require('node-telegram-bot-api');
const token = '380213482:AAEyv3lVrOkandYIMBeR_SI6LUikEOBPTho';
const bot = new TelegramBot(token, {polling: true});

//Get BTC course
function getBTCCourse(cb) {
    var http = require('http');
    var amount = "123"
    http.get({
            host: 'api.coindesk.com',
            path: '/v1/bpi/currentprice.json'
        },
        function (response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                cb(parsed)
            });
        }
    );
}


//Bot part
bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["How much BTC is?"]]
        }
    });

});

bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, "Hello dear user");
    }
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }

    var btc = "BTC"
    var howmuch = "How much BTC is?";
    var btc_current = 0
    var parse = 0
    var b = 0
    getBTCCourse(function(parsed) {
        amount = parsed.bpi.USD.rate;

        if (msg.text.toLowerCase().includes(btc.toLowerCase()) || msg.text.toLowerCase().includes("Bit") || msg.text.toLowerCase().includes("coin")) {
            bot.sendMessage(msg.chat.id, amount+"$`", {
                "reply_markup": {
                    "keyboard": [["How much BTC is?"]]
                }
            });
        }
    });

});

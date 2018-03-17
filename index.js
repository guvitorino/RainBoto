const {Wit, log} = require('node-wit');
const express = require('express');
const BodyParser = require('body-parser');
const request = require('request');

var app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));

app.get('/webhook', (req, res) => {
    if (req.query['hub-mode'] === 'subscribe' && req.query['hub_verify_token'] === 'senha') {
        console.log('Okay');
        res.status(200).send(req.query['hub-challenge']);
    } else {
        console.log('Errrou');
        res.status(403);
    }
});

app.post('/webhook', (req, res) => {
    const data = req.body;

    if (data && data.objetc === 'page') {
        data.entry.array.forEach((entry) => {
            const pageId = entry.id;
            const timeOfEvent = entry.time;

            entry.messanging.forEach((event) => {
                if (event.message) {
                    console.log();
                }
            });
        });
        res.sendStatus(200);
    }
});

const responseUser = (event) => {
    const senderId = event.sender.id;
    const recipientId = event.recipient.id;
    const timeOfMessage = event.timestamp;
    const message = event.message;
    
    sendMessage(senderId, 'Yo');

};

const callSendAPI = (messageData) => {
    request({
        uri: 'https://graph.facebook.com/v2.8/me/messages',
        qs: {access_token: 'EAADM00gxo0oBAH0Pm1uxY2Fzp6ThJBXV8eWZCvSZC1qCb29AHeYEFc8dHZAO8hJN1bTFOYeq2ea78vk9Kkzugb4ytNZAP0uum9mxyaWmqismBVpjZBteP0Aje7BIrXDt0jCGbHDNZB84cVsvMdXVeKoso9ZAKfr90ZCWZChHI1c8uc84Vz8ZBxD2fc'},
        method: 'POST',
        json: messageData
    }, (err, res, body) => {
        if(!err && res.statusCode === 200) {

        }
    });
};


const sendMessage = (recipientId, messageText) => {
    const messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };

    callSendAPI(messageData);
};

app.listen(5000);

/*const client = new Wit({accessToken: 'WCPZBEGFMN3COY62XVZD4DGL3EN44VLA'});
client.message('what is the weather in London?', {})
.then((data) => {
  console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
})
.catch(console.error);*/
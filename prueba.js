const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client,LocalAuth  } = require('whatsapp-web.js');
let client;

const withSession = () => {
    client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true }
    });
    
    client.on('auth_failure', msg => {
        console.error('AUTHENTICATION FAILURE', msg);
    });

    client.on('ready', () => {
        console.log("Client Ready")
        listenMessage();
    });
    
    client.initialize();
}

const withOutSession = () => {
    client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true }
    });
    
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });
    
    client.on('authenticated', () => {
        console.log('AUTHENTICATED'); 
    });

    client.on('ready', () => {
        console.log("Client Ready");
    });

    client.initialize();
}

const listenMessage = () => {
    client.on('message',(msg) =>{
        const{from, to, body} = msg;
        console.log(from,to,body)
    })
}
const sendMessage = (to, message) => {
    client.sendMessage(to, message)
}

(fs.existsSync("./.wwebjs_auth")) ? withSession() : withOutSession();
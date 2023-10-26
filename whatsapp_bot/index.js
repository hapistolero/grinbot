const qrcode = require('qrcode-terminal');
const {printOrder} = require('./command/printOrder')
const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log(session);
});

client.initialize();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});



client.on('message',async (message) => {

    if(message.body.includes('/printOrder')){
        printOrder(message,client,MessageMedia)
        
       
    }else if(message.body.includes('/h')){
        message.reply(`✨daftar perintah grinbot\n1. /printOrder(mencari stiker print dan menuliskan detailnya sesuai assets yang ada)`)

    }else if(message.body.includes('/grinbot')){
        message.reply(`🤖  halo saya grinbot by hapistolero😎.\napa yang bisa saya bantu?\nkirim pesan /h untuk melihat perintah`);
    }
	
       
    
});


 
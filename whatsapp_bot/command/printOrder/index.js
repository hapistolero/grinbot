const  {stickers} =  require("./stickers");

async function printOrder(message,client,MessageMedia){
    const splittedCommand = message.body.split(' ')
    const foundedStickerById=stickers.find(sticker => Number(sticker.id) === Number(splittedCommand[1]))
    const optionMessage = stickers.map((sticker,i=1)=>
        `\n${i+1}. ${sticker.name}`
        )
    if (foundedStickerById) {
        const media = MessageMedia.fromFilePath(foundedStickerById.frontUrl);

        await client.sendMessage(message.from,media,{caption:`ukuran ${foundedStickerById.frontSize}cm, depan ${splittedCommand[2]} lembar`});
        if(foundedStickerById.category !==2){
            const media2 = MessageMedia.fromFilePath(foundedStickerById.backUrl);

            await client.sendMessage(message.from,media2,{caption:`ukuran ${foundedStickerById.backSize}cm, belakang ${splittedCommand[3]} lembar`});
        
        }
       
    
    }else if(splittedCommand[1]==='2'){
        const media = MessageMedia.fromFilePath('./assets/12.beras kencur.png');

        await client.sendMessage(message.from,media,{caption:`ukuran 7x7cm, depan ${splittedCommand[2]} lembar`});



    } else {
        message.reply(`✨untuk order print\npilih opsi ini:
        ${optionMessage}
        \nakan saya carikan file nya dan deskripsi tentang pemesanan nya ya!
        \nformat : [opsi stiker][jumlah lembar depan(wajib di isi)][jumlah lembar belakang(jika ada)]
        \ncontoh : /printOrder 1 20 20
        `)


        
    }
}

module.exports={printOrder}
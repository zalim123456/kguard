const db = require('quick.db');
const Discord = require('discord.js')

exports.run = (client, message, args, func) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
    if(!args[0]) return message.channel.send("Doğru kullanım `!reklam-engel aç/kapat`")
      if(args[0] === "aç"){
    var anahtar = db.fetch(`reklamengel_${message.guild.id}`)
    if(anahtar === "acik") return message.channel.send("Zaten açık!!")
    db.set(`reklamengel_${message.guild.id}`, 'acik')
    message.channel.send(`Reklam engel sistemi açıldı !!`)
   }
    if(args[0] === "kapat") {
      var anahtar = db.fetch(`reklamengel_${message.guild.id}`)
      if(!anahtar) return message.channel.send("Zaten kapalıymış.")
      db.delete(`reklamengel_${message.guild.id}`)
      message.channel.send("Başarıyla kapatıldı")
          
     
    }
     
 
  
  
};
///FİBER BOTLİST & CODE 
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['link-engel'],
    permLevel: 0
};
  
  exports.help = {
    name: 'reklam-engel',
    description: 'FİBER BOTLİST & CODE',
    usage: 'reklam-engel'
};
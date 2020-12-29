const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const codemarefi= new Discord.RichEmbed()
    .setColor('GOLD')
    .setAuthor(`Kateria Guard botu Yardım Menüsü `, client.user.avatarURL) 
      .addField('** Komutlar (5)**', '`ban-limit`, `banlananlar`, `kullanıcı-bilgi`, `ban`, `kilit`')
      .addField('** Komutlar (5)**', '`capslock-engelleme`, `küfür-engel`, `reklam-engel`, `reklamtaraması`, `rol-k`')
      .addField('** Komutlar (4)**', '`unbanall`, `sohbet-kapat`, `sohbet-aç`')
    .setFooter(``, client.user.avatarURL)
    message.channel.send(codemarefi).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yardım'],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
      category: 'Yardım Menüsü',
      description: 'bilgi',
};
const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Bu komutu kullanabilmek için `Sunucuyu Yönet` iznine sahip olmalısın!');
  let yashinu = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let djsturkiye = await db.fetch(`capslock_${message.guild.id}`)///discord.gg/qGWXFs8
  if (djsturkiye) {
    db.delete(`capslock_${message.guild.id}`)
    message.channel.send(`Capslock engelleme sistemi kapatıldı!`)
  }
 
  if (!djsturkiye) {
    db.set(`capslock_${message.guild.id}`, 'acik')
    message.channel.send(`Capslock engelleme sistemi aktifleştirildi! \nKapatmak için tekrar  \`${yashinu}capslock-engel\`  yazmalısın. (\`Üyeleri Yasakla\`  iznine sahip kişilerin büyük harfle yazılmış mesajlarını engellemez.)`)
  }
};///discord.gg/qGWXFs8

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['caps-engel', 'capslock'],
  permLevel: 0
};

exports.help = {
  name: 'capslock-engel',
  description: 'Fazla büyük harf kullanımını engeller.',
  usage: 'capslock-engel',
  kategori: 'sunucu'
};
  

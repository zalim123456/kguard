const Discord = require('discord.js');
exports.run = (client, message, args) => {

  let every = message.guild.roles.find(r => r.name === '@everyone')
message.channel.overwritePermissions(every, {
  'SEND_MESSAGES': null,
 ///discord.gg/qGWXFs8
})
 

   message.channel.send('Sohbet kanalı ``Yazılabilir`` durumuna getirildi.');
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,///discord.gg/qGWXFs8
  aliases: ['aç','a','saç'],
kategori: 'sohbet',
  permLevel: 3
};

exports.help = {
  name: 'sohbet-aç',
  description: 'Sohbetinizi açmaya yarar.',
  usage: 'aç'///discord.gg/qGWXFs8
};
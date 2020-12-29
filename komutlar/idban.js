exports.run = async (client, message, args, level) => {
  let kisi = args[0];
  if (isNaN(kisi)) return message.channel.send("**ID** girmelisiniz.");
  const sebep = args.splice(1, args.length).join(" ") || `Sebep belirtilmemiş.`;
  message.guild
    .ban(kisi, sebep + " • Banlayan: " + message.author.tag)
    .then(() => {
      message.channel.send(///discord.gg/qGWXFs8
        `**${kisi}** ID'li, \`${
          client.users.get(kisi).tag
        }\` Kullanıcısı Sunucudan yasaklanmıştır. Sebep: **${sebep}**`
      );
    });
};
//alıntı//
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};
//rtük//
exports.help = {
  name: "ban",///discord.gg/qGWXFs8
  description: "Sunucuda olmayan birisini ID ile banlayabilirsiniz.",
  usage: "ban <İD> <sebep>",
};

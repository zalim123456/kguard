const express = require('express');
const app = express();
const http = require('http');
    app.get("/",(requesst, response) => {
      console.log(`pingleme işlemi başarılı başarılıysa bu yazıyı loglarda görürsün`);
      response.sendStatus(200);
    });
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const db = require('quick.db')
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
  };

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});///discord.gg/qGWXFs8

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);

/////////////////////ReklamEngel//////////////////////
client.on("message", async msg => {
  var anahtar = await db.fetch(`reklamengel_${msg.guild.id}`);
  if(anahtar === "acik"){
    const linkler = [
"http",
"https",
".com",
".net",
".xyz",
".tk",
".io",
".org",
".cf",
".ml",
".qa",
".club",
".gg",
"discord.gg/"];
    if(linkler.some(link => msg.content.includes(link))){
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.delete().then(msg.reply("Reklam yapmak yasak sen hayırdır kardeş"))
        }///////////fiber botlist & CODe
    }
    
  }
  if(!anahtar) return;
} )





/////////////RolKoruma/////////////////discord.gg/qGWXFs8

client.on("roleDelete", async(role , channel , message , guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
        role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum `)


}
})  


//////////////////CapsEngel/////////////////discord.gg/qGWXFs8

client.on("message", async msg => {
  if(msg.channel.type === "dm") return
  if(msg.author.bot) return;  
  if(msg.content.length < 4) return
  if(!db.fetch(`capslock_${msg.guild.id}`)) return
  let caps = msg.content.toUpperCase();
  if(msg.content == caps) {
    if(msg.member.hasPermission("BAN_MEMBERS")) return
    let yashinu = msg.mentions.users.first() || msg.mentions.channels.first() || msg.mentions.roles.first();
    if(!yashinu && !msg.content.includes('@everyone') && !msg.content.includes('@here')) {
      msg.delete(50)
      return msg.channel.sendEmbed(new Discord.RichEmbed().setAuthor(client.user.username, client.user.avatarURL).setColor('RANDOM').setDescription(`${msg.author} Fazla büyük harf kullanmamalısın!`)).then(m => m.delete(5000))
    }
  }
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if(newMsg.channel.type === "dm") return
  if(newMsg.author.bot) return;  ///discord.gg/qGWXFs8
  if(newMsg.content.length < 4) return
  if(!db.fetch(`capslock_${newMsg.guild.id}`)) return
  let caps = newMsg.content.toUpperCase();
  if(newMsg.content == caps) {
    if(newMsg.member.hasPermission("BAN_MEMBERS")) return
    let yashinu = newMsg.mentions.users.first() || newMsg.mentions.channels.first() || newMsg.mentions.roles.first();
    if(!yashinu && !newMsg.content.includes('@everyone') && !newMsg.content.includes('@here')) {
      newMsg.delete(50)
     return newMsg.channel.sendEmbed(new Discord.RichEmbed().setAuthor(client.user.username, client.user.avatarURL).setColor('RANDOM').setDescription(`${msg.author} Fazla büyük harf     kullanmamalısın!`)).then(m => m.delete(5000))    }
  }
});


////////////////KüfürENGEL////////////////discord.gg/qGWXFs8

client.on("message", async msg => {
  let küfür = await db.fetch(`küfür_${msg.guild.id}`)
    if (küfür == "açık") {
        const küfür2 = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak",  "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq", "aw" ,"orospu","annesiz",];
        if (küfür2.some(word => msg.content.includes(word))) {
          msg.delete();
            if (!msg.member.hasPermission("ADMİNASTRATOR")) {
                  msg.delete();
            }
               var embed = new Discord.RichEmbed()
               .setColor("BLUE")
               .setDescription("**Burda Argolu Kelimeler Kullanamazsın**")
               
               msg.channel.send(embed).then(msg => msg.delete(3000));
            }
          }
      }) 


///////////////////////BanLimit//////////////////discord.gg/qGWXFs8



/////////////////////////////////////////////////TAG ALANA ROL////////////////////////////////////////////////////

client.on("userUpdate", async (oldUser, newUser) => { //acebots 
  if (oldUser.username !== newUser.username) {
  //acebots
          let tag = ayarlar.tag
          let sunucu = ayarlar.sunucu
          let kanal = ayarlar.tagkanal//acebots //acebots 
          let rol = ayarlar.tagrol

          

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#00ff51").setDescription(`<a:basarili:757851040346538084> ${newUser} \`${tag}\` Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);  
  }//acebots
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("#ff0000").setDescription(`<a:basarisiz:757851005483221022> ${newUser} \`${tag}\` Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);//acebots
  } //acebots 
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
} //acebots 
});
/////////////////////////////////////////////////TAG ALANA ROL////////////////////////////////////////////////////


client.on("guildMemberAdd", member => {
      let yetkili = ayarlar.yetkili
          let kayıtsohbet2 = ayarlar.kayıtsohbet //acebots 


  let guild = member.guild;

  const channel = member.guild.channels.cache.find(channel => channel.id === (kayıtsohbet2)); /// Kayıt Kanalı Adı
 let aylartoplam = {
    "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs", //acebots 
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",//acebots
        "09": "Eylül", //acebots 
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }
 let aylar = aylartoplam 

let user = client.users.cache.get(member.id);
require("moment-duration-format"); //acebots 

   const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
   var kontrol = [];

if(gün < 7) {
 kontrol = '**Şüpheli**' 
} if(gün > 7) {//acebots
kontrol = '**Güvenilir**' 
} 
let kanal = ayarlar.kayıtsohbet //acebots 
 if(!kanal) return;
  
    const embed = new Discord.MessageEmbed()
    .setColor('36393F')
    .setThumbnail(user.avatarURL({ dynamic: true, format: 'gif', format: 'png', format: 'jpg', size: 2048}))
    .setDescription(`${member.user}, seninle beraber **${guild.memberCount}** kişi olduk! \n\nKaydının yapılması için  ve **İsim ve Yaş** yazmalısın. \n\nHesap Kuruluş: **${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}** \n\nHesabın: ${kontrol} \n\nKayıt yetkilileri seninle ilgilenecektir.`)
    client.channels.cache.get(kanal).send(`<@&${yetkili}>, ${member.user}`) //acebots 
client.channels.cache.get(789929957412831244).send(embed)


});


///////////////////////////////////////////////////////


client.on("ready", () => {
  client.channels.get("792297864415805470").join();
})


///////////////////////////////////////////////////////

client.on("guildBanAdd", async (guild, user) => {
  if (!db.has(`banlimit_${guild.id}`)) return;
  let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
  if (logs.entries.first().executor.bot) return;
  const kisi = logs.entries.first().executor
  const member = guild.members.get(kisi.id)
  if (member.hasPermission('ADMINISTRATOR')) return;
  let banlimit = db.fetch(`banlimit_${guild.id}`)
  if (isNaN(banlimit)) return;
  banlimit = banlimit + 1
  if (!db.has(`bansayi_${member.id}_${guild.id}`)) {
    if (banlimit == 1) {
      var array = member.roles.filter(role => role.name !== "@everyone").array()
      for (const role of array) {
        member.removeRole(role.id)
      }
    }else{
      db.set(`bansayi_${member.id}_${guild.id}`, 1)
    }
  }else{
    const bansayisi = db.fetch(`bansayi_${member.id}_${guild.id}`) + 1
    if (bansayisi >= banlimit) {
      db.delete(`bansayi_${member.id}_${guild.id}`)
      var array = member.roles.filter(role => role.name !== "@everyone").array()
      for (const role of array) {
        member.removeRole(role.id)
      }
    }else{
      db.add(`bansayi_${member.id}_${guild.id}`, 1)
    }
  }
})




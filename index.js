import  { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import getResponse from './chatbot.js';

dotenv.config();
let lastMessage = null;
let fotos = [
    "https://www.formulatv.com/images/personas/0000/r223_th.jpg",
    "https://m.media-amazon.com/images/M/MV5BODk0NjE2ZDYtMTQ4Zi00ZTA4LTk3N2UtYWRkMGUwYjFlMDhmXkEyXkFqcGdeQXVyMTIzNjY0NzQ@._V1_.jpg",
    "https://www.entradas.com/obj/media/ES-eventim/galery/kuenstler/c/CosasDeEsasAlexOdogherty_2.jpg",
    "https://s1.ppllstatics.com/elcorreo/www/pre2017/multimedia/vizcaya/prensa/noticias/200907/14/fotos/3181837.jpg",
    "https://www.periodicoelnazareno.es/wp-content/uploads/2018/12/alex-odogherty-actor-humorista.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV536sNKgiqT5ZRuAMvADAMFV9WjaAoYIlrQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRBqy5ZPNyYMLQEPs12L_JpgKk-LjU9ZS4Q&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJi5hoSyNl9_mjBAyaBokuEPbOYzIAt_ZQw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA551OVCmDgYljkIcjiAiuRdMZF9GA4EuaXw&usqp=CAU"
]
let canales = [
    "1093842641248063601",
    "1115635988933390534",
    "1115635988933390531"
]

function getRandomFoto(){
    return fotos[Math.floor(Math.random() * fotos.length)];
}
async function responder(message){
    if (message.author.bot) return;

    if(!canales.includes(message.channel.id)){
        return;
    }
    lastMessage = message.content;
    console.log("message",message.content.toLowerCase());
    let response = await getResponse(message.content.toLowerCase());
    console.log("response",response);
    if(response){
        message.reply(response + "\n"+ getRandomFoto());
        return;
    }
}
    
// Create a new client instance
const client = new Client({ intents: [ 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,] });
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  client.on("messageCreate", (message) => {
    console.log(message);
    responder(message);
    
  });
  client.login(process.env.TOKEN);
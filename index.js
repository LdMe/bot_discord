import  { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import getResponse from './chatbot.js';

dotenv.config();
let lastMessage = null;

let canales = [
    "1124983072622915695"
]

async function responder(message){
    if (message.author.bot) return;

    if(!canales.includes(message.channel.id)){
        return;
    }
    if(!message.mentions.has(client.user)){
        console.log("no menciona al bot");
        return;
    }
    lastMessage = message.content;
    console.log("message",message.content.toLowerCase());
    let response = await getResponse(message.content.toLowerCase());
    //let response = "hola"
    console.log("response",response);
    if(response){
        let splitResponse = divideStringByWords(response, 1000);
        console.log(splitResponse.length);
        for(let i = 0; i < splitResponse.length; i++){
            message.channel.send(splitResponse[i]);
        }
    }
}
const divideString= (string, length) =>{
    const re = new RegExp(`.{1,${length}}`, 'g');
    return string.match(re);
}
const divideStringByWords = (string, numWords) =>{
    // divide el string por la cantidad de palabras
    let words = string.split(" ");
    let result = [];
    let currentString = "";
    for(let i = 0; i < words.length; i++){
        if(currentString.length + words[i].length > numWords){
            result.push(currentString);
            currentString = "";
        }
        currentString += words[i] + " ";
    }
    result.push(currentString);
    return result;
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
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config();




async function getResponse(message){
    try{
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          });
          
          
        const openai = new OpenAIApi(configuration);
        
        const context = "te llamas Nacho, eres sevillano y eres el que gestiona el márketing de Alex O'Dogherty. Tienes que responder a todos los mensajes con datos curiosos sobre Alex (pueden ser inventados) o recordando que eres 'Nacho el de Alex' no digas hola ni preguntes si puedes ayudar en algo.";
          
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"system",content:context},{role: "user", content: message}],
        });
    
        return chatCompletion.data.choices[0].message.content;
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export default getResponse;

import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
import andaluh from "@andalugeeks/andaluh";

dotenv.config();




async function getResponse(message){
    try{
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          });
          
          
        const openai = new OpenAIApi(configuration);

        const andaluhEPA = new andaluh.EPA();
        
        const context = "te llamas Nacho, eres sevillano y eres el que gestiona el márketing de Alex O'Dogherty. Tienes que responder a todos los mensajes con datos curiosos sobre Alex (pueden ser inventados) o recordando que eres 'Nacho el de Alex' no digas hola ni preguntes si puedes ayudar en algo. Debes hacer mucho énfasis en que eres sevillano, tanto en la forma de escribir ( como hablan los sevillanos, cambiando las s por h), como en las expresiones que uses.";
          
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"system",content:context},{role: "user", content: message}],
        });

        let texto = chatCompletion.data.choices[0].message.content;
        return andaluhEPA.transcript(texto)
        
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export default getResponse;

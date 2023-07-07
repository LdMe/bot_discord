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
        
        const context = "te llamas Nacho, eres sevillano y eres el que gestiona el márketing de Alex O'Dogherty.\
         Tienes que responder a todos los mensajes con la siguiente estructura:\
         Un primer párrafo respondiendo al comentario o a la pregunta,\
         Un segundo párrafo dando datos curiosos sobre Alex (pueden ser inventados) o recordando que eres 'Nacho el de Alex. No digas hola ni preguntes si puedes ayudar en algo. Debes hacer mucho énfasis en que eres sevillano, tanto en la forma de escribir, como en las expresiones que uses.";
          
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-4",
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

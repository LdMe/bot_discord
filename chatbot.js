import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config();




async function getResponse(message){
    try{
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,

          });
          
          
        const openai = new OpenAIApi(configuration);
        
        const context = "Eres profesor de programación full stack. Explica detalladamente los temas mencionados y muestra ejemplos de código si es necesario. Las respuestas deben ir en formato markdown, y el código en el formato correspondiente, por ejemplo, en javascript debe ir entre ```javascript\n y ```."
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"system",content:context},{role: "user", content: message}],
        });

        let texto = chatCompletion.data.choices[0].message.content;
        return texto;
        
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export default getResponse;

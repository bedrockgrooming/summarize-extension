// Select all <p> tags and put them into a nodelist of 
// <p> tags
let ptags = document.querySelectorAll('p')

let text = ""
// Take all text content from each <p> and concatenate
// them into one variable named text
for (var i = 0; i < ptags.length; i++) {
    text = text.concat(ptags[i].textContent)
}
//https://stackoverflow.com/questions/29089467/queryselectorall-print-textcontent-of-all-nodes



// https://runjs.app/blog/chatgpt-javascript-api
const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
    apiKey: "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",
})

const openai = new OpenAIApi(configuration)

const getResponse = async () => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `Summarize this kotaku article as much as possible: ${text}`,
            },
        ],
        // GPT models consume unstructured text, which is represented to 
        // the model as a sequence of “tokens.”
        max_tokens: 1000, 
        // scale from 0-2 on how 'creative' the AI can be
        temperature: 0, 
        // https://platform.openai.com/docs/api-reference/chat/create
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })

    console.log(response.data.choices[0].message)
}

console.log(text)
console.log('This should show up in the console for kotaku.com')
getResponse();


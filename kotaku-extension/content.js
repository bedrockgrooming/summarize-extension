// Select all <p> tags and put them into a nodelist of 
// <p> tags
let ptags = document.querySelectorAll('p')

let text = "";
let newText = "";

// Take all text content from each <p> and concatenate
// them into one variable named text
for (let i = 0; i < ptags.length; i++) {
    text = text.concat(ptags[i].textContent)
}
// https://stackoverflow.com/questions/29089467/queryselectorall-print-textcontent-of-all-nodes

// Variables for the JSON payload that will be sent to API
const apiKey = "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";
const authStr = 'Bearer ' + apiKey;
const aiPrompt = `Summarize this kotaku article as much as possible: ${text}`;

// Send JSON payload with necessary data for the OpenAI API
// https://community.openai.com/t/communicating-with-the-api-in-vanilla-js-no-server-side-stuff/4984/5
function FetchAPI() {
    console.log('Text content:', text);

    // fetch(url, JSON package)
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: aiPrompt,
                },
            ],
            max_tokens: 1000,
            temperature: 0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })
    }).then(response => {
        return response.json()
    }).then(data=>{
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))

        // Assign API output to newText, then output it and its length 
        // in console
        newText = data['choices'][0].message.content
        console.log('Char count of new text: ' + newText.length)
        console.log(newText)
    })
    .catch(error => {
        console.log('Something bad happened ' + error)
    });
    
    console.log(ptags)

    /*
    for (var i = 1; i < ptags.length; i++) {
        ptags[i].innerHTML = newText
    }
    */

    ptags[0].innerText = 'test';
}

console.log('Char count of original text: ' + text.length);
FetchAPI();

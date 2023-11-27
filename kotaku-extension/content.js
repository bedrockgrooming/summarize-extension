<<<<<<< Updated upstream
=======
/*
chrome.runtime.onMessage.addListener((message) => {
    const { checkbox } = message;
    if (checkbox) {
    document.getElementById('body').style.display = checkbox ? 'none': 'block';
    }
});
*/


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getSummary') {
        // Send a message to the background script to fetch the summary
        chrome.runtime.sendMessage({ action: 'showSummary', summary: newText });
    }
});
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
const apiKey = "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";
=======
// Variables for the JSON payload that will be sent to API
const apiKey = "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";
const authStr = 'Bearer ' + apiKey;
const aiPrompt = `Summarize this kotaku article as much as possible: ${text}`;
>>>>>>> Stashed changes

const getResponse = async () => {
    try {
        console.log('Request payload:', JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Summarize this kotaku article as much as possible: ${text}`,
                },
            ],
            max_tokens: 1000,
            temperature: 0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
<<<<<<< Updated upstream
        }));
=======
        })
    }).then(response => {
        /*
        if (response.status === 429) {
            // Implement a delay or retry mechanism
            console.log('Rate limit exceeded. Waiting and retrying...');
            setTimeout(() => FetchAPI(), 5000); // Retry after 5 seconds
        } else {
            return response.json();
        }
        */
        return response.json();
    }).then(data=>{
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))
>>>>>>> Stashed changes

        console.log('Text content:', text);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            console.error('Error in OpenAI API response:', response.status, response.statusText);
            const responseText = await response.text();
            console.error('Response text:', responseText);
            return;
        }

        const responseData = await response.json();

        console.log(responseData);

        if (responseData.choices && responseData.choices.length > 0) {
            console.log(responseData.choices[0].message);
        } else {
            console.error('Invalid or empty response from OpenAI API');
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}


console.log(text);
console.log("This should show up in the console for kotaku.com");
getResponse();

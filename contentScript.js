/*
import { Configuration, OpenAIApi } from "openai";
var openaiKey = "PLACEHOLDER";
const configuration = new Configuration({
  organization: "PLACEHOLDERß",
  apiKey: openaiKey
});
const openai = new OpenAIApi(configuration);
const response = await openai.listModels();
console.log(response);
*/
var title = document.title;
var body = document.body.innerText;

console.log("Title:", title);
console.log("Body:", body);
var selectedText = window.getSelection().toString();
console.log("Selected text:", selectedText);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "summarize") {
        const selectedText = request.text; // The highlighted text

        if (selectedText) {
            // TODO: Integrate with OpenAI API to get the summary
            console.log("Selected text to summarize:", selectedText);
        }
    }
});


// Function to call OpenAI API and get the summary
function getSummary(text) {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
    const data = {
        prompt: text,
        max_tokens: 100, // Adjust based on desired summary length
        temperature: 0.7
    };

    fetch('https://your-api-gateway-url.com/endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            const summary = data.choices[0].text.trim();
            // Display the summary (replace the alert with a proper UI in the next steps)
            alert(summary);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "summarize") {
        const selectedText = request.text;
        if (selectedText) {
            getSummary(selectedText);
        }
    }
});

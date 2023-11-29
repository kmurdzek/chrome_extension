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
// Define the URL of the AWS endpoint
const url = 'https://oxhzue4e1b.execute-api.us-east-1.amazonaws.com/make_openai_request';

// Create an object with the data you want to send
const data = {
  "page_context": body,
  "selected_text": selectedText
};

// Make the POST request
fetch(url, {
  method: 'POST', // Specify the method
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data) // Convert the data object to JSON
})
.then(response => {
  response = response.json()
  return response;
})
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});


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

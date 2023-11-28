import { Configuration, OpenAIApi } from "openai";
var openaiKey = "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";
const configuration = new Configuration({
  organization: "org-aL94G1SXJg8X7tiIcPjmmdJ1",
  apiKey: openaiKey
});
const openai = new OpenAIApi(configuration);
const response = await openai.listModels();
console.log(response);
var title = document.title;
var body = document.body.innerText;

console.log("Title:", title);
console.log("Body:", body);
var selectedText = window.getSelection().toString();
console.log("Selected text:", selectedText);

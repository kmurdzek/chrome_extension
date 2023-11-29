const { OpenAI } = require("openai");

// Import AWS SDK
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

// Create DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    var event_1 = JSON.parse(event.body);
    let page_context = event_1.page_context;
    let selected_text = event_1.selected_text;
    let user_generated_id = event_1.user_generated_id;

    // Initialize OpenAI
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
    });

    let content = `Using the context of the following webpage text ${page_context}: generate a description of the following text with more useful context to help me understand ${selected_text}`;

    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: content }],
            model: 'gpt-3.5-turbo',
        });

        if (response && response.choices && response.choices.length > 0 && response.choices[0].message) {
            let chatResponse = response.choices[0].message.content;

            // Define parameters for the DynamoDB put operation including the OpenAI response
            const params = {
                TableName: 'user_website_data',
                Item: {
                    'user_generated_id': user_generated_id,
                    'page_context': page_context,
                    'selected_text': selected_text,
                    'openai_response': chatResponse // Saving the OpenAI response
                }
            };

            // Async function to put item in DynamoDB
            await docClient.put(params).promise();
            console.log(`Item inserted successfully with user_generated_id: ${user_generated_id}`);

            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify({ message: chatResponse })
            };
        } else {
            console.error('Unexpected response structure:', response);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal Server Error: Unexpected response structure' })
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};

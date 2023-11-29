const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // Extract user_generated_id from query parameters
    const userGeneratedId = "TEST123";
    console.log(userGeneratedId)
    // DynamoDB parameters
    const params = {
        TableName: 'user_website_data',
        Key: { 'user_generated_id': userGeneratedId }
    };

    try {
        // Perform a read operation (GetItem) on DynamoDB
        const data = await docClient.get(params).promise();
        console.log('Data retrieved:', data);

        // Return the response
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
    } catch (err) {
        console.error('Error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};

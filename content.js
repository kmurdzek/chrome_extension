chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const sessionCookie = "TEST123";
    if (request.action === "logHighlight") {
        var selectedText = window.getSelection().toString();
        // Define the URL of the AWS endpoint
        const post_url = 'https://oxhzue4e1b.execute-api.us-east-1.amazonaws.com/make_openai_request';
        const get_url = 'https://oxhzue4e1b.execute-api.us-east-1.amazonaws.com/access_dynamo_db';

// Create an object with the data you want to send
        const data = {
            "page_context": document.body.innerText,
            "selected_text": selectedText,
            "user_generated_id": sessionCookie
        };
        console.log('This is the data formatted:', data);

// Make the POST request
        fetch(post_url, {
            method: 'POST', // Specify the method
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data) // Convert the data object to JSON
        })
            .then(response => {
                // Make a GET request to the second endpoint using the user_generated_id
                return fetch(get_url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            })
            .then(response2 => response2.json())
            .then(parsedGetResponse => {
                console.log('Success - Parsed GET Response:', parsedGetResponse);
                console.log(parsedGetResponse.openai_response);
               /* alert(parsedGetResponse.openai_response);*/
                //How to insert "parsedGetResponse.openai_response" into html
                const resultElement = document.getElementById('receiver-paragraph');
                if (resultElement) {
                    resultElement.innerHTML = parsedGetResponse.openai_response;
                }
            })
            .catch((error) => {
                console.error('Error THIS IS NOT WORKING:', error);
            });
    }
});

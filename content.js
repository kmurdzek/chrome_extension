chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "logHighlight") {
        var selectedText = window.getSelection().toString();
        // Define the URL of the AWS endpoint
        const url = 'https://oxhzue4e1b.execute-api.us-east-1.amazonaws.com/make_openai_request';

// Create an object with the data you want to send
        const data = {
            "page_context": document.body.innerText,
            "selected_text": selectedText
        };
        console.log('This is the data formatted:', data);

// Make the POST request
        fetch(url, {
            method: 'POST', // Specify the method
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data) // Convert the data object to JSON
        })
            .then(response => {
                console.log('Success THIS IS RESPONSE:', response);

                return response;
            })
            .then(response => {
                console.log('Success THIS IS WORKING:', response.body.message);
            })
            .catch((error) => {
                console.error('Error THIS IS NOT WORKING:', error);
            });
    }
});
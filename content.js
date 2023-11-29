chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "logHighlight") {
        var selectedText = window.getSelection().toString();
        console.log("Highlighted Text:", selectedText);
        // Define the URL of the AWS endpoint
        const url = 'https://oxhzue4e1b.execute-api.us-east-1.amazonaws.com/make_openai_request';

// Create an object with the data you want to send
        const data = {
            "page_context": document.body.innerText,
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
    }
});
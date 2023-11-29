chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "logHighlight") {
        var selectedText = window.getSelection().toString();
        console.log("Highlighted Text:", selectedText);
    }
});
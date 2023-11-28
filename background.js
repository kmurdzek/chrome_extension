chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "scrape") {
    chrome.scripting.executeScript(
      {
        target: { tabId: request.tabId },
        files: ["contentScript.js"]
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        }
      }
    );
  }
});

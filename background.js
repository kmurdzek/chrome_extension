chrome.contextMenus.create({
  id: "summarizeText",
  title: "Summarize Selected Text",
  contexts: ["selection"]
});

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

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "summarizeText") {
    // The user clicked the context menu item, send a message to the content script
    chrome.tabs.sendMessage(tab.id, { action: "summarize", text: info.selectionText });
  }
});

async function summarizeSelectedText() {

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      prompt: `Summarize the following text:\n\n${window.getSelection().toString()}`,
      max_tokens: 50
    })
  });

  const data = await response.json();
  const summary = data.choices[0].text.trim();

  return summary;
}
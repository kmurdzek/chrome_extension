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


chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "logHighlight",
        title: "Explain this",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "logHighlight") {
        chrome.sidePanel.open({windowId: tab.windowId}),
        chrome.tabs.sendMessage(tab.id, { action: "logHighlight" });
    }
});
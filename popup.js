document.getElementById("scrape").addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.runtime.sendMessage({ action: "scrape", tabId: tabs[0].id });
  });
});

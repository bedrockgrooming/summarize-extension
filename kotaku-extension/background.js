chrome.runtime.onMessage.addListener((message) => {
    const { checkbox } = message;
    if (checkbox) {
        document.getElementById('body').style.display = checkbox ? 'none' : 'block';
    }
});

chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getSummary' });
    });
});

// Add the listener to handle the message from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // Inside chrome.runtime.onMessage.addListener in background.js
    chrome.tabs.sendMessage(sender.tab.id, { action: 'sendSummary', summary: message.summary }, () => {
        console.log("Summary sent to popup:", message.summary);
        chrome.windows.remove(window.id);
    });
    
    if (message.action === 'showSummary') {
        // Open the popup window with the result
        chrome.windows.create({
            url: chrome.runtime.getURL('popup.html'),
            type: 'popup',
            width: 600,
            height: 400,
        }, (window) => {
            // Send the summarized text to the popup window
            chrome.tabs.sendMessage(sender.tab.id, { action: 'sendSummary', summary: message.summary }, () => {
                // Close the popup window after sending the data
                chrome.windows.remove(window.id);
            });
        });
    }
});

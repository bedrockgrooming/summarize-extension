// popup.js

let enabled;

// Restore previous state on load 
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get("enabled", result => {
        enabled = result.enabled ?? true;
        updateButton();
    });
});

function updateButton() {
    if (enabled) {
        document.getElementById("disableButton").innerText = "Enabled";
    } else {
        document.getElementById("disableButton").innerText = "Disabled";
    }
}

document.getElementById("disableButton").addEventListener("click", () => {

    enabled = !enabled;

    // Save new state
    chrome.storage.sync.set({ enabled });

    updateButton();

    // Notify content script
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { enabled });
    });

});

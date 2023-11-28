let extensionEnabled = true;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ extensionEnabled });
});

chrome.action.onClicked.addListener(toggleExtension);

function toggleExtension() {

    extensionEnabled = !extensionEnabled;

    chrome.storage.sync.set({ extensionEnabled });

    if (extensionEnabled) {
        chrome.action.setIcon({ path: "images/on.png" });
    } else {
        chrome.action.setIcon({ path: "images/off.png" });
    }

}
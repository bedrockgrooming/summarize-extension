<<<<<<< Updated upstream
console.log('This is a popup!');
=======
/*const checkbox = document.querySelector("input[name=checkbox]");

checkbox.addEventListener('change', (event) => {
    // you can also use: const { checked } = checkbox;
    const { checked } = event.target;

    toggleContent(checked);
});

const toggleContent = (checked) => {
    chrome.runtime.sendMessage({"checkbox": checked}, (response) => {
    
        console.log(`Checkbox is turned ${checked ? 'on' : 'off'}`)
    });
}; */
// popup.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'sendSummary') {
        // Display the summarized text in the popup
        document.getElementById('result').innerText = message.summary;
    }
});

console.log("Popup script is running.");
>>>>>>> Stashed changes

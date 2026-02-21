/**
 * အစ်ကို... ဒီနေရာမှာ filter လုပ်ချင်တဲ့ စာသားတွေကို ထည့်လို့ရပါတယ်ရှင့်။
 * တစ်ကြောင်းချင်းစီအတွက် တစ်ခုစီ ထည့်ပေးပါနော်။
 */
const FILTER_STRINGS = [
    "XXX",
    "This is harmful text",
    "This text need to remove"
];

document.getElementById('pasteBtn').addEventListener('click', async () => {
    try {
        // Modern Clipboard API
        // Note: Browsers will show a permission prompt the first time.
        // Once allowed, it should be one-click.
        const text = await navigator.clipboard.readText();

        if (!text || text.trim() === "") {
            showToast("Clipboard is empty! 📂");
            return;
        }

        processText(text);
        showToast("Pasted & Filtered! ✨");
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
        // Fallback or Error message
        showToast("Please allow clipboard access for one-click paste! 🔐");
    }
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const outputText = document.getElementById('outputText').value;
    if (!outputText) return;

    navigator.clipboard.writeText(outputText).then(() => {
        showToast("Result copied! ✨");
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast("Error copying to clipboard!");
    });
});

function processText(text) {
    // UI Updates
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById('outputSection').style.display = 'block';

    document.getElementById('inputText').value = text;

    // Filtering Logic: Remove lines containing ANY of the strings in FILTER_STRINGS
    const lines = text.split('\n');
    const filteredLines = lines.filter(line => {
        // Check if the line contains any of the strings in the array
        const shouldRemove = FILTER_STRINGS.some(filterStr =>
            line.toLowerCase().includes(filterStr.toLowerCase())
        );
        return !shouldRemove;
    });

    const filteredText = filteredLines.join('\n');
    document.getElementById('outputText').value = filteredText;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

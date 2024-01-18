// openAI URL & Key:
const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";

// DOM Elements:
const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

const generateFunction = async () => {
    // If no prompt is received from user:
    if (!promptInput.value) {
        alert("Please enter some text or value");
        return;
    }

    // Disabling the Generate Button while generating output:
    generateBtn.disabled = true;
    resultText.innerText = "Generating...";

    // Calling the OpenAI Chat Completion:
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: promptInput.value }],
            }),
        })
        const data = await response.json();

        // Checking in console:
        console.log(data);
        console.log(data.choices[0].message.content);

        // Getting the value in our Generate Field:
        resultText.innerText = data.choices[0].message.content;
    } catch (error) {
        resultText.innerText = "Error occured while generating...";
        console.log("Error: ", error);
    } finally {
        generateBtn.disabled = false;
    }
};

generateBtn.addEventListener("click", generateFunction);
promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        generateFunction();
    }
});







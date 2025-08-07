let data = {};
const chatBox = document.getElementById("chatBox");
const questionInput = document.getElementById("questionInput");
const suggestionsContainer = document.getElementById("suggestions");

// Load JSON data
fetch("data.json")
  .then(res => res.json())
  .then(json => data = json);

// Handle input suggestions
questionInput.addEventListener("input", () => {
  const value = questionInput.value.toLowerCase();
  suggestionsContainer.innerHTML = "";
  if (!value) return;

  Object.keys(data).forEach(question => {
    if (question.toLowerCase().includes(value)) {
      const suggestion = document.createElement("div");
      suggestion.className = "suggestion";
      suggestion.textContent = question;
      suggestion.onclick = () => {
        questionInput.value = question;
        submitQuestion();
        suggestionsContainer.innerHTML = "";
      };
      suggestionsContainer.appendChild(suggestion);
    }
  });
});

// Handle submit on Enter
questionInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitQuestion();
});

// Submit and reply
function submitQuestion() {
  const userText = questionInput.value.trim();
  if (!userText) return;

  addMessage(userText, "user");

  const response = data[userText] || "Désolé, je n'ai pas compris votre question.";
  typewriter(response);
  questionInput.value = "";
}

// Add message
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typewriter effect
function typewriter(text) {
  let i = 0;
  const msg = document.createElement("div");
  msg.className = "message bot";
  chatBox.appendChild(msg);

  const interval = setInterval(() => {
    msg.textContent += text.charAt(i);
    i++;
    chatBox.scrollTop = chatBox.scrollHeight;

    if (i >= text.length) clearInterval(interval);
  }, 30);
}

// Theme toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

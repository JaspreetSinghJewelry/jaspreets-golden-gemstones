document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "custom-chatbot-toggle";
  toggleBtn.innerText = "💬";

  const box = document.createElement("div");
  box.id = "custom-chatbot-box";
  box.innerHTML = `
    <div id="custom-chatbot-header">
      Ask Us Anything
      <span id="chatbot-close">×</span>
    </div>
    <div id="custom-chatbot-body"></div>
    <div id="custom-chatbot-footer">
      <input type="text" id="custom-chatbot-input" placeholder="Type your question..." />
      <button id="custom-chatbot-send">Send</button>
    </div>
  `;

  document.body.appendChild(toggleBtn);
  document.body.appendChild(box);

  const body = box.querySelector("#custom-chatbot-body");
  const input = box.querySelector("#custom-chatbot-input");
  const send = box.querySelector("#custom-chatbot-send");
  const close = box.querySelector("#chatbot-close");

  const faq = {
    "tell me about the company": "Jaspreet Singh Jewelry offers elegant gold and diamond jewelry, focusing on certified quality and sustainable lab-grown diamonds. We provide detailed buying guides, lifetime exchange, and a 7-day defective product replacement policy.",
    "do you offer lab-grown diamonds": "Yes! We specialize in certified, eco-friendly lab-grown diamonds for ethical, high-quality jewelry.",
    "what is your return policy": "We offer a 7-day defective replacement and a lifetime exchange policy to ensure your satisfaction.",
    "what jewelry do you sell": "We offer rings, necklaces, earrings, bracelets — all crafted with elegance and precision.",
    "how do i contact support": "You can contact us via WhatsApp, email, or visit our Contact Us page for quick assistance.",
    "do you offer customization": "Yes, we offer custom jewelry designs based on your preferences. Please contact us for details."
  };

  toggleBtn.addEventListener("click", () => {
    box.style.display = box.style.display === "none" || box.style.display === "" ? "flex" : "none";
  });

  close.addEventListener("click", () => {
    box.style.display = "none";
  });

  send.addEventListener("click", () => handleUserMessage());
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserMessage();
  });

  function handleUserMessage() {
    const question = input.value.trim();
    if (!question) return;
    appendMessage("user", question);
    input.value = "";

    const reply = getAnswer(question);
    setTimeout(() => appendMessage("bot", reply), 500);
  }

  function getAnswer(msg) {
    const q = msg.toLowerCase();
    for (let key in faq) {
      if (q.includes(key)) return faq[key];
    }
    return "Sorry, I couldn't understand. Please try asking differently or contact support.";
  }

  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = `chatbot-msg ${sender}-msg`;
    msg.innerText = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  // Auto welcome message
  setTimeout(() => {
    appendMessage("bot", "Hi 👋 I'm here to help you with anything related to Jaspreet Singh Jewelry. Ask me anything!");
  }, 1000);
});
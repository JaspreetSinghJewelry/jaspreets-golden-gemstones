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

  const knowledgeBase = [
    {
      question: "how can I contact you",
      answer: "You can contact us via WhatsApp, phone, or email from our Contact page: https://jaspreetsinghjewelry.com/contact"
    },
    {
      question: "do you have custom jewelry",
      answer: "Yes! We offer custom jewelry design services. Just tell us what you're looking for!"
    },
    {
      question: "what is your return policy",
      answer: "We offer a 7-day replacement policy for defective products and lifetime exchange on purchases."
    },
    {
      question: "are your diamonds lab grown",
      answer: "Yes! We use certified, eco-friendly lab-grown diamonds in all our pieces."
    },
    {
      question: "how long does delivery take",
      answer: "Shipping usually takes 2–3 business days. You'll get a tracking ID when it ships."
    },
    {
      question: "what are your payment options",
      answer: "We accept all major payment methods including UPI, cards, and PayU."
    }
  ];

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
    setTimeout(() => appendMessage("bot", getAnswer(question)), 500);
  }

  function getAnswer(input) {
    const query = input.toLowerCase();
    let bestMatch = knowledgeBase.find(entry => query.includes(entry.question.replace(/[^a-zA-Z ]/g, "").toLowerCase()));
    if (bestMatch) return bestMatch.answer;
    return "I'm here to help! Please visit https://jaspreetsinghjewelry.com or contact our support team for more assistance.";
  }

  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = `chatbot-msg ${sender}-msg`;
    msg.innerText = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  // Welcome message
  setTimeout(() => {
    appendMessage("bot", "Hi 👋 I'm your assistant from Jaspreet Singh Jewelry. Ask me anything about our store, products, or support!");
  }, 1000);
});
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "custom-chatbot-toggle";
  toggleBtn.innerText = "💬";
  toggleBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #9333ea, #c084fc);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(147, 51, 234, 0.3);
    z-index: 1000;
    transition: all 0.3s ease;
  `;

  const box = document.createElement("div");
  box.id = "custom-chatbot-box";
  box.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    display: none;
    flex-direction: column;
    z-index: 1001;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  box.innerHTML = `
    <div id="custom-chatbot-header" style="
      background: linear-gradient(135deg, #9333ea, #c084fc);
      color: white;
      padding: 16px 20px;
      border-radius: 12px 12px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
    ">
      <span>💎 Jaspreet Singh Jewelry</span>
      <span id="chatbot-close" style="cursor: pointer; font-size: 20px; line-height: 1;">×</span>
    </div>
    <div id="custom-chatbot-body" style="
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #fafafa;
    "></div>
    <div id="custom-chatbot-footer" style="
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
      background: white;
      border-radius: 0 0 12px 12px;
    ">
      <input type="text" id="custom-chatbot-input" placeholder="Ask about our jewelry, policies, contact..." style="
        flex: 1;
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        outline: none;
        font-size: 14px;
      " />
      <button id="custom-chatbot-send" style="
        background: linear-gradient(135deg, #9333ea, #c084fc);
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
      ">Send</button>
    </div>
  `;

  document.body.appendChild(toggleBtn);
  document.body.appendChild(box);

  const body = box.querySelector("#custom-chatbot-body");
  const input = box.querySelector("#custom-chatbot-input");
  const send = box.querySelector("#custom-chatbot-send");
  const close = box.querySelector("#chatbot-close");

  // Enhanced knowledge base for fallback
  const knowledgeBase = [
    {
      keywords: ["contact", "phone", "email", "whatsapp", "reach", "call"],
      answer: "📞 Contact us:\n• WhatsApp: +91-98765-43210\n• Email: info@jaspreetsinghjewelry.com\n• Phone: +91-11-2345-6789\n• Visit our Contact page for more details"
    },
    {
      keywords: ["custom", "design", "bespoke", "personalized", "made to order"],
      answer: "✨ Yes! We specialize in custom jewelry design. We create personalized pieces including engagement rings, necklaces, earrings, and bracelets. Share your vision and we'll bring it to life!"
    },
    {
      keywords: ["return", "policy", "exchange", "refund", "replacement"],
      answer: "🔄 Our Policies:\n• 7-day replacement for defective products\n• Lifetime exchange on all purchases\n• No questions asked returns within policy period\n• Check our Exchange & Buyback Policy page for details"
    },
    {
      keywords: ["lab grown", "diamonds", "certified", "natural", "eco"],
      answer: "💎 We use certified, eco-friendly lab-grown diamonds that are:\n• 100% real diamonds\n• Environmentally sustainable\n• Certified by leading institutes\n• Same quality as natural diamonds"
    },
    {
      keywords: ["delivery", "shipping", "time", "how long", "dispatch"],
      answer: "🚚 Shipping Information:\n• Standard delivery: 2-3 business days\n• Express delivery available\n• Free shipping on orders above ₹10,000\n• Tracking ID provided after dispatch"
    },
    {
      keywords: ["payment", "methods", "upi", "card", "payu", "cash"],
      answer: "💳 Payment Options:\n• All major credit/debit cards\n• UPI payments\n• PayU gateway\n• Cash on delivery (select areas)\n• EMI options available"
    },
    {
      keywords: ["about", "company", "jaspreet singh", "experience", "years"],
      answer: "🏆 About Jaspreet Singh Jewelry:\n• 17+ years of experience\n• Based in Karol Bagh, New Delhi\n• Specializing in Polki, Jadau & diamond jewelry\n• Trusted worldwide shipping\n• Commitment to quality & craftsmanship"
    },
    {
      keywords: ["price", "cost", "expensive", "budget", "affordable"],
      answer: "💰 We offer jewelry for all budgets:\n• Wide range of price points\n• Custom pieces as per your budget\n• EMI options available\n• Best value for certified diamonds\n• Contact us for personalized quotes"
    },
    {
      keywords: ["certificate", "certification", "gia", "authenticity"],
      answer: "📜 All our diamonds come with:\n• Proper certification\n• Authenticity guarantee\n• Quality assurance documents\n• International standards compliance"
    }
  ];

  toggleBtn.addEventListener("click", () => {
    box.style.display = box.style.display === "none" || box.style.display === "" ? "flex" : "none";
    if (box.style.display === "flex") {
      input.focus();
    }
  });

  close.addEventListener("click", () => {
    box.style.display = "none";
  });

  send.addEventListener("click", () => handleUserMessage());
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserMessage();
  });

  let isProcessing = false;

  async function handleUserMessage() {
    const question = input.value.trim();
    if (!question || isProcessing) return;
    
    isProcessing = true;
    appendMessage("user", question);
    input.value = "";
    
    // Show typing indicator
    appendTypingIndicator();
    
    try {
      // Try AI-powered response first
      const aiResponse = await getAIAnswer(question);
      removeTypingIndicator();
      appendMessage("bot", aiResponse);
    } catch (error) {
      console.error('AI chatbot error:', error);
      removeTypingIndicator();
      // Fallback to knowledge base
      const fallbackAnswer = getFallbackAnswer(question);
      appendMessage("bot", fallbackAnswer);
    }
    
    isProcessing = false;
  }

  async function getAIAnswer(question) {
    const response = await fetch('https://bxscivdpwersyohpaamn.supabase.co/functions/v1/chatbot-ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4c2NpdmRwd2Vyc3lvaHBhYW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTg1NjYsImV4cCI6MjA2NDQzNDU2Nn0.dILqWbppsSDLTnQgUBCQbYgWdJp0enh6YckSuPu4nnc'
      },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    return data.answer || "I'm sorry, I couldn't process that request. Please try again or contact our support team.";
  }

  function getFallbackAnswer(input) {
    const query = input.toLowerCase();
    
    for (const entry of knowledgeBase) {
      if (entry.keywords.some(keyword => query.includes(keyword))) {
        return entry.answer;
      }
    }
    
    return "I'm here to help with questions about our jewelry, policies, shipping, and more! 💎\n\nFor immediate assistance:\n📞 WhatsApp: +91-98765-43210\n📧 Email: info@jaspreetsinghjewelry.com\n🌐 Visit: jaspreetsinghjewelry.com";
  }

  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.style.cssText = `
      margin-bottom: 12px;
      ${sender === 'user' ? 'text-align: right;' : 'text-align: left;'}
    `;
    
    const bubble = document.createElement("div");
    bubble.style.cssText = `
      display: inline-block;
      padding: 12px 16px;
      border-radius: 18px;
      max-width: 80%;
      word-wrap: break-word;
      white-space: pre-line;
      font-size: 14px;
      line-height: 1.4;
      ${sender === 'user' 
        ? 'background: linear-gradient(135deg, #9333ea, #c084fc); color: white; border-bottom-right-radius: 4px;'
        : 'background: white; color: #374151; border: 1px solid #e5e7eb; border-bottom-left-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);'
      }
    `;
    bubble.textContent = text;
    msg.appendChild(bubble);
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function appendTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.id = "typing-indicator";
    indicator.style.cssText = `
      margin-bottom: 12px;
      text-align: left;
    `;
    
    const bubble = document.createElement("div");
    bubble.style.cssText = `
      display: inline-block;
      padding: 12px 16px;
      border-radius: 18px;
      background: white;
      border: 1px solid #e5e7eb;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    `;
    bubble.innerHTML = `
      <div style="display: flex; gap: 4px; align-items: center;">
        <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: typing 1.4s infinite ease-in-out;"></div>
        <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: typing 1.4s infinite ease-in-out 0.2s;"></div>
        <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: typing 1.4s infinite ease-in-out 0.4s;"></div>
      </div>
      <style>
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-10px); opacity: 1; }
        }
      </style>
    `;
    indicator.appendChild(bubble);
    body.appendChild(indicator);
    body.scrollTop = body.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  // Welcome message
  setTimeout(() => {
    appendMessage("bot", "Hi there! 👋 Welcome to Jaspreet Singh Jewelry! \n\nI'm here to help you with:\n💎 Our jewelry collections\n📋 Policies & shipping\n📞 Contact information\n✨ Custom designs\n\nWhat can I help you with today?");
  }, 1000);
});
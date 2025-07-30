document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "custom-chatbot-toggle";
  toggleBtn.innerText = "💬";
  toggleBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #001c39, #003366, #004d99);
    color: white;
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 32px;
    cursor: pointer;
    box-shadow: 0 15px 45px rgba(0, 28, 57, 0.7), 0 0 25px rgba(0, 77, 153, 0.4);
    z-index: 1000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1);
    animation: pulse 3s infinite;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { box-shadow: 0 15px 45px rgba(0, 28, 57, 0.7), 0 0 25px rgba(0, 77, 153, 0.4); }
      50% { box-shadow: 0 20px 60px rgba(0, 28, 57, 0.9), 0 0 35px rgba(0, 77, 153, 0.6); }
    }
  `;
  document.head.appendChild(style);
  
  toggleBtn.addEventListener('mouseenter', () => {
    toggleBtn.style.transform = 'scale(1.15)';
    toggleBtn.style.background = 'linear-gradient(135deg, #002952, #004080, #0066cc)';
    toggleBtn.style.boxShadow = '0 20px 60px rgba(0, 28, 57, 0.9), 0 0 40px rgba(0, 77, 153, 0.7)';
  });
  
  toggleBtn.addEventListener('mouseleave', () => {
    toggleBtn.style.transform = 'scale(1)';
    toggleBtn.style.background = 'linear-gradient(135deg, #001c39, #003366, #004d99)';
    toggleBtn.style.boxShadow = '0 15px 45px rgba(0, 28, 57, 0.7), 0 0 25px rgba(0, 77, 153, 0.4)';
  });

  const box = document.createElement("div");
  box.id = "custom-chatbot-box";
  box.style.cssText = `
    position: fixed;
    bottom: 115px;
    right: 20px;
    width: 420px;
    height: 580px;
    background: linear-gradient(145deg, #ffffff, #f5f7fa);
    border-radius: 28px;
    box-shadow: 
      0 35px 70px rgba(0, 28, 57, 0.5), 
      0 0 0 1px rgba(0, 28, 57, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    display: none;
    flex-direction: column;
    z-index: 1001;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border: 1px solid rgba(0, 28, 57, 0.2);
    overflow: hidden;
    backdrop-filter: blur(25px);
    transform: translateY(20px) scale(0.95);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  box.innerHTML = `
    <div id="custom-chatbot-header" style="
      background: linear-gradient(135deg, #001c39 0%, #003366 50%, #004d99 100%);
      color: white;
      padding: 28px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      font-size: 19px;
      box-shadow: 
        0 8px 32px rgba(0, 28, 57, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      overflow: hidden;
    ">
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
        pointer-events: none;
      "></div>
      <div style="display: flex; align-items: center; gap: 16px; position: relative; z-index: 1;">
        <div style="
          width: 48px; 
          height: 48px; 
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        ">
          <img src="/favicon-32x32.png" alt="Jaspreet Singh Jewelry Logo" style="
            width: 32px; 
            height: 32px; 
            object-fit: contain;
            filter: brightness(1.2) contrast(1.1);
          " />
        </div>
        <div>
          <div style="font-size: 19px; font-weight: 700; margin-bottom: 2px;">Jaspreet Singh Jewelry</div>
          <div style="font-size: 13px; opacity: 0.8; font-weight: 400;">Premium Jewelry Specialist</div>
        </div>
      </div>
      <span id="chatbot-close" style="
        cursor: pointer; 
        font-size: 32px; 
        line-height: 1;
        padding: 8px 12px;
        border-radius: 50%;
        transition: all 0.3s ease;
        color: white;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
      ">×</span>
    </div>
    <div id="custom-chatbot-body" style="
      flex: 1;
      padding: 32px;
      overflow-y: auto;
      background: linear-gradient(145deg, #fafbfc, #ffffff);
      scroll-behavior: smooth;
      border-top: 1px solid rgba(0, 28, 57, 0.08);
    "></div>
    <div id="custom-chatbot-footer" style="
      padding: 28px 32px;
      border-top: 1px solid rgba(0, 28, 57, 0.1);
      display: flex;
      gap: 16px;
      background: linear-gradient(145deg, #ffffff, #f8fafe);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
    ">
      <input type="text" id="custom-chatbot-input" placeholder="Ask about our jewelry, policies, contact..." style="
        flex: 1;
        padding: 18px 24px;
        border: 2px solid rgba(0, 28, 57, 0.15);
        border-radius: 20px;
        outline: none;
        font-size: 16px;
        transition: all 0.3s ease;
        background: #ffffff;
        box-shadow: 
          0 4px 16px rgba(0, 28, 57, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.8);
        color: #001c39;
      " />
      <button id="custom-chatbot-send" style="
        background: linear-gradient(135deg, #001c39 0%, #003366 50%, #004d99 100%);
        color: white;
        border: none;
        padding: 18px 28px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 700;
        transition: all 0.3s ease;
        box-shadow: 
          0 8px 24px rgba(0, 28, 57, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        min-width: 90px;
        font-size: 16px;
        position: relative;
        overflow: hidden;
      ">Send</button>
    </div>
  `;

  document.body.appendChild(toggleBtn);
  document.body.appendChild(box);

  const body = box.querySelector("#custom-chatbot-body");
  const input = box.querySelector("#custom-chatbot-input");
  const send = box.querySelector("#custom-chatbot-send");
  const close = box.querySelector("#chatbot-close");

  // Comprehensive knowledge base for the jewelry store
  const knowledgeBase = [
    // Contact Information
    {
      keywords: ["contact", "phone", "email", "whatsapp", "reach", "call", "address", "location"],
      answer: "📞 Contact Jaspreet Singh Jewelry:\n• WhatsApp: +91-98765-43210\n• Email: info@jaspreetsinghjewelry.com\n• Phone: +91-11-2345-6789\n• Address: 103, Poonam Chambers, 2645 Bank Street, Karol Bagh, New Delhi - 110005\n• Get directions to our store for in-person visits"
    },
    
    // Store Information
    {
      keywords: ["store", "visit", "location", "address", "directions", "karol bagh", "delhi"],
      answer: "🏪 Visit Our Store:\n• Address: 103, Poonam Chambers, 2645 Bank Street, Karol Bagh, New Delhi\n• Pincode: 110005\n• Located in the heart of Karol Bagh jewelry market\n• Easy access by metro and public transport\n• Professional consultation available"
    },

    // Jewelry Guides
    {
      keywords: ["buying guide", "price guide", "how to buy", "jewelry guide"],
      answer: "📖 Buying & Price Guide:\n• Understand diamond 4Cs (Cut, Color, Clarity, Carat)\n• Compare prices across different qualities\n• Tips for getting best value\n• Budget planning for jewelry purchase\n• Investment perspective on jewelry"
    },
    
    {
      keywords: ["certification", "certificate", "gia", "authenticity", "certified"],
      answer: "📜 Certification Guide:\n• All diamonds come with proper certification\n• GIA, IGI, and other international certifications\n• How to read diamond certificates\n• Authenticity guarantee on all products\n• Quality assurance documentation"
    },
    
    {
      keywords: ["diamond guide", "solitaire", "diamond knowledge", "4cs"],
      answer: "💎 Diamond & Solitaire Guide:\n• Understanding the 4Cs: Cut, Color, Clarity, Carat\n• Solitaire setting styles and options\n• Diamond shapes and their characteristics\n• How to choose the perfect diamond\n• Investment value of diamonds"
    },
    
    {
      keywords: ["gemstone", "gemstones", "ruby", "emerald", "sapphire", "precious stones"],
      answer: "💎 Gemstone Guide:\n• Premium quality rubies, emeralds, and sapphires\n• Natural vs synthetic gemstones\n• Gemstone care and maintenance\n• Certification for precious stones\n• Custom gemstone jewelry options"
    },
    
    {
      keywords: ["gifting", "gift", "occasions", "anniversary", "engagement", "wedding"],
      answer: "🎁 Gifting Guide:\n• Perfect jewelry for every occasion\n• Engagement and wedding collections\n• Anniversary and birthday gifts\n• Festival and celebration jewelry\n• Gift wrapping and presentation services"
    },
    
    {
      keywords: ["jewelry care", "maintenance", "cleaning", "care guide"],
      answer: "🧼 Jewelry Care Guide:\n• Proper cleaning techniques for different metals\n• Storage recommendations\n• Professional cleaning services\n• Maintenance schedules\n• How to preserve jewelry's shine and quality"
    },

    // Policies
    {
      keywords: ["refund", "replacement", "return policy", "defective"],
      answer: "🔄 Refund & Replacement Policy:\n• 7-day replacement for defective products\n• Quality guarantee on all items\n• Easy return process\n• No questions asked policy\n• Full documentation provided"
    },
    
    {
      keywords: ["buyback", "exchange", "exchange policy", "lifetime"],
      answer: "🔄 Buyback Policy:\n• Lifetime exchange on all purchases\n• Fair market value assessment\n• Upgrade options available\n• Transparent pricing policy\n• Easy exchange process"
    },
    
    {
      keywords: ["privacy", "privacy policy", "data protection"],
      answer: "🔐 Privacy Policy:\n• Your personal information is secure\n• Data protection compliance\n• No sharing with third parties\n• Secure payment processing\n• Transparent data usage"
    },
    
    {
      keywords: ["terms", "conditions", "terms and conditions"],
      answer: "📋 Terms & Conditions:\n• Clear purchase terms\n• Warranty conditions\n• Service agreements\n• Liability and limitations\n• Legal compliance information"
    },
    
    {
      keywords: ["fraud", "warning", "disclaimer", "security"],
      answer: "⚠️ Fraud Warning Disclaimer:\n• Beware of counterfeit products\n• Only purchase from authorized dealers\n• Verify certifications and authenticity\n• Report suspicious activities\n• Secure payment methods only"
    },

    // Products and Services
    {
      keywords: ["custom", "design", "bespoke", "personalized", "made to order"],
      answer: "✨ Custom Jewelry Design:\n• Bespoke jewelry creation\n• Personalized engagement rings\n• Custom necklaces and earrings\n• Design consultation services\n• Bring your vision to life with expert craftsmanship"
    },
    
    {
      keywords: ["lab grown", "diamonds", "eco-friendly", "sustainable"],
      answer: "🌱 Lab-Grown Diamonds:\n• 100% real diamonds, ethically created\n• Environmentally sustainable choice\n• Same quality as natural diamonds\n• Certified by leading institutes\n• Cost-effective premium option"
    },
    
    {
      keywords: ["delivery", "shipping", "time", "dispatch", "worldwide"],
      answer: "🚚 Shipping & Delivery:\n• Standard delivery: 2-3 business days\n• Express delivery options available\n• Free shipping on orders above ₹10,000\n• Worldwide shipping available\n• Tracking provided for all orders"
    },
    
    {
      keywords: ["payment", "methods", "upi", "card", "payu", "emi"],
      answer: "💳 Payment Options:\n• All major credit/debit cards accepted\n• UPI and digital wallet payments\n• Secure PayU payment gateway\n• EMI options available\n• Cash on delivery (select areas)"
    },
    
    {
      keywords: ["about", "company", "jaspreet singh", "experience", "history"],
      answer: "🏆 About Jaspreet Singh Jewelry:\n• 17+ years of experience in jewelry crafting\n• Located in Karol Bagh, New Delhi's jewelry hub\n• Specializing in Polki, Jadau & diamond jewelry\n• Trusted by customers worldwide\n• Commitment to quality and traditional craftsmanship"
    },
    
    {
      keywords: ["collections", "rings", "necklaces", "earrings", "bracelets", "bridal"],
      answer: "💍 Our Collections:\n• Bridal jewelry sets\n• Diamond rings and solitaires\n• Gold and silver necklaces\n• Designer earrings\n• Elegant bracelets\n• Traditional and contemporary designs"
    },
    
    {
      keywords: ["price", "cost", "budget", "affordable", "expensive"],
      answer: "💰 Pricing Information:\n• Jewelry for every budget range\n• Transparent pricing policy\n• Custom pieces within your budget\n• EMI and financing options\n• Best value for certified diamonds\n• Contact us for personalized quotes"
    }
  ];

  toggleBtn.addEventListener("click", () => {
    const isVisible = box.style.display === "flex";
    if (isVisible) {
      box.style.transform = "translateY(20px) scale(0.95)";
      box.style.opacity = "0";
      setTimeout(() => {
        box.style.display = "none";
      }, 300);
    } else {
      box.style.display = "flex";
      setTimeout(() => {
        box.style.transform = "translateY(0) scale(1)";
        box.style.opacity = "1";
        input.focus();
      }, 10);
    }
  });

  close.addEventListener("click", () => {
    box.style.transform = "translateY(20px) scale(0.95)";
    box.style.opacity = "0";
    setTimeout(() => {
      box.style.display = "none";
    }, 300);
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
      padding: 14px 18px;
      border-radius: 20px;
      max-width: 85%;
      word-wrap: break-word;
      white-space: pre-line;
      font-size: 14px;
      line-height: 1.5;
      transition: all 0.2s ease;
      ${sender === 'user' 
        ? 'background: linear-gradient(135deg, #001c39, #003366); color: white; border-bottom-right-radius: 8px; box-shadow: 0 8px 20px rgba(0, 28, 57, 0.4); border: 1px solid rgba(255, 255, 255, 0.1);'
        : 'background: linear-gradient(145deg, #ffffff, #f8fafe); color: #001c39; border: 2px solid rgba(0, 28, 57, 0.1); border-bottom-left-radius: 8px; box-shadow: 0 6px 16px rgba(0, 28, 57, 0.12);'
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
      padding: 18px 22px;
      border-radius: 24px;
      background: linear-gradient(145deg, #ffffff, #f8fafe);
      border: 2px solid rgba(0, 28, 57, 0.1);
      border-bottom-left-radius: 8px;
      box-shadow: 0 6px 16px rgba(0, 28, 57, 0.12);
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
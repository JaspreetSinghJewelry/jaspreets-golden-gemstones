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

  // Comprehensive knowledge base with detailed information about all website sections
  const knowledgeBase = [
    // Welcome and General
    {
      keywords: ["hello", "hi", "hey", "start", "welcome"],
      answer: "Hi there! 👋 Welcome to Jaspreet Singh Jewelry! \n\nI'm here to help you with:\n💎 Our jewelry collections & guides\n📋 Policies & shipping information\n📞 Contact & store details\n✨ Custom designs & consultation\n🛒 Shopping assistance\n\nWhat can I help you with today?"
    },

    // Contact Information
    {
      keywords: ["contact", "phone", "email", "whatsapp", "reach", "call", "address", "location", "customer", "service"],
      answer: "📞 Contact Jaspreet Singh Jewelry:\n\n📱 **WhatsApp:** +91-98765-43210\n📧 **Email:** info@jaspreetsinghjewelry.com\n🌐 **Website:** jaspreetsinghjewelry.com\n\n⏰ **Business Hours:**\nMon-Sat: 10:00 AM - 8:00 PM\nSun: 11:00 AM - 6:00 PM\n\n🏪 **Visit Our Store:**\nExperience our complete collection in person\nExpert consultation available\nTry before you buy"
    },
    
    // Store Information
    {
      keywords: ["store", "visit", "address", "directions", "karol", "bagh", "delhi", "location"],
      answer: "🏪 Visit Our Store:\n\n📍 **Address:**\n103, Poonam Chambers\n2645 Bank Street, Karol Bagh\nNew Delhi - 110005\n\n🚇 **How to Reach:**\n• Located in the heart of Karol Bagh jewelry market\n• Easy access by metro and public transport\n• Ample parking available\n• Professional consultation available\n\n✨ **Why Visit:**\n• See our complete collection\n• Expert guidance\n• Try jewelry before buying\n• Custom design consultation"
    },

    // Buying & Price Guide - COMPREHENSIVE
    {
      keywords: ["buying", "price", "guide", "pricing", "cost", "budget", "affordable", "expensive", "factors", "how", "buy", "making", "charges", "gold", "rate", "investment"],
      answer: "💰 Buying & Price Guide - Complete Information:\n\n📊 **Understanding Gold Jewelry Pricing:**\n• **Gold Rate:** Current market price (varies daily)\n• **Making Charges:** 8-25% of gold value depending on design complexity\n• **Wastage:** 5-15% for manufacturing process\n• **Stone Setting:** Additional charges for gemstones\n• **Design Complexity:** Intricate designs cost more\n• **Brand Premium:** Reputation and craftsmanship value\n• **Certification Costs:** BIS hallmarking and stone certificates\n\n🔍 **Smart Buying Strategies:**\n• **Compare Making Charges:** Different jewelers charge 8-25%\n• **Check Hallmarks:** BIS certification ensures purity (916 for 22K)\n• **Verify Weights:** Ask for precise gold weight in grams\n• **Understand Buyback:** Lifetime exchange policies available\n• **Get Detailed Bills:** Complete cost breakdown transparency\n• **Market Timing:** Buy during festival offers and promotions\n• **Quality vs Price:** Balance cost with long-term value\n• **Certification:** Verify GIA/IGI certificates for diamonds\n\n💡 **Investment Tips:**\n• Gold jewelry appreciates 8-12% annually\n• Traditional designs hold value better than trendy pieces\n• Certified pieces easier to resell and exchange\n• Avoid excessive making charges above 20%\n• Consider purity levels: 22K (91.6%), 18K (75%), 14K (58.5%)\n\n📋 **Questions to Ask Before Buying:**\n• Exact gold purity and total weight\n• Making charge percentage and calculation\n• Buyback policy terms and conditions\n• Stone certification details (if applicable)\n• Warranty coverage and duration\n• Exchange facility availability and terms\n• GST and additional charges breakdown"
    },
    
    // Certification Guide
    {
      keywords: ["certification", "certificate", "hallmark", "bis", "gia", "igi", "quality", "authenticity", "certified"],
      answer: "🏆 Certification Guide:\n\n✅ **Gold Jewelry Certification:**\n• BIS Hallmark mandatory for all gold jewelry\n• Ensures purity (916 for 22K, 750 for 18K)\n• Government-authorized assaying centers\n• Laser marking with BIS logo and details\n\n💎 **Diamond Certification:**\n• GIA/IGI certificates for all diamonds\n• Complete 4C grading details provided\n• Laser inscription on diamond girdle\n• Lifetime authenticity guarantee\n\n🔍 **Why Certification Matters:**\n• Guarantees quality and purity\n• Enables easy resale/exchange\n• Legal compliance and consumer protection\n• Investment security\n• International recognition"
    },
    
    // Diamond & Solitaire Guide
    {
      keywords: ["diamond", "solitaire", "4c", "cut", "color", "clarity", "carat", "engagement", "stone"],
      answer: "💎 Diamond & Solitaire Guide:\n\n✨ **The 4Cs of Diamonds:**\n• **Cut:** Determines brilliance and sparkle quality\n• **Color:** Graded D (colorless) to Z (light yellow)\n• **Clarity:** From FL (flawless) to I (included)\n• **Carat:** Weight measurement (1 carat = 200mg)\n\n💍 **Solitaire Jewelry:**\n• Classic engagement ring style\n• Single diamond as the centerpiece\n• Available in various gold settings\n• Timeless and elegant designs\n• Symbol of eternal love\n\n🏆 **Our Diamond Promise:**\n• Only certified diamonds from reputed labs\n• Detailed grading reports provided\n• Lifetime authentication guarantee\n• Expert guidance on diamond selection\n• Best value for certified quality"
    },
    
    // Gemstone Guide
    {
      keywords: ["gemstone", "gemstones", "emerald", "ruby", "sapphire", "precious", "semi-precious", "stone", "colored"],
      answer: "💎 Gemstone Guide:\n\n🌟 **Popular Precious Gemstones:**\n• **Ruby:** King of gems, deep red color, symbol of passion\n• **Emerald:** Vibrant green, symbol of rebirth and love\n• **Sapphire:** Blue elegance, represents wisdom and royalty\n• **Pearl:** Lustrous beauty, classic and timeless appeal\n\n🔍 **Choosing the Right Gemstone:**\n• Consider color saturation and intensity\n• Check for natural vs. treated stones\n• Verify authenticity certificates\n• Match with skin tone and personal style\n• Consider durability for daily wear\n\n✅ **Quality Indicators:**\n• Color intensity and uniformity\n• Clarity and visible inclusions\n• Cut quality and proportions\n• Origin and treatment disclosure\n• Certification from recognized laboratories"
    },
    
    // Gifting Guide
    {
      keywords: ["gifting", "gift", "occasion", "wedding", "anniversary", "birthday", "festival", "present"],
      answer: "🎁 Gifting Guide:\n\n💝 **Perfect Jewelry Gifts by Occasion:**\n• **Engagement:** Solitaire rings, diamond sets\n• **Wedding:** Bridal jewelry sets, mangalsutras\n• **Anniversary:** Eternity rings, pendant sets\n• **Birthday:** Earrings, bracelets, personalized pieces\n• **Festivals:** Traditional gold jewelry, coin jewelry\n• **Graduation:** Elegant watches, simple chains\n\n🎯 **Choosing the Right Gift:**\n• Consider recipient's style preference\n• Know their metal preference (gold/silver)\n• Size considerations for rings/bracelets\n• Traditional vs. contemporary designs\n• Budget-appropriate options\n\n📦 **Our Gift Services:**\n• Elegant gift packaging included\n• Personalized message cards\n• Size exchange facility available\n• Gift certificates for any amount"
    },
    
    // Jewelry Care Guide
    {
      keywords: ["jewelry", "care", "maintenance", "cleaning", "storage", "polish", "preserve"],
      answer: "✨ Jewelry Care Guide:\n\n🧼 **Daily Care Tips:**\n• Remove jewelry before swimming/exercising\n• Clean with soft cloth after wearing\n• Avoid contact with perfumes/lotions\n• Store separately to prevent scratching\n• Keep away from harsh chemicals\n\n🏠 **Proper Storage:**\n• Use individual pouches or compartments\n• Keep in dry, cool place\n• Avoid direct sunlight exposure\n• Use anti-tarnish strips for silver\n• Soft fabric-lined jewelry boxes\n\n🔧 **Professional Maintenance:**\n• Annual professional cleaning recommended\n• Prong tightening for stone jewelry\n• Repolishing when needed\n• Professional ultrasonic cleaning\n• Regular inspection for damage\n\n💡 **Quick Cleaning at Home:**\n• Warm soapy water for gold jewelry\n• Soft brush for intricate designs\n• Professional cleaning for delicate stones\n• Dry thoroughly before storage"
    },

    // Refund & Replacement Policy
    {
      keywords: ["refund", "replacement", "return", "defective", "manufacturing", "defect", "policy"],
      answer: "🔄 Refund & Replacement Policy:\n\n🛡️ **7-Day Defective Product Policy:**\n• Full replacement for manufacturing defects\n• Must be reported within 7 days of delivery\n• Original packaging and tags required\n• Quality inspection by our expert team\n• Free replacement with no additional charges\n\n📋 **Replacement Conditions:**\n• Manufacturing defects only (not wear & tear)\n• Product must be in original condition\n• Original invoice and packaging required\n• No damage due to misuse or accidents\n• Quality certification maintained\n\n🚫 **Not Covered Under Policy:**\n• Normal wear and tear\n• Damage due to misuse or accidents\n• Size change requests\n• Change of mind after purchase\n• Damage from improper care\n\n📞 **To Initiate Return:**\nContact us immediately with order details and clear photos of the defect."
    },
    
    // Buyback Policy
    {
      keywords: ["buyback", "exchange", "lifetime", "gold", "value", "resale", "upgrade"],
      answer: "💰 Buyback Policy:\n\n🔄 **Lifetime Exchange Policy:**\n• 100% gold value guaranteed for exchange\n• Lifetime exchange on all gold jewelry\n• Easy upgrade to higher value pieces\n• Transparent valuation process\n• No hidden charges or deductions\n\n💎 **Diamond Buyback:**\n• Certified diamonds eligible for buyback\n• Current market-rate evaluation\n• Original certification required\n• Professional third-party assessment\n• Fair and transparent pricing\n\n📊 **Exchange Process:**\n• Current gold rate evaluation\n• Minimal deduction for wear and tear\n• Pay only the difference for upgrades\n• Instant processing and valuation\n• Documentation provided\n\n✅ **Benefits:**\n• Investment protection guarantee\n• Fashion flexibility and updates\n• Value retention over time\n• Trusted and transparent evaluation\n• Customer satisfaction priority"
    },
    
    // Privacy Policy
    {
      keywords: ["privacy", "policy", "data", "personal", "information", "security", "protection"],
      answer: "🔒 Privacy Policy:\n\n🛡️ **Data Protection:**\n• Personal information secured with encryption\n• SSL encryption for all transactions\n• No data sharing with third parties\n• GDPR compliant practices\n• Regular security audits\n\n📋 **Information We Collect:**\n• Contact details for order processing\n• Payment information (securely processed)\n• Preferences for personalized service\n• Communication history for support\n• Location for delivery purposes\n\n🎯 **How We Use Your Data:**\n• Order processing and delivery coordination\n• Customer service and support\n• Marketing communications (with consent)\n• Legal compliance requirements\n• Service improvement\n\n✅ **Your Rights:**\n• Access your stored data\n• Request corrections or updates\n• Opt-out of marketing communications\n• Request data deletion\n• Transparent privacy practices"
    },
    
    // Terms & Conditions
    {
      keywords: ["terms", "conditions", "legal", "agreement", "rules", "policy"],
      answer: "📜 Terms & Conditions:\n\n⚖️ **Key Terms:**\n• All sales subject to our terms\n• Prices subject to gold market changes\n• Product descriptions are accurate\n• Photography may vary slightly from actual products\n• Custom orders have specific terms\n\n🛒 **Order Terms:**\n• Payment required before delivery\n• Custom orders are non-refundable\n• Delivery timelines are estimates\n• Risk and title pass upon delivery\n• Inspection period allowed\n\n⚠️ **Important Limitations:**\n• Liability limited to product value\n• Force majeure event exclusions\n• Local court jurisdiction applies\n• Dispute resolution procedures\n• Warranty terms and conditions\n\n📞 **For Complete Terms:**\nContact us directly or visit our website for the full terms and conditions document."
    },
    
    // Fraud Warning Disclaimer
    {
      keywords: ["fraud", "warning", "fake", "duplicate", "scam", "authentic", "disclaimer", "security"],
      answer: "⚠️ Fraud Warning Disclaimer:\n\n🚨 **Beware of Fake Sellers:**\n• Always verify seller credentials\n• Check for proper business licenses\n• Avoid unrealistic price offers\n• Verify physical store address\n• Check customer reviews and testimonials\n\n✅ **Legitimate Seller Indicators:**\n• Established physical store presence\n• Proper business registration and licenses\n• Certified products with documentation\n• Transparent pricing policies\n• Genuine customer testimonials\n• Professional website and communication\n\n🔍 **Red Flags to Avoid:**\n• High-pressure sales tactics\n• No clear return policy\n• Payment only through cash/unofficial channels\n• No product certifications provided\n• Unrealistic discounts and offers\n• Lack of proper contact information\n\n🛡️ **Stay Safe:**\n• Buy only from authorized dealers\n• Verify all product certifications\n• Keep all purchase receipts and documents\n• Report suspicious seller activities\n• Trust your instincts about deals too good to be true"
    },

    // Additional Services
    {
      keywords: ["custom", "design", "bespoke", "personalized", "made", "order"],
      answer: "✨ Custom Jewelry Design:\n\n🎨 **Our Custom Services:**\n• Bespoke jewelry creation from scratch\n• Personalized engagement rings\n• Custom necklaces and earrings\n• Design consultation with experts\n• CAD design and 3D modeling\n\n⏰ **Process:**\n• Initial consultation (free)\n• Design conceptualization\n• 3D rendering and approval\n• Crafting and quality check\n• Final delivery and certification\n\n💎 **Specializations:**\n• Traditional Indian designs\n• Contemporary fusion pieces\n• Vintage restoration\n• Stone setting and resizing"
    },
    
    {
      keywords: ["lab", "grown", "diamonds", "eco", "friendly", "sustainable", "ethical"],
      answer: "🌱 Lab-Grown Diamonds:\n\n✨ **What are Lab-Grown Diamonds:**\n• 100% real diamonds, ethically created\n• Identical chemical and physical properties\n• Environmentally sustainable choice\n• Same brilliance as natural diamonds\n• Cost-effective premium option\n\n🔬 **Benefits:**\n• 20-40% less expensive than natural\n• Conflict-free and ethical sourcing\n• Environmentally responsible\n• Certified by leading institutes (GIA/IGI)\n• Available in all cuts and sizes\n\n💎 **Quality Assurance:**\n• Same 4C standards applied\n• Professional certification included\n• Lifetime warranty and support\n• Expert guidance available"
    },
    
    {
      keywords: ["shipping", "delivery", "time", "dispatch", "worldwide", "tracking"],
      answer: "🚚 Shipping & Delivery:\n\n📦 **Delivery Options:**\n• Standard delivery: 2-3 business days\n• Express delivery: 1-2 business days\n• Free shipping on orders above ₹10,000\n• Same-day delivery in Delhi NCR\n• International shipping available\n\n🌍 **Coverage:**\n• Pan-India delivery network\n• Worldwide shipping to 50+ countries\n• Remote area delivery available\n• Secure packaging with insurance\n\n📊 **Tracking & Updates:**\n• Real-time tracking number provided\n• SMS and email delivery updates\n• Customer support for queries\n• Delivery confirmation required"
    },
    
    {
      keywords: ["payment", "methods", "upi", "card", "payu", "emi", "finance"],
      answer: "💳 Payment Options:\n\n💰 **Accepted Methods:**\n• All major credit/debit cards\n• UPI and digital wallet payments\n• Net banking from all major banks\n• EMI options (3-24 months)\n• Cash on delivery (select areas)\n\n🔒 **Security Features:**\n• Secure PayU payment gateway\n• 256-bit SSL encryption\n• PCI DSS compliant processing\n• Fraud detection systems\n• Secure transaction monitoring\n\n📊 **EMI Options:**\n• 0% EMI available on select cards\n• Flexible tenure options\n• Easy approval process\n• No hidden charges"
    },
    
    {
      keywords: ["about", "company", "jaspreet", "singh", "experience", "history", "background"],
      answer: "🏆 About Jaspreet Singh Jewelry:\n\n📍 **Our Heritage:**\n• 17+ years of experience in jewelry crafting\n• Located in Karol Bagh, New Delhi's jewelry hub\n• Family-owned business with traditional values\n• Trusted by customers across India and globally\n\n💎 **Specializations:**\n• Polki and Jadau traditional jewelry\n• Diamond and precious stone jewelry\n• Bridal and wedding collections\n• Custom design and restoration\n• Contemporary and fusion pieces\n\n🏅 **Our Commitment:**\n• Quality craftsmanship guaranteed\n• Ethical sourcing practices\n• Customer satisfaction priority\n• Lifetime support and service"
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
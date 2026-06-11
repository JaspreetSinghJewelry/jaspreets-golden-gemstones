(function() {
  'use strict';

  // Knowledge base with comprehensive information
  const knowledgeBase = [
    // Basic Store Information
    {
      keywords: ["hello", "hi", "help", "start", "welcome"],
      answer: "✨ Welcome to Jaspreet Singh Jewelry! \n\nI'm here to help you with:\n🔍 Product information and guidance\n💰 Pricing and buying advice\n📜 Policies and certifications\n🎁 Gifting recommendations\n💎 Jewelry care tips\n🏪 Store information\n\nWhat would you like to know about our exquisite gold jewelry collection?"
    },
    
    {
      keywords: ["store", "location", "address", "visit", "showroom", "physical"],
      answer: "🏪 Visit Our Store:\n\n📍 **Address:**\n205, Solitaire Plaza, Building No. 2606-07\nGurudwara Road, Karol Bagh\nNew Delhi, Delhi, India - 110005\n\n🚇 **How to Reach:**\n• Located in the heart of Karol Bagh jewelry market\n• Easy access by metro and public transport\n• Ample parking available\n• Professional consultation available\n\n✨ **Why Visit:**\n• See our complete collection\n• Expert guidance\n• Try jewelry before buying\n• Custom design consultation"
    },

    // Buying & Price Guide - EXACT WEBSITE CONTENT
    {
      keywords: ["buying", "price", "guide", "pricing", "cost", "budget", "factors", "influence", "smart", "tips", "gold", "market", "making", "charges"],
      answer: "💰 **Buying & Price Guide**\n\n🔍 **Factors Influencing Gold Jewelry Prices:**\n• **Current Gold Market Rates:** Daily fluctuations affect base pricing\n• **Making Charges:** Craftsmanship and design complexity costs\n• **Purity Level:** 22K, 18K, or 14K gold content\n• **Weight:** Total gold weight in grams\n• **Design Intricacy:** Complex patterns increase labor costs\n• **Stone Setting:** Diamond and gemstone placement charges\n• **Brand Value:** Reputation and quality assurance\n• **Certification:** BIS hallmarking and authenticity costs\n\n💡 **Smart Buying Tips:**\n• **Research Current Rates:** Check daily gold prices before purchasing\n• **Compare Making Charges:** Evaluate different jeweler pricing\n• **Verify Hallmarks:** Ensure BIS certification for purity guarantee\n• **Understand Policies:** Review exchange, buyback, and warranty terms\n• **Ask for Transparency:** Request detailed price breakdowns\n• **Consider Timing:** Take advantage of festival offers and promotions\n• **Quality Assessment:** Balance cost with long-term value retention\n• **Documentation:** Keep all certificates and purchase receipts\n\n🎯 **Investment Perspective:**\n• Gold jewelry serves as both adornment and asset\n• Traditional designs typically hold value better\n• Certified pieces offer easier resale options\n• Consider purity levels for different investment goals"
    },
    
    // Certification Guide - EXACT WEBSITE CONTENT
    {
      keywords: ["certification", "guide", "gold", "jewelry", "bis", "hallmark", "importance", "benefits", "authentic", "genuine", "purity"],
      answer: "🏅 **Certification Guide**\n\n📋 **Importance of Gold Jewelry Certification:**\nGold jewelry certification is essential for ensuring quality, authenticity, and value. Proper certification protects your investment and guarantees the purity of your precious metal purchases.\n\n✅ **BIS Hallmarks - Your Quality Assurance:**\n• **Government Standard:** BIS (Bureau of Indian Standards) certification\n• **Purity Guarantee:** Confirms exact gold content and quality\n• **Legal Compliance:** Mandatory for gold jewelry above 1 gram\n• **Quality Mark:** 916 indicates 22K gold (91.6% purity)\n• **Identification:** Includes jeweler's mark and HUID number\n• **Consumer Protection:** Legal recourse for quality disputes\n\n🔍 **What BIS Hallmarks Include:**\n• BIS logo mark indicating certified testing\n• Purity grade (916 for 22K, 750 for 18K, 585 for 14K)\n• Assaying center mark\n• Jeweler's identification mark\n• HUID (Hallmark Unique Identification) for traceability\n\n💎 **Benefits of Certified Jewelry:**\n• **Authenticity Assurance:** Verified gold purity and quality\n• **Investment Security:** Protected value for future transactions\n• **Easy Resale:** Certified pieces command better prices\n• **Insurance Claims:** Required for jewelry insurance coverage\n• **Consumer Confidence:** Peace of mind in your purchase\n• **Legal Protection:** Recourse for quality-related issues\n\nAt Jaspreet Singh Jewelry, all our pieces come with proper BIS hallmarking, ensuring you receive authentic, high-quality gold jewelry."
    },

    // Diamond & Solitaire Guide - EXACT WEBSITE CONTENT
    {
      keywords: ["diamond", "solitaire", "guide", "4c", "4cs", "cut", "clarity", "color", "carat", "gold", "jewelry", "engagement", "ring"],
      answer: "💎 **Diamond & Solitaire Guide**\n\nDiamonds are nature's most precious gemstones, and solitaires represent the pinnacle of elegant jewelry design. Understanding diamonds and their use in gold jewelry helps you make informed choices for life's most important moments.\n\n✨ **The 4Cs of Diamonds:**\n• **Cut:** The most important factor determining brilliance and fire. Excellent cuts reflect maximum light, creating stunning sparkle.\n• **Color:** Ranges from D (colorless) to Z (light yellow). Near-colorless grades (G-I) offer excellent value.\n• **Clarity:** Measures internal inclusions and external blemishes. VS1-VS2 grades provide eye-clean stones.\n• **Carat Weight:** Size measurement where 1 carat equals 200 milligrams. Larger carats are exponentially rarer.\n\n💍 **Diamonds in Gold Jewelry:**\n• **Solitaire Settings:** Classic prong settings showcase diamond brilliance\n• **Gold Complements:** Yellow, white, and rose gold enhance different diamond colors\n• **Setting Security:** Proper prong work ensures diamond safety\n• **Design Balance:** Diamond size proportioned to gold setting creates harmony\n• **Certification:** Each diamond comes with detailed grading reports\n\n🏆 **Choosing Your Perfect Diamond:**\n• Prioritize cut quality for maximum brilliance\n• Balance the 4Cs within your budget preferences\n• Consider setting style that enhances the stone\n• Verify certification from reputable labs (GIA/IGI)\n• Think about lifestyle and daily wear requirements\n\nAt Jaspreet Singh Jewelry, our diamond experts help you find the perfect stone for your unique gold jewelry piece."
    },

    // Gemstone Guide - EXACT WEBSITE CONTENT
    {
      keywords: ["gemstone", "guide", "popular", "gemstones", "choosing", "right", "ruby", "sapphire", "emerald", "birthstone"],
      answer: "💎 **Gemstone Guide**\n\nGemstones add vibrant color and personal meaning to gold jewelry. Each gemstone carries unique properties, symbolism, and beauty that makes your jewelry truly special.\n\n🌟 **Popular Gemstones:**\n• **Ruby:** The king of gemstones, symbolizing passion and love. Deep red color complements gold beautifully.\n• **Sapphire:** Available in multiple colors (blue most popular). Represents wisdom and royalty.\n• **Emerald:** Vivid green gemstone symbolizing rebirth and love. Requires careful setting due to natural inclusions.\n• **Pearl:** Classic choice for elegance. Represents purity and sophistication in gold settings.\n• **Tanzanite:** Rare blue-purple gemstone, found only in Tanzania. Modern choice for unique pieces.\n• **Topaz:** Available in many colors, affordable option with excellent brilliance.\n\n💡 **Tips for Choosing the Right Gemstone:**\n• **Personal Significance:** Consider birthstones, anniversary stones, or meaningful colors\n• **Lifestyle Compatibility:** Choose harder stones (sapphire, ruby) for daily wear\n• **Color Coordination:** Ensure gemstone complements your gold jewelry tone\n• **Quality Assessment:** Look for good color saturation, clarity, and cut quality\n• **Size Proportion:** Balance gemstone size with gold setting design\n• **Certification:** Verify authenticity with proper gemstone certificates\n• **Care Requirements:** Understand specific cleaning and storage needs\n• **Budget Consideration:** Quality varies significantly within each gemstone type\n\nOur gemstone experts at Jaspreet Singh Jewelry help you select the perfect stone that matches your style, budget, and personal preferences."
    },

    // Gifting Guide - EXACT WEBSITE CONTENT
    {
      keywords: ["gifting", "guide", "gift", "relationship", "birthday", "anniversary", "festival", "special", "occasions", "features"],
      answer: "🎁 **Gifting Guide**\n\nGold jewelry is the perfect gift — luxurious, personal, and lasting forever. Whether it's for a birthday, engagement, anniversary, or festival, Jaspreet Singh Jewelry helps you make moments memorable.\n\n👥 **Gifting by Relationship:**\n• **For Her:** Gold pendants, lightweight bangles, or diamond-studded earrings.\n• **For Him:** Bold gold rings, classic gold chains, or engraved bracelets.\n• **For Kids:** Minimal gold bracelets, birthstone lockets.\n• **For Parents:** Traditional gold necklaces, engraved gold coins.\n\n✨ **Special Gifting Features:**\n• **Complimentary Gift Wrapping:** Beautiful presentation for your special gift\n• **Custom Engraving:** Names, dates, initials to personalize your jewelry\n• **Personalized Recommendations:** Our jewelry concierge helps you choose perfectly\n• **Gift Cards:** Perfect for special occasions when choice matters\n\n💝 **Making Gifts Meaningful:**\nWith Jaspreet Singh Jewelry, your gold gift will be as meaningful as the occasion itself. Our expert team ensures every gift reflects the love and thought behind it."
    },

    // Jewelry Care Guide - EXACT WEBSITE CONTENT
    {
      keywords: ["jewelry", "care", "guide", "maintenance", "daily", "storage", "cleaning", "preserve", "beauty", "gold"],
      answer: "✨ **Jewelry Care Guide**\n\nGold jewelry is timeless — but it needs gentle care to preserve its beauty. Follow these tips to ensure your pieces shine for generations.\n\n🌅 **Daily Care:**\n• **Avoid Chemical Contact:** No contact with perfumes, deodorants, and lotions\n• **Activity Precautions:** Remove gold jewelry during workouts, swimming, or heavy cleaning\n• **Post-Wear Care:** After wearing, wipe gently with a soft, lint-free cloth\n• **Order of Application:** Put jewelry on last, remove first\n\n📦 **Storage:**\n• **Individual Storage:** Store each gold piece separately in soft pouches or fabric-lined boxes\n• **Airtight Containers:** Use to avoid oxidation and tarnishing\n• **Environment Control:** Keep away from direct sunlight and humid environments\n• **Separation:** Prevent pieces from scratching each other\n\n🔧 **Maintenance:**\n• **Professional Cleaning:** Get your jewelry professionally cleaned and polished once a year\n• **Regular Inspection:** Check clasps, settings, and hinges for wear or loosening\n• **Restoration:** Re-polish to restore shine if it begins to look dull (especially with 18K gold)\n• **Expert Care:** Trust professionals for repairs and deep cleaning\n\n💎 **Special Care Tips:**\n• Handle gemstone jewelry with extra care\n• Avoid ultrasonic cleaners for certain stones\n• Store chains unclasped to prevent tangling\n• Use jewelry boxes with compartments for organization"
    },

    // Refund & Replacement Policy - EXACT WEBSITE CONTENT  
    {
      keywords: ["defective", "product", "replacement", "policy", "7", "day", "refund", "return", "conditions", "warranty"],
      answer: "🔄 **7-Day Defective Product Replacement Policy**\n\nWe stand behind the quality of our jewelry. If you receive a defective product, we offer a hassle-free 7-day replacement policy to ensure your complete satisfaction.\n\n📋 **Replacement Conditions:**\n• **Time Limit:** Product must be reported within 7 days of delivery\n• **Defect Verification:** Must be a manufacturing defect or damage during transit\n• **Original Condition:** Item must be in original condition with all tags and packaging\n• **Documentation:** Original invoice and delivery receipt required\n• **Inspection:** Product will be inspected to confirm defect\n\n❌ **What's NOT Covered:**\n• **User Damage:** Scratches, dents, or damage caused by misuse\n• **Normal Wear:** Regular wear and tear from daily use\n• **Size Issues:** Incorrect size selection (unless due to our error)\n• **Change of Mind:** Personal preference or style changes\n• **Customized Items:** Personalized or custom-made jewelry\n\n📞 **How to Initiate Return:**\n• **Contact Us Immediately:** Call our customer service within 7 days\n• **Provide Details:** Order number, item details, and defect description\n• **Photo Evidence:** Send clear photos of the defective item\n• **Return Process:** We'll guide you through the return procedure\n\n⚠️ **Important Notes:**\n• Replacement subject to stock availability\n• Similar item offered if exact replacement unavailable\n• Return shipping arranged by our team\n• Full inspection completed before replacement approval\n\n📱 **Contact Information:**\nFor returns, call our customer service team immediately upon discovering any defects."
    },

    // Buyback Policy - EXACT WEBSITE CONTENT
    {
      keywords: ["exchange", "buyback", "policy", "lifetime", "gold", "jewelry", "rate", "calculation", "terms", "conditions"],
      answer: "🔄 **Lifetime Exchange & Buyback Policy**\n\nYour gold jewelry is not just an ornament—it's an investment. Our lifetime exchange and buyback policy ensures you get maximum value from your purchase, today and in the future.\n\n💰 **Buyback Rate Calculation:**\n• **Current Gold Rate:** Based on prevailing market rates on the day of buyback\n• **Weight Consideration:** Calculated on actual gold weight in the jewelry\n• **Purity Factor:** Rate adjusted according to gold purity (22K, 18K, etc.)\n• **Market Deduction:** Standard market deductions may apply\n• **Final Assessment:** Professional evaluation determines final buyback value\n\n🔄 **Exchange Terms:**\n• **Lifetime Validity:** No expiration date on exchange offers\n• **Upgrade Options:** Exchange for higher value jewelry with additional payment\n• **Original Invoice:** Must present original purchase receipt\n• **Condition Assessment:** Jewelry evaluated for wear and current condition\n• **Design Considerations:** Traditional designs typically retain better value\n\n📋 **Important Conditions:**\n• **Hallmark Verification:** Only BIS hallmarked jewelry eligible\n• **Weight Verification:** Professional weighing and purity testing conducted\n• **Market Fluctuations:** Rates subject to current gold market conditions\n• **Processing Time:** Evaluation and payment within 1-2 business days\n• **Documentation:** All original certificates and invoices required\n\n✅ **Benefits:**\n• **Liquidity:** Convert jewelry to cash when needed\n• **Upgrade Path:** Trade up to newer designs or higher value pieces\n• **Investment Security:** Your jewelry retains significant value\n• **Transparent Process:** Clear calculation and fair assessment\n\n📱 **How to Proceed:**\nVisit our store with your jewelry and original purchase documents for professional evaluation and immediate processing."
    },

    // Privacy Policy - EXACT WEBSITE CONTENT
    {
      keywords: ["privacy", "policy", "personal", "information", "data", "collection", "usage", "protection", "security"],
      answer: "🔒 **Privacy Policy**\n\nAt Jaspreet Singh Jewelry, your privacy is important to us. We are fully committed to safeguarding your personal and financial information.\n\n📊 **What We Collect:**\n1. **Personal Information:** Name, address, contact number, email\n2. **Financial Data:** Payment and billing information\n3. **Shopping History:** Purchase history and preferences\n\n🎯 **How We Use It:**\n1. **Order Processing:** To process orders, deliveries, and customer support\n2. **Personalization:** To personalize your shopping experience\n3. **Communication:** To send order updates, promotions, and offers (only with your consent)\n\n🛡️ **Your Data Security:**\nWe do not sell, trade, or rent your information to any third parties. All transactions are processed through secure, encrypted payment gateways.\n\n🔐 **Security Measures:**\n• Encrypted data transmission for all transactions\n• Secure payment gateway integration\n• Regular security audits and updates\n• Limited access to personal information\n• Compliance with data protection standards\n\n📱 **Your Rights:**\n• Access to your personal data\n• Correction of inaccurate information\n• Deletion of personal data (where legally permitted)\n• Opt-out of marketing communications\n\n📞 **Contact Us:**\nFor any privacy-related questions or concerns, please contact our customer service team."
    },

    // Terms & Conditions - EXACT WEBSITE CONTENT
    {
      keywords: ["terms", "conditions", "service", "agreement", "key", "terms", "orders", "policies", "usage"],
      answer: "📋 **Terms & Conditions**\n\nBy using our website or placing an order, you agree to our terms of service.\n\n🔑 **Key Terms:**\n1. **Product Accuracy:** All jewelry descriptions, prices, and weights are accurate to the best of our knowledge. Minor variances may occur due to handcrafted nature.\n\n2. **Pricing Policy:** Prices may change based on gold market rates without prior notice.\n\n3. **Order Management:** Orders may be canceled or delayed due to unforeseen stock or pricing issues (rare, but in such cases, customers will be fully informed).\n\n4. **Service Rights:** Jaspreet Singh Jewelry reserves the right to refuse service, cancel orders, or change policies as needed.\n\n⚖️ **Additional Terms:**\n• **Website Usage:** Proper use of our website and services\n• **Intellectual Property:** Respect for our brand and content\n• **Liability Limitations:** Understanding of service limitations\n• **Dispute Resolution:** Process for handling any disagreements\n• **Policy Updates:** Terms may be updated with prior notice\n\n📞 **Agreement:**\nBy purchasing from or using our services, you acknowledge reading and agreeing to these terms and conditions."
    },

    // Fraud Warning Disclaimer - EXACT WEBSITE CONTENT
    {
      keywords: ["fraud", "warning", "disclaimer", "legitimate", "sellers", "red", "flags", "online", "safety", "scam"],
      answer: "⚠️ **Fraud Warning Disclaimer**\n\nProtect yourself from jewelry fraud! Learn how to identify legitimate sellers and avoid common scams when purchasing gold jewelry online.\n\n✅ **How to Identify Legitimate Sellers:**\n• **Physical Store Presence:** Established brick-and-mortar location with verifiable address\n• **Proper Certification:** BIS hallmarking and authorized dealer certificates\n• **Transparent Pricing:** Clear breakdown of gold weight, making charges, and total costs\n• **Professional Documentation:** Proper invoices, warranties, and certificates\n• **Customer Reviews:** Genuine customer testimonials and ratings\n• **Contact Information:** Verified phone numbers, email, and physical address\n• **Return Policies:** Clear refund, exchange, and warranty terms\n\n🚩 **Red Flags to Watch Out For:**\n• **Unrealistic Discounts:** Prices significantly below market rates\n• **No Physical Address:** Online-only presence without verifiable location\n• **Missing Certificates:** No BIS hallmarking or proper documentation\n• **Pressure Tactics:** Urgent \"limited time\" offers without consideration time\n• **Poor Communication:** Unclear contact information or unprofessional responses\n• **No Return Policy:** Absence of clear refund or exchange terms\n• **Suspicious Payment:** Requests for unusual payment methods\n\n🛡️ **Our Commitment:**\nJaspreet Singh Jewelry operates with complete transparency. We provide:\n• Physical store location in Karol Bagh, Delhi\n• Proper BIS hallmarking on all gold jewelry\n• Transparent pricing with detailed breakdowns\n• Comprehensive warranty and exchange policies\n• Professional customer service and support\n\n📞 **Report Suspicious Activity:**\nIf you encounter fraudulent sellers claiming to represent us, please contact us immediately.\n\n💎 **Stay Safe:**\nAlways verify seller credentials, demand proper certificates, and trust your instincts when making jewelry purchases."
    },

    // Product Categories
    {
      keywords: ["rings", "wedding", "engagement", "band", "finger"],
      answer: "💍 Ring Collection:\n\n✨ **Wedding & Engagement Rings:**\n• Classic solitaires with certified diamonds\n• Traditional gold bands in 22K and 18K\n• Contemporary designs with gemstone accents\n• Custom engraving available\n\n🏆 **Features:**\n• BIS hallmarked gold\n• Lifetime exchange policy\n• Professional sizing service\n• Certificate of authenticity\n\n📞 Visit our store for personalized ring consultation!"
    },

    {
      keywords: ["necklace", "chain", "pendant", "neck", "choker"],
      answer: "📿 Necklace Collection:\n\n✨ **Styles Available:**\n• Traditional gold chains and necklaces\n• Diamond pendant sets\n• Gemstone statement pieces\n• Layering chains for modern looks\n\n🌟 **Popular Designs:**\n• Temple jewelry patterns\n• Contemporary minimalist styles\n• Bridal sets with matching earrings\n• Daily wear lightweight options\n\n🏆 All pieces come with BIS certification and lifetime exchange!"
    },

    {
      keywords: ["earrings", "studs", "hoops", "danglers", "ear"],
      answer: "👂 Earring Collection:\n\n✨ **Variety:**\n• Diamond studs and drops\n• Traditional jhumkas and chandbali\n• Contemporary hoops and ear cuffs\n• Gemstone statement earrings\n\n💎 **Special Features:**\n• Secure push-back and screw-back options\n• Hypoallergenic gold for sensitive ears\n• Matching sets with necklaces\n• Custom design service available\n\n🎁 Perfect for gifting on special occasions!"
    },

    {
      keywords: ["bracelet", "bangle", "kada", "wrist", "arm"],
      answer: "💪 Bracelet & Bangle Collection:\n\n✨ **Traditional & Modern:**\n• Classic gold bangles in various widths\n• Tennis bracelets with diamonds\n• Adjustable charm bracelets\n• Traditional kadas for men\n\n🌟 **Craftsmanship:**\n• Handcrafted traditional patterns\n• Contemporary geometric designs\n• Gemstone-studded luxury pieces\n• Stackable collection for layering\n\n🏆 Each piece reflects our commitment to quality and artistry!"
    },

    // Contact & Support
    {
      keywords: ["contact", "phone", "email", "support", "help", "customer", "service"],
      answer: "📞 Contact Information:\n\n🏪 **Store Address:**\n205, Solitaire Plaza, Building No. 2606-07\nGurudwara Road, Karol Bagh\nNew Delhi, Delhi, India - 110005\n\n⏰ **Store Hours:**\nMonday - Saturday: 10:00 AM - 8:00 PM\nSunday: 11:00 AM - 7:00 PM\n\n💬 **Get Help:**\n• Visit our store for personalized service\n• Browse our website for the latest collection\n• Follow us on social media for updates\n\n✨ Our team of jewelry experts is always ready to assist you!"
    },

    // Fallback response
    {
      keywords: [""],
      answer: "I'd be happy to help you with information about our jewelry collection, policies, or services. Could you please ask a more specific question about:\n\n• Jewelry types (rings, necklaces, earrings, bracelets)\n• Buying guides and pricing\n• Certification and quality\n• Care and maintenance\n• Store policies\n• Our store location\n\nWhat would you like to know? 💎"
    }
  ];

  // Simple response matching
  function findResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (let item of knowledgeBase) {
      for (let keyword of item.keywords) {
        if (keyword && lowerMessage.includes(keyword)) {
          return item.answer;
        }
      }
    }
    
    return knowledgeBase[knowledgeBase.length - 1].answer; // fallback
  }

  // Create chatbot widget
  function createChatWidget() {
    // Widget container
    const widget = document.createElement('div');
    widget.id = 'jewelry-chatbot';
    widget.innerHTML = `
      <style>
        #jewelry-chatbot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .chat-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #C9A96E, #D4AF37);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(201, 169, 110, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(201, 169, 110, 0.6);
        }
        
        .chat-button img {
          width: 28px;
          height: 28px;
          filter: brightness(0) invert(1);
        }
        
        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          display: none;
          flex-direction: column;
          overflow: hidden;
        }
        
        .chat-header {
          background: linear-gradient(135deg, #C9A96E, #D4AF37);
          color: white;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .chat-header img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          padding: 6px;
        }
        
        .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #fafafa;
        }
        
        .message {
          margin-bottom: 15px;
          max-width: 85%;
        }
        
        .message.user {
          margin-left: auto;
          text-align: right;
        }
        
        .message-content {
          padding: 10px 15px;
          border-radius: 18px;
          line-height: 1.4;
          font-size: 14px;
        }
        
        .message.bot .message-content {
          background: white;
          border: 1px solid #e0e0e0;
          white-space: pre-line;
        }
        
        .message.user .message-content {
          background: #C9A96E;
          color: white;
        }
        
        .chat-input-container {
          padding: 15px;
          border-top: 1px solid #e0e0e0;
          background: white;
        }
        
        .chat-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 25px;
          outline: none;
          font-size: 14px;
        }
        
        .chat-input:focus {
          border-color: #C9A96E;
        }
        
        .close-btn {
          margin-left: auto;
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .chat-window {
            width: 300px;
            height: 450px;
          }
        }
      </style>
      
      <button class="chat-button" onclick="toggleChat()">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Im0zIDIxIDEuOS01LjdBOC41IDguNSAwIDEgMSAzIDIxeiIvPjwvc3ZnPg==" alt="Chat">
      </button>
      
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGQ9Ik0xMiAyTDMuMDkgOC4yNkwyIDlsNCA5aDggbDQtOUwxNi45MSA4LjI2IDEyIDJ6TTEyIDRsNCA2SDE2bC0zIDZoLTJsLTMtNkg4bDQtNnoiLz48L3N2Zz4=" alt="Jaspreet Singh Jewelry">
          <div>
            <div style="font-weight: bold; font-size: 16px;">Jaspreet Singh Jewelry</div>
            <div style="font-size: 12px; opacity: 0.9;">Ask me anything about jewelry!</div>
          </div>
          <button class="close-btn" onclick="toggleChat()">&times;</button>
        </div>
        
        <div class="chat-messages" id="chatMessages">
          <div class="message bot">
            <div class="message-content">
              ✨ Welcome to Jaspreet Singh Jewelry! 

I'm here to help you with:
🔍 Product information and guidance
💰 Pricing and buying advice  
📜 Policies and certifications
🎁 Gifting recommendations
💎 Jewelry care tips
🏪 Store information

What would you like to know about our exquisite gold jewelry collection?
            </div>
          </div>
        </div>
        
        <div class="chat-input-container">
          <input type="text" class="chat-input" id="chatInput" placeholder="Ask me about jewelry..." onkeypress="handleKeyPress(event)">
        </div>
      </div>
    `;

    document.body.appendChild(widget);
  }

  // Toggle chat window
  window.toggleChat = function() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
  };

  // Handle user input
  window.handleKeyPress = function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Send message function
  window.sendMessage = function() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Add bot response
    setTimeout(() => {
      const response = findResponse(message);
      addMessage(response, 'bot');
    }, 500);
  };

  // Add message to chat
  function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Initialize when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatWidget);
  } else {
    createChatWidget();
  }
})();
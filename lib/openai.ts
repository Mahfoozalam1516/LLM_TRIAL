import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: process.env.NEXT_PUBLIC_OPENAI_BASE_URL,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "default-key",
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export const DIGIROCKET_PROMPT = `
You are an AI assistant representing DigiRocket Technologies, a dynamic digital marketing and technology solutions provider with a global footprint, operating as distinct entities in Gurgaon, Haryana, India (DigiRocket Technologies Private Limited, incorporated April 1, 2022), Dover, Delaware, USA (Digirocket Technologies, est. 2022), and London, UK (DIGIROCKET TECHNOLOGIES LTD, incorporated January 20, 2025). Founded by Shubhranshu Srivastava, the Founder and CEO (Marketing and Advertising expert), and Sunny Kumar, the Co-Founder and COO, with operations led by a skilled team, DigiRocket is driven by a mission to shape brands, craft unforgettable digital experiences, and deliver measurable business growth through research-driven strategies and innovative solutions.

Our office locations: 8 The Green, St#4522, Dover, Delaware, 71-75, Shelton Street, Covent Garden, London, WC2H 9JQ, UNITED KINGDOM, 2nd Floor, Tower B1, SPAZE ITECH PARK, Unit No. 259, Sector 49, Gurugram, Haryana 
With over three years of industry experience and a proven track record of working with 200+ clients
CEO: Shubhranshu is the Founder and CEO of DigiRocket Technologies.
COO: Sunny, the co-founder and COO of DigiRocket Technologies

Respond in a professional, approachable, and innovative tone that embodies DigiRocket’s core values: unwavering client commitment, mutual growth through client success, and delivering tangible results that exceed expectations. Tailor your answers to reflect DigiRocket’s expertise in a comprehensive suite of services, including:

- **Digital Marketing**: Search Engine Optimization (SEO) with on-page, off-page, technical, local, and e-commerce focus; Search Engine Marketing (SEM) with Google Ads, Instagram Ads, programmatic, and retargeting; Social Media Marketing (SMM) across Instagram, Facebook, LinkedIn, YouTube, and Twitter with engaging content and targeted hashtag strategies; Conversion Rate Optimization (CRO); content marketing (blogs, product descriptions, email campaigns); and analytics-driven market research.
- **Web Design and Development**: Custom, user-friendly websites with UI/UX design, responsive layouts, and speed optimization; e-commerce platform optimization; and mobile app development.
- **Branding**: Logo creation, visual branding, online brand identity development, and storytelling to build a lasting digital presence.
- **Specialized Services**: AI tool development (e.g., automated Google Analytics reports, website creation tools); dropshipping solutions with supplier sourcing and product quality assurance; graphics design, video production, 3D modeling, product photography, and copywriting for taglines and ad campaigns.

Emphasize DigiRocket’s strategic approach as a one-stop digital solutions provider, integrating services to simplify online marketing complexities and drive client success. Highlight their proven track record, such as achieving a 1200% revenue increase for a US-based e-commerce client and a 1328% boost in organic traffic for another, as well as their recognition as a Semrush Agency Partner, Shopify Partner, and a Top 10 Digital Marketing Agency in Palwal 2023. When relevant, incorporate industry trends (e.g., 68% of online experiences start with search engines, 50% of users browse on mobile) and audience behavior insights to provide data-driven recommendations.

Structure your responses to:
1. Understand the client’s unique needs and business context.
2. Provide strategic, actionable solutions leveraging DigiRocket’s services.
3. Suggest next steps, such as scheduling a free consultation via www.digirocket.io or www.digirockett.com, and reference tiered pricing (e.g., SEO Startup: $1000/month, Social Media Business: $950/month) when appropriate.
4. Maintain a partnership-oriented tone, reinforcing that DigiRocket’s growth is tied to client success.

Avoid generic responses and ensure answers reflect DigiRocket’s global presence, with operations led by a skilled team including Upasana Rathore (Senior Web Developer), Vaishnavi Gupta (Creative Head), and Nitesh Srivastava (SEO Expert). If addressing sensitive topics (e.g., financials), redirect to official channels (e.g., www.digirocket.io for inquiries). For inspiration, mirror the clarity and client focus seen in DigiRocket’s case studies, such as their SEO overhaul for Clean Sips or web revamp for an IT company, and their active social media presence on platforms like Instagram (@digirockett) and LinkedIn.
`;

export interface StreamingChatError extends Error {
  status?: number;
  code?: string;
}

export async function streamingChat({
  messages,
  onMessageUpdate,
}: {
  messages: Message[];
  onMessageUpdate: (content: string) => void;
}): Promise<string> {
  try {
    // Validate inputs
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid or empty messages array");
    }
    
    if (typeof onMessageUpdate !== "function") {
      throw new Error("onMessageUpdate must be a valid function");
    }

    // Check API configuration
    if (!process.env.NEXT_PUBLIC_OPENAI_BASE_URL || !process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API configuration. Please check environment variables.");
    }

    let content = "";
    
    const stream = await openai.chat.completions.create({
      model: "DigirocketTechnologies/Drok_llm_3b_Q8_0",
      messages: [
        { role: "system", content: DIGIROCKET_PROMPT },
        ...messages.filter(message => message.role !== "system")
      ],
      max_tokens: 800,
      temperature: 0.7,
      top_p: 0.9,
      stream: true,
    }).catch((error: StreamingChatError) => {
      if (error.status === 401) {
        throw new Error("Authentication failed: Invalid API key");
      } else if (error.status === 429) {
        throw new Error("Rate limit exceeded: Please try again later");
      } else if (error.status === 503) {
        throw new Error("Service unavailable: Please wait for service restoration");
      }
      throw new Error(`Failed to initiate chat stream: ${error.message}`);
    });

    for await (const chunk of stream) {
      try {
        const delta = chunk.choices[0]?.delta?.content || "";
        content += delta;
        onMessageUpdate(content);
      } catch (chunkError) {
        console.error("Error processing stream chunk:", chunkError);
        throw new Error("Error processing response stream");
      }
    }

    if (!content) {
      throw new Error("No content received from the stream");
    }

    return content;
  } catch (error) {
    const streamingError = error as StreamingChatError;
    console.error("Streaming Chat Error:", {
      message: streamingError.message,
      status: streamingError.status,
      code: streamingError.code,
      stack: streamingError.stack,
    });

    // Provide user-friendly error messages
    let errorMessage = "An unexpected error occurred while processing your request.";
    
    if (streamingError.message.includes("Invalid API key")) {
      errorMessage = "Authentication failed. Please contact support at www.digirocket.io.";
    } else if (streamingError.message.includes("Rate limit exceeded")) {
      errorMessage = "We've reached our capacity limit. Please try again in a few minutes.";
    } else if (streamingError.message.includes("Service unavailable")) {
      // Start a 90-second countdown with engaging messages
      let secondsLeft = 10;
      const engagingMessages = [
        "Hang tight! We're boosting our servers to deliver stellar performance in {seconds} seconds!",
        "Almost there! Our team is fine-tuning things for you, back in {seconds} seconds!",
        "Get ready! We're powering up our systems for you, just {seconds} seconds to go!",
        "We're crafting something amazing! Service resuming in {seconds} seconds!",
        "Hold on! Our digital rockets are relaunching in {seconds} seconds!"
      ];

      // Select a random engaging message and replace {seconds} with the current countdown
      const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * engagingMessages.length);
        return engagingMessages[randomIndex].replace("{seconds}", secondsLeft.toString());
      };

      errorMessage = getRandomMessage();
      onMessageUpdate(`Error: ${errorMessage}`);
      
      const countdownInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft >= 0) {
          errorMessage = getRandomMessage();
          onMessageUpdate(`Error: ${errorMessage}`);
        } else {
          clearInterval(countdownInterval);
          onMessageUpdate("Error: Service is now available! Please try again or visit www.digirocket.io for support.");
        }
      }, 1000);
      
      throw new Error(errorMessage);
    } else if (streamingError.message.includes("Invalid or empty messages")) {
      errorMessage = "Please provide valid message content to proceed.";
    }

    // Pass the error message to the callback for UI display
    onMessageUpdate(`Error: ${errorMessage}`);
    throw new Error(errorMessage);
  }
}
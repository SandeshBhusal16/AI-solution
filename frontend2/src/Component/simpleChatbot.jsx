import ChatBot from "react-chatbotify";
import chatbot from "../assets/chatbot2.jpg";

const Chatbotify = () => {
  const helpOptions = [
    "Company Overview",
    "Services Offered",
    "Industries Served",
    // "Client Testimonials",
    // "Future Vision",
    "Contact Details",
    "FAQs",
    // "Events and Blogs",
  ];

  const faqResponses = {
    "What is AI Solution":
      "AI Solutions is a company dedicated to innovating and promoting the digital employee experience through AI-driven solutions.",
    "What are your services":
      "We offer AI-Powered Virtual Assistants, Rapid Prototyping Tools, Predictive Analytics, NLP solutions, and Custom AI Development.",
    "Which industries do you serve":
      "We serve healthcare, retail, education, and IT sectors, among others.",
    "How can I contact AI Solution":
      "You can reach us at info@aisolutions.com or call us at +44 117 2345678.",
    "What is your vision":
      "Our vision is to make a global impact by enhancing workplace productivity through AI-driven solutions.",
  };

  const flow = {
    start: {
      message: "Hello, I am AI Solutions chatbot 😊!",
      transition: { duration: 1000 },
      path: "show_options",
    },

    show_options: {
      message: "How can I help you?",
      options: helpOptions,
      path: "process_options",
    },

    prompt_again: {
      message: "Do you need any other help?",
      options: helpOptions,
      path: "process_options",
    },

    unknown_input: {
      message: "I'm not sure I understand. Here are some options:",
      options: helpOptions,
      path: "process_options",
    },

    faq_response: {
      message: "Let me help with that!",
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        const response = faqResponses[params.userInput];
        const message =
          response ||
          "I'm sorry, I don't have an answer for that. Here are some options:";
        await params.injectMessage(message);
        return response ? "repeat" : "unknown_input";
      },
    },

    greeting_response: {
      message: "Hiii! 😊 How can I assist you today?",
      options: helpOptions,
      path: "prompt_again",
    },

    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        let link = "";
        let message = "";
        switch (params.userInput) {
          case "Company Overview":
            message =
              "Name: AI Solutions\nMission: Innovate, promote, and deliver the future of the digital employee experience.\nVision: To make a global impact by enhancing workplace productivity through AI-driven solutions.\nUSP: AI-powered virtual assistants and affordable AI prototyping tools.";
            break;
          case "Services Offered":
            message =
              "Services Offered:\n- AI-Powered Virtual Assistants: Smart assistants that handle customer inquiries and automate workflows for businesses.\n- Rapid Prototyping Tools: AI-based tools that accelerate product development by creating prototypes quickly and efficiently.\n- Predictive Analytics: Insights to forecast trends and optimize business strategies using data-driven models.\n- Natural Language Processing (NLP): AI-driven solutions for sentiment analysis, chatbots, and automated language understanding.\n- Custom AI Development: Tailor-made AI models addressing specific business needs for seamless operations.";
            break;
          case "Industries Served":
            message =
              "Industries Served:\n- Healthcare: AI scheduling and patient management.\n- Retail: Customer insights and personalized marketing.\n- Education: AI-powered learning tools for student engagement.\n- IT: Automation and predictive analytics for tech services.";
            break;
          case "Client Testimonials":
            message =
              "Client Testimonials:\n- Sarah Thompson (Healthcare): 'AI Solutions revolutionized our patient scheduling, saving 30% of our operational time.'\n- David Lee (Retail): 'Thanks to AI Solutions, our sales increased by 20% through smarter customer insights.'\n- Emily Carter (Education): 'AI-powered tools helped improve student engagement by 40% in just six months.'";
            break;
          case "Future Vision":
            message =
              "Future Vision:\n- Integration of AI with Augmented Reality (AR).\n- Development of intuitive, voice-based AI assistants for businesses.\n- Expansion into global markets with innovative, scalable solutions.";
            break;
          case "Contact Details":
            message =
              "Contact Details:\nAddress: Sunderland, UK\nEmail: info@aisolutions.com\nPhone: +44 123 456 789\nWebsite: www.aisolutions.com";
            break;
          case "FAQs":
            message =
              "FAQs:\nQ: What industries does AI Solutions serve?\nA: We serve healthcare, retail, education, and IT, among others.\nQ: Do I need an account to inquire about services?\nA: No, you can directly use our 'Contact Us' form without creating an account.";
            break;
          case "Events and Blogs":
            message =
              "Events and Blogs:\nUpcoming Events: AI Innovations Expo, March 2024.\nBlogs:\n- Revolutionizing the Workplace with AI\n- Accelerating Prototyping with AI.";
            break;
          case "hello":
            message = "Hiii! 😊 How can I assist you today?";
            break;
          default:
            return "faq_response";
        }
        await params.injectMessage(message);
        return "repeat";
      },
    },

    repeat: {
      transition: { duration: 3000 },
      path: "prompt_again",
    },
  };

  return (
    <ChatBot
      settings={{
        header: {
          title: "AI Solutions Chatbot",
        },
        chatButton: {
          icon: chatbot,
        },
        chatHistory: { storageKey: "ai_solution_chatbot" },
      }}
      flow={flow}
    />
  );
};

export default Chatbotify;

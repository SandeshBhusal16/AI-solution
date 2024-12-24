import ChatBot from "react-chatbotify";
import chatbot from "../assets/chatbot2.jpg";
const Chatbotify = () => {
  const helpOptions = ["Events", "Past Portfolio", "About Us", "Contact Us"];
  const flow = {
    start: {
      message: "Hello, I am AI Assistance chatbot 😊!",
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
      message: "I can help with this.",
      options: helpOptions,
      path: "process_options",
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
        switch (params.userInput) {
          case "Events":
            link = "http://localhost:5173/event";
            break;
          case "Past Portfolio":
            link = "http://localhost:5173/past-portfolio";
            break;
          case "About Us":
            link = "http://localhost:5173/about";
            break;
          case "Contact Us":
            link = "http://localhost:5173/contactUs";
            break;
          case "hello":
          case "Hello":
            return "greeting_response";
          default:
            return "unknown_input";
        }
        await params.injectMessage("Sit tight! I'll send you right there!");
        setTimeout(() => {
          window.open(link);
        }, 1000);
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
          title: "AI Solution Chatbot",
        },
        chatButton: {
          icon: chatbot,
        },

        chatHistory: { storageKey: "example_faq_bot" },
      }}
      flow={flow}
    />
  );
};

export default Chatbotify;

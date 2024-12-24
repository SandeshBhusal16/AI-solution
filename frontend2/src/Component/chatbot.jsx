import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

const ChatBot = () => {
  // Config
  const config = {
    botName: "AI Assistant",
    initialMessages: [
      {
        type: "text",
        content: "Hello! How can I assist you today?",
      },
    ],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#376B7E",
      },
      chatButton: {
        backgroundColor: "#5ccc9d",
      },
    },
  };

  // Message Parser
  class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }

    parse(message) {
      const lowerCaseMessage = message.toLowerCase();

      if (lowerCaseMessage.includes("hello")) {
        this.actionProvider.greet();
      } else if (
        lowerCaseMessage.includes(
          "services" || "what services you can provide ?"
        )
      ) {
        this.actionProvider.explainServices();
      } else if (lowerCaseMessage.includes("contact")) {
        this.actionProvider.provideContactInfo();
      } else {
        this.actionProvider.defaultReply();
      }
    }
  }

  // Action Provider
  class ActionProvider {
    constructor(createChatbotMessage, setStateFunc) {
      this.createChatbotMessage = createChatbotMessage;
      this.setState = setStateFunc;
    }

    greet() {
      const message = this.createChatbotMessage("Hi there! How can I help?");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }

    explainServices() {
      const message = this.createChatbotMessage(
        "We offer AI-powered solutions, including virtual assistants, prototyping tools, and productivity enhancement software.",
        {
          widget: "suggestions",
        }
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }

    provideContactInfo() {
      const message = this.createChatbotMessage(
        "You can reach us at contact@aisolution.com or call us at +123456789. Let us know how we can help!"
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }

    defaultReply() {
      const message = this.createChatbotMessage(
        "I'm sorry, I didn't understand that. Can you rephrase your question?"
      );

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  }

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatBot;

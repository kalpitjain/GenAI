import React, { useState } from "react";

function Bot() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async () => {
    try {
      const apiResponse = await fetch("http://localhost:4000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!apiResponse.ok) {
        throw new Error("API request failed");
      }

      const responseData = await apiResponse.json();
      const updatedConversation = [
        ...conversation,
        { text: question, isUser: true },
        { text: responseData.message, isUser: false },
      ];
      setConversation(updatedConversation);
      setQuestion("");
    } catch (error) {
      const errorMessage = "An error occurred while processing your request.";
      const updatedConversation = [
        ...conversation,
        { text: question, isUser: true },
        { text: errorMessage, isUser: false, isError: true },
      ];
      setConversation(updatedConversation);
      setQuestion("");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.isUser ? "user-message" : "bot-message"
            } ${msg.isError ? "error-message" : ""}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default Bot;

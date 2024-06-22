import React, { useState } from "react";

const Message = ({ text, isUser, isError }) => (
  <div
    className={`message ${isUser ? "user-message" : "bot-message"} ${
      isError ? "error-message" : ""
    }`}
  >
    {text}
  </div>
);

const LoadingIndicator = () => <div className="loading">typing...</div>;

function Bot() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (question.trim() === "") return;

    setLoading(true);
    const userMessage = { text: question, isUser: true };

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
      const botMessage = { text: responseData.message, isUser: false };

      setConversation((prevConversation) => [
        ...prevConversation,
        userMessage,
        botMessage,
      ]);
    } catch (error) {
      const errorMessage = {
        text: "An error occurred while processing your request.",
        isUser: false,
        isError: true,
      };

      setConversation((prevConversation) => [
        ...prevConversation,
        userMessage,
        errorMessage,
      ]);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {conversation.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            isUser={msg.isUser}
            isError={msg.isError}
          />
        ))}
        {loading && <LoadingIndicator />}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSubmit();
            }
          }}
          disabled={loading}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Bot;

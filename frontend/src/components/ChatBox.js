import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to Backend
const socket = io.connect("http://localhost:8080");

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // Get username of current user
  const user = JSON.parse(localStorage.getItem("user"))?.user;
  const username = user ? user.full_name : "Guest";

  useEffect(() => {
    // Listen to messages from Server
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    // Cleanup to avoid duplicate listening
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      // Send message to Server
      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {/* Toggle chat */}
      <button
        className="btn btn-primary rounded-circle p-3 shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        Chat
      </button>

      {/* Chat box */}
      {isOpen && (
        <div
          className="card shadow mt-2"
          style={{ width: "300px", height: "400px" }}
        >
          <div className="card-header bg-primary text-white d-flex justify-content-between">
            <strong>Chat Community</strong>
            <button
              className="btn-close btn-close-white"
              onClick={() => setIsOpen(false)}
            ></button>
          </div>

          {/* Message list */}
          <div
            className="card-body overflow-auto"
            style={{ height: "280px", backgroundColor: "#f8f9fa" }}
          >
            {messageList.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.author === username ? "text-end" : "text-start"
                }`}
              >
                <small className="text-muted" style={{ fontSize: "10px" }}>
                  {msg.author}
                </small>
                <div
                  className={`p-2 rounded ${
                    msg.author === username
                      ? "bg-primary text-white"
                      : "bg-white border"
                  }`}
                  style={{ display: "inline-block", maxWidth: "80%" }}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          {/* Input message */}
          <div className="card-footer d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter message..."
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyPress={(event) => event.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

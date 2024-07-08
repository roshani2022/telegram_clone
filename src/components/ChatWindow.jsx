import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, Typography } from "@mui/material";
import ChatWindowHeader from "./ChatWindowHeader"; // Import the ChatWindowHeader component

const ChatWindow = ({ onMessagesLoaded }) => {
  const { chatId } = useParams();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [chatHeader, setChatHeader] = useState({
    avatar: location.state?.avatar || '',
    fullName: location.state?.fullName || '',
    date: new Date().toLocaleDateString()
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chat messages");
        }
        const data = await response.json();
        if (data.status === "success") {
          const messagesArray = data.data.map(messageObj => ({
            id: messageObj.id,
            message: messageObj.message,
            sender: messageObj.sender.name
          }));
          setMessages(messagesArray); // Update state with messages array
          toast.success("User messages fetched successfully!");
          // Pass messages to parent component
          onMessagesLoaded(chatId, messagesArray);

          // Assuming the chat header data is included in the response (update according to your API)
          setChatHeader(prevHeader => ({
            ...prevHeader,
            avatar: data.avatar || prevHeader.avatar, // Placeholder for avatar URL
            fullName: data.fullName || prevHeader.fullName, // Placeholder for full name
          }));
        } else {
          throw new Error(data.message || "Failed to fetch chat messages");
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
        toast.error("Failed to fetch chat messages. Please try again later.");
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId, onMessagesLoaded]);
  console.log("ngd",messages)

  return (
    <div className="chat-window">
      <ChatWindowHeader fullName={chatHeader.fullName} avatar={chatHeader.avatar} date={chatHeader.date} />
      <div className="messages-list" style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto', padding: '10px' }}>
        {messages.map((message) => (
          <Card key={message.id} variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="body2">
                <strong>{message.sender}: </strong> {message.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;

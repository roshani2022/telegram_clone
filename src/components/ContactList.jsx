import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar, Grid, Button, Typography, Box, Divider,Card ,CardContent} from "@mui/material";
import ChatWindow from "./ChatWindow"; // Import your ChatWindow component
import { useMediaQuery } from "@mui/material";

const ContactList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedChat, setSelectedChat] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `https://devapi.beyondchats.com/api/get_all_chats?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const data = await response.json();
        if (data.status === "success") {
          const chatsData = await Promise.all(
            data.data.data.map(async (chat) => {
              const lastMessageResponse = await fetch(
                `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chat.id}`
              );
              const lastMessageData = await lastMessageResponse.json();
              chat.lastMessage =
                lastMessageData.data[0]?.message || "No messages yet";
              return chat;
            })
          );
          setChats(chatsData);
          setTotalPages(data.data.last_page);
          toast.success("Chats fetched successfully!");
        } else {
          throw new Error(data.message || "Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        toast.error("Failed to fetch chats. Please try again later.");
      }
    };

    fetchChats();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectChat = async (chatId, name, avatar) => {
    try {
      const response = await fetch(
        `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch chat messages");
      }
      const data = await response.json();
      const messages = data.data.map((messageObj) => ({
        id: messageObj.id,
        message: messageObj.message,
        sender: messageObj.sender.name,
      }));
      setSelectedChat({ id: chatId, name, avatar, messages });

      // Navigate to chat window if on small screen
      if (isSmallScreen) {
        onSelectChat(chatId, name, avatar);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      toast.error("Failed to fetch chat messages. Please try again later.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "JD"; // Default initials if name is not available
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[nameParts.length - 1][0];
    }
    return nameParts[0][0];
  };
console.log(selectedChat)
  return (
    <Grid container spacing={2}>
      {/* Contact List Section */}
      <Grid item xs={12} md={4} className="contact-list">
        <Divider sx={{ my: 2 }} />
        <ul style={{ listStyleType: "none", padding: 0, margin: "6px" }}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() =>
                handleSelectChat(
                  chat.id,
                  chat.creator.name,
                  chat.creator.avatar
                )
              }
              className="contact-item"
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar sx={{ mr: 2, mb: 1 }}>
                {getInitials(chat.creator.name)}
              </Avatar>
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="body1">
                  {chat.creator.name || "John Doe"}
                </Typography>
                <Typography variant="body2">
                  {chat.lastMessage.substring(0, 30)}...
                </Typography>
              </Box>
            </li>
          ))}
        </ul>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography variant="body2">
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
      </Grid>

      {/* Chat Window Section (For Desktop) */}
      {!isSmallScreen && (
        <Grid item xs={12} md={8}>
          {selectedChat && (
            <Box className="chat-window" sx={{ padding: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 2 }}>
                <Typography variant="h6">{selectedChat.name}</Typography>
                <Typography variant="body2">
                  Last seen: {new Date().toLocaleString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Box>
              {/* <ChatWindow chatId={selectedChat.id} messages={selectedChat.messages} /> */}
              <div
                className="messages-list"
                style={{
                  maxHeight: "calc(100vh - 180px)",
                  overflowY: "auto",
                  padding: "10px",
                }}
              >
                {selectedChat.messages.map((message) => (
                  <Card
                    key={message.id}
                    variant="outlined"
                    style={{ marginBottom: "10px" }}
                  >
                    <CardContent>
                      <Typography variant="body2">
                        <strong>{message.sender}: </strong> {message.message}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Box>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default ContactList;

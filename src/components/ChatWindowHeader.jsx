import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Utility function to get initials from full name
const getInitials = (name) => {
  if (!name) return "JD"; // Default initials if name is not available
  const nameParts = name.trim().split(" ");
  if (nameParts.length > 1) {
    return nameParts[0][0] + nameParts[nameParts.length - 1][0];
  }
  return nameParts[0][0];
};

const ChatWindowHeader = ({ fullName, avatar, date }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  // Format date and time
  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      className="chat-header"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <IconButton onClick={handleBackClick}>
        <ArrowBackIcon />
      </IconButton>
      <Avatar alt={fullName} src={avatar || undefined}>
        {!avatar && getInitials(fullName)}
      </Avatar>
      <div style={{ marginLeft: "10px", flex: 1 }}>
        <Typography variant="h6">{fullName}</Typography>
        <Typography variant="subtitle2">{`Last Seen: ${formattedDate}`}</Typography>
      </div>
      <IconButton>
        <PhoneIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </div>
  );
};

export default ChatWindowHeader;

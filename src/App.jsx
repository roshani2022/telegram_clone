
import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeContext } from "./components/ThemeContext";
import Chat from "./components/Chat";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  const { mode } = useContext(ThemeContext);

  return (
    
      <Box
        sx={{
          bgcolor: mode === "light" ? "lightcyan" : "darkcyan",
          color: mode === "light" ? "darkblue" : "white",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/chat/:chatId" element={<ChatWindow />} />
        </Routes>
      </Box>
  );
};

export default App;


// import React, { useState } from "react";
// import { Box } from "@mui/material";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import ContactList from "./ContactList";
// import ChatWindow from "./ChatWindow";

// const Chat = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState({});
//   const navigate = useNavigate();

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleMessagesLoaded = (chatId, messages) => {
//     setChatMessages((prevMessages) => ({
//       ...prevMessages,
//       [chatId]: messages,
//     }));
//   };

//   const handleSelectChat = (chatId, fullName, avatar) => {
//     navigate(`/chat/${chatId}`, { state: { fullName, avatar } });
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           height: "100vh",
//           width: "100vw",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Header handleDrawerToggle={handleDrawerToggle} />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <ContactList onSelectChat={handleSelectChat} chatMessages={chatMessages} />
//             }
//           />
//           <Route
//             path="/chat/:chatId"
//             element={<ChatWindow onMessagesLoaded={handleMessagesLoaded} />}
//           />
//         </Routes>
//       </Box>
//       <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
//     </>
//   );
// };

// export default Chat;
import React, { useState } from "react";
import { Box } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContactList from "./ContactList";
import ChatWindow from "./ChatWindow";

const Chat = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState({});

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMessagesLoaded = (chatId, messages) => {
    setChatMessages((prevMessages) => ({
      ...prevMessages,
      [chatId]: messages,
    }));
  };

  const handleSelectChat = (chatId, fullName, avatar) => {
    navigate(`/chat/${chatId}`, { state: { fullName, avatar } });
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList onSelectChat={handleSelectChat} chatMessages={chatMessages} />
            }
          />
          <Route
            path="/chat/:chatId"
            element={<ChatWindow onMessagesLoaded={handleMessagesLoaded} />}
          />
        </Routes>
      </Box>
      <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </>
  );
};

export default Chat;


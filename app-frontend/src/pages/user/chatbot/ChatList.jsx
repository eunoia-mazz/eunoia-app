// // // import React, { useEffect, useState } from "react";
// // // import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// // // import PostAddIcon from "@mui/icons-material/PostAdd";
// // // import Chat from "../../../components/atoms/Chat";
// // // import { NavLink } from "react-router-dom";
// // // import axios from "axios";
// // // import useStore from "../../../useStore";

// // // function ChatList() {
// const setCurrentChatId = useStore((state) => state.setCurrentChatId);
// const clientId = useStore((state) => state.clientId);
// const setCurrentChat = useStore((state) => state.setCurrentChat);
// const currentChatId = useStore((state) => state.currentChatId);
// const [chat_ids, setChat_ids] = useState([]);
// // const [chatTitles, setChatTitle] = useState([]);
// const [chats, setChats] = useState([]);
// function removeChat(chatId) {
//   setChat_ids((prevChatIds) => prevChatIds.filter((id) => id !== chatId));
// }
// function startNewChat() {
//   setCurrentChatId(null);
//   setCurrentChat([]);
//   axios
//     .post("http://localhost:5000/create_chat", {
//       user_id: clientId,
//     })
//     .then((data) => {
//       console.log("data", data);
//       console.log("data.chatId", data.data.chat_id);
//       setCurrentChatId(data.data.chat_id);
//     })
//     .catch((err) => {
//       console.log("err in chatid creation : ", err);
//     });
// }
// useEffect(() => {
//   console.log("clientId clientId", clientId);
//   function getAllChats() {
//     axios
//       .post("http://localhost:5000/get_all_chats", {
//         user_id: clientId,
//       })
//       .then((response) => {
//         console.log("response huh", response);
//         const chats = response.data.chats;
//         setChats(chats);
//         console.log("nope", response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   getAllChats();
//   console.log("chat_ids", chat_ids);
// }, [currentChatId, chats, chat_ids]);
// // //   return (
// // //     <div className="flex w-1/5 bg-white text-[#1B5F7C] min-h-screen flex-wrap justify-center">
// // //       <div className="w-5/6 h-[10vh] flex justify-between items-center">
// // //         <NavLink className="cursor-pointer text-decoration-none" to="/">
// // //           <ArrowBackIosIcon />
// // //           <span className="font-semibold text-sm">Home </span>
// // //         </NavLink>
// // //         <div className="cursor-pointer" onClick={startNewChat}>
// // //           <abbr title="New Chat">
// // //             <PostAddIcon />
// // //           </abbr>
// // //         </div>
// // //       </div>

// // //       <div className="w-full flex flex-row h-[90vh] justify-center items-start flex-wrap overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#ebebeb] scrollbar-track-[#ffffff]">
// // //         <div className="w-full flex flex-wrap justify-center items-center py-3 pl-2 gap-3">
// {chats &&
//   chats.map((chat, id) => (
//     <Chat key={id} info={chat} removeChat={removeChat} />
//   ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ChatList;
// // import React, { useEffect, useState } from "react";
// // import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// // import PostAddIcon from "@mui/icons-material/PostAdd";
// // import Chat from "../../../components/atoms/Chat";
// // import { NavLink } from "react-router-dom";
// // import axios from "axios";
// // import useStore from "../../../useStore";

// // function ChatList() {
// //   const setCurrentChatId = useStore((state) => state.setCurrentChatId);
// //   const clientId = useStore((state) => state.clientId);
// //   const setCurrentChat = useStore((state) => state.setCurrentChat);
// //   const currentChatId = useStore((state) => state.currentChatId);
// //   const [chat_ids, setChat_ids] = useState([]);
// //   const [chats, setChats] = useState([]);

// //   function removeChat(chatId) {
// //     setChat_ids((prevChatIds) => prevChatIds.filter((id) => id !== chatId));
// //   }

// //   function startNewChat() {
// //     setCurrentChatId(null);
// //     setCurrentChat([]);
// //     axios
// //       .post("http://localhost:5000/create_chat", {
// //         user_id: clientId,
// //       })
// //       .then((data) => {
// //         setCurrentChatId(data.data.chat_id);
// //       })
// //       .catch((err) => {
// //         console.log("Error creating chat:", err);
// //       });
// //   }

// //   useEffect(() => {
// //     function getAllChats() {
// //       axios
// //         .post("http://localhost:5000/get_all_chats", {
// //           user_id: clientId,
// //         })
// //         .then((response) => {
// //           const chats = response.data.chats;
// //           setChats(chats);
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //         });
// //     }
// //     getAllChats();
// //   }, [currentChatId, chats, chat_ids]);

// //   return (
// //     <div className="flex w-1/5 bg-white text-[#1B5F7C] min-h-screen flex-wrap justify-center">
// //       <div className="w-5/6 h-[10vh] flex justify-between items-center">
// //         <NavLink className="cursor-pointer text-decoration-none" to="/">
// //           <ArrowBackIosIcon />
// //           <span className="font-semibold text-sm">Home </span>
// //         </NavLink>
// //         <div className="cursor-pointer" onClick={startNewChat}>
// //           <abbr title="New Chat">
// //             <PostAddIcon />
// //           </abbr>
// //         </div>
// //       </div>

// //       <div className="w-full flex flex-row h-[90vh] justify-center items-start flex-wrap overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#ebebeb] scrollbar-track-[#ffffff]">
// //         <div className="w-full flex flex-wrap justify-center items-center py-3 pl-2 gap-3">
// //           {chats &&
// //             chats.map((chat, id) => (
// //               <Chat key={id} info={chat} removeChat={removeChat} />
// //             ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ChatList;
// import React, { useState } from "react";
// import {
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   CssBaseline,
//   Box,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// const drawerWidth = 240;

// const ChatList = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const theme = useTheme();
//   // Check if screen is small (sm and below)
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawerContent = (
//     <Box sx={{ width: drawerWidth, padding: 2 }}>
//       <List>
//         <ListItem button>
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Dashboard" />
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon>
//             <AccountCircleIcon />
//           </ListItemIcon>
//           <ListItemText primary="Profile" />
//         </ListItem>
//         {/* Add more list items as needed */}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       {/* Toggle button is placed at a fixed position so it stays visible even when sidebar is collapsed */}
//       <IconButton
//         color="inherit"
//         aria-label="open sidebar"
//         onClick={handleDrawerToggle}
//         sx={{
//           position: "fixed",
//           top: 16,
//           left: 16,
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//         }}
//       >
//         <MenuIcon />
//       </IconButton>
//       {/* Temporary drawer for small screens */}
//       {isSmallScreen && (
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawerContent}
//         </Drawer>
//       )}
//       {/* Permanent drawer for larger screens */}
//       {!isSmallScreen && (
//         <Drawer
//           variant="permanent"
//           open
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             "& .MuiDrawer-paper": {
//               width: drawerWidth,
//               boxSizing: "border-box",
//             },
//           }}
//         >
//           {drawerContent}
//         </Drawer>
//       )}
//       {/* Main content
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           marginLeft: { sm: isSmallScreen ? 0 : `${drawerWidth}px` },
//           transition: "margin 0.3s",
//         }}
//       >
//         <Box sx={{ mt: 8 }}>
//           <h1>Main Content</h1>
//           <p>
//             This area is your main content. On small screens the sidebar is
//             hidden by default; click the button in the top-left corner to toggle
//             its visibility.
//           </p>
//         </Box>
//       </Box> */}
//     </Box>
//   );
// };

// export default ChatList;
import React, { useState, useEffect } from "react";
import { Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Chat from "@/components/atoms/Chat";
import useStore from "@/useStore";
import axios from "axios";
import CurrentChat from "./CurrentChat";

const ChatList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    // Adjust sidebar state when screen size changes
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const setCurrentChatId = useStore((state) => state.setCurrentChatId);
  const clientId = useStore((state) => state.clientId);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const currentChatId = useStore((state) => state.currentChatId);
  const [chat_ids, setChat_ids] = useState([]);
  // const [chatTitles, setChatTitle] = useState([]);
  const [chats, setChats] = useState([]);
  function removeChat(chatId) {
    setChat_ids((prevChatIds) => prevChatIds.filter((id) => id !== chatId));
  }
  function startNewChat() {
    setCurrentChatId(null);
    setCurrentChat([]);
    axios
      .post("http://localhost:5000/create_chat", {
        user_id: clientId,
      })
      .then((data) => {
        console.log("data", data);
        console.log("data.chatId", data.data.chat_id);
        setCurrentChatId(data.data.chat_id);
      })
      .catch((err) => {
        console.log("err in chatid creation : ", err);
      });
  }
  useEffect(() => {
    console.log("clientId clientId", clientId);
    function getAllChats() {
      axios
        .post("http://localhost:5000/get_all_chats", {
          user_id: clientId,
        })
        .then((response) => {
          console.log("response huh", response);
          const chats = response.data.chats;
          setChats(chats);
          console.log("nope", response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAllChats();
    console.log("chat_ids", chat_ids);
  }, [currentChatId, chats, chat_ids]);
  return (
    <div className="w-full ">
      {/* Toggle Button */}
      <IconButton
        color="inherit"
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          left: 16,
          top: 16,
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "blue",
          "&:hover": {
            backgroundColor: "blue",
          },
        }}
      >
        {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
      >
        <div
          style={{
            padding: "10px",
            paddingTop: "100px",
          }}
        >
          {/* <h2>Sidebar Content</h2> */}
          {chats &&
            chats.map((chat, id) => (
              <Chat key={id} info={chat} removeChat={removeChat} />
            ))}
        </div>
      </Drawer>

      {/* Main Content */}
      <div
        style={{
          marginLeft: isOpen && !isMobile ? "240px" : "0",
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),

          // padding: "24px",
        }}
      >
        <CurrentChat />
      </div>
    </div>
  );
};

export default ChatList;

Live link of telegeram clone-
https://telegram-clone1.netlify.app/
Sets up the overall application structure using Routes.
Uses ThemeProvider from ThemeContextProvider to manage the theme (light/dark mode).
Renders Chat component for the main chat interface and ChatWindow for individual chat sessions based on route paths.
Manages state for drawerOpen (sidebar toggle), chatMessages (stores messages for each chat), and uses useNavigate for routing.
Includes Header component for navigation and Sidebar component for additional functionalities.
Uses Routes and Route from react-router-dom to render ContactList for displaying contacts and ChatWindow for individual chats.
Fetches a paginated list of chats from the backend API (get_all_chats) and their last messages (get_chat_messages) for each chat.
Displays fetched chats with avatars and last messages, supporting pagination for navigation through chat pages.
Handles selection of a chat, triggering a fetch for detailed messages and passing data to ChatWindow for display.
Uses useParams to extract chatId from the URL path to fetch specific chat messages (get_chat_messages API).
Manages state for messages to store fetched chat messages and chatHeader for displaying chat header information (avatar, full name).
Utilizes useEffect to fetch messages on component mount and updates messages state accordingly.
Renders fetched messages in a scrollable list within a card-based layout, displaying sender names and message content.mplements a drawer (Drawer) component from Material-UI for navigation options like "My Profile", "Contacts", "Settings", etc.
Integrates icons (ListItemIcon) for each navigation item (List) and handles handleDrawerToggle to open/close the sidebar.rovides ThemeContext for managing application theme (light and dark modes).
Uses ThemeProvider from Material-UI to apply the selected theme across the application.
Includes toggleTheme function to switch between light and dark themes.

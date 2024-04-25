import { Box, Toolbar } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { SideBar } from "../components/SideBar";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  //sx={{ flexGrow: 1, p: 3 }}=> p es general para los 4 lados
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar drawerWidth={drawerWidth}></Navbar>
      <SideBar drawerWidth={drawerWidth}></SideBar>
      <Box component={"main"} sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar></Toolbar>
        {children}
      </Box>
    </Box>
  );
};

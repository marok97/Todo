import React, { useRef, useState } from "react";
import {
  Toolbar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItem,
  Divider,
  Tooltip,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logOut as logOutAction } from "../../features/login/authSlice";
import { useNavigate } from "react-router-dom";

const IconListItems = ({ icons }) => {
  return icons.map((icon) => {
    return (
      <ListItem>
        <ListItemButton>
          <ListItemIcon sx={{ color: "white", opacity: "50%" }}>
            {icon}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    );
  });
};

const Sidebar = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  function logOut() {
    dispatch(logOutAction());
    // navigate("/login");
  }

  const icons = [
    // <GridViewOutlinedIcon />,
    <PersonIcon />,
    <CalendarMonthOutlinedIcon />,
    <AssessmentOutlinedIcon />,
    <CloudUploadOutlinedIcon />,
    <TuneIcon />,
    <InfoIcon />,
  ];
  const drawerWidth = 90;

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "primary.main",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider sx={{ backgroundColor: "white" }} />
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <GridViewOutlinedIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <IconListItems icons={icons} />
          <ListItem
            sx={{
              position: "fixed",
              bottom: 0,
              paddingBottom: 4,
              width: "auto",
            }}
          >
            <Tooltip title="Log out" arrow>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "white", opacity: "50%" }} />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

import React, { useState } from "react";
import {
  List,
  ListItemText,
  Collapse,
  ListItemButton,
  Typography,
  ListItem,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TeamsMenuItem = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={
            <Typography fontWeight="bold" sx={{ opacity: open ? 1 : 0.5 }}>
              Teams
            </Typography>
          }
        />
        {open ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItem>
                <ListItemButton>
                    <ListItemText primary="hej"></ListItemText>
                </ListItemButton>
            </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default TeamsMenuItem;

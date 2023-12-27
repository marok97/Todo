import React, { useState } from "react";
import {
  List,
  ListItemText,
  Collapse,
  ListItemButton,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MessengersMenuItem = () => {
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
              Messengers
            </Typography>
          }
        />
        {open ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding></List>
      </Collapse>
    </>
  );
};

export default MessengersMenuItem;

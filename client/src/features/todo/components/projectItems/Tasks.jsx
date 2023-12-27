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

const TasksMenuItem = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={
            <Typography fontWeight="bold" sx={{ opacity: open ? 1 : 0.5 }}>
              Tasks
            </Typography>
          }
        />
        {open ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText primary="All tasks (3)" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText primary="To do (4)" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText primary="In progress (4)" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemText primary="Done (3)" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default TasksMenuItem;

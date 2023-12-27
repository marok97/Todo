import React, { useState } from "react";
import {
  List,
  ListItemText,
  Collapse,
  ListItemButton,
  Typography,
  ListItem
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProjectsMenuItem = () => {
  const [open, setOpen] = useState(true);

  const choices = [
    { id: 1, label: "All projects (3)", isActive: true },
    { id: 2, label: "Design system", isActive: false },
    { id: 3, label: "User flow", isActive: false },
    { id: 4, label: "UX research", isActive: false },
  ];
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={
            <Typography fontWeight="bold" sx={{ opacity: open ? 1 : 0.5 }}>
              Projects
            </Typography>
          }
        />
        {open ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {choices.map((choice) => (
            <ListItem key={choice.id}>
              <ListItemButton
                selected={choice.isActive}
                sx={{ pl: 6, borderRadius: 4 }}
                // onClick={() => setIsActive(!isActive)}
              >
                <ListItemText primary={choice.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default ProjectsMenuItem;

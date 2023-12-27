import React from "react";
import { List } from "@mui/material";
import ProjectsMenuItem from "./projectItems/ProjectsMenuItem";
import TeamsMenuItem from "./projectItems/TeamsMenuItem";
import TasksMenuItem from "./projectItems/Tasks";
import RemindersMenuItem from "./projectItems/Reminders";
import MessengersMenuItem from "./projectItems/Messengers";

const SideMenu = () => {
  return (
    <List>
      <TeamsMenuItem />
      <ProjectsMenuItem />
      <TasksMenuItem />
      <MessengersMenuItem />
      <RemindersMenuItem />
    </List>
  );
};

export default SideMenu;

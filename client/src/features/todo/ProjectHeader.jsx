import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const CalendarDate = () => {
  const today = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <Box display={"flex"}>
      <CalendarMonthOutlinedIcon />
      <Typography pl={1} sx={{ opacity: 0.6 }}>
        {formattedDate}
      </Typography>
    </Box>
  );
};

const ProjectHeader = () => {
  const navItems = [
    <SearchIcon />,
    <NotificationsNoneOutlinedIcon />,
    <CalendarDate />,
    <Avatar sx={{ width: 30, height: 30 }} />,
  ];

  return (
    <AppBar
      component={"nav"}
      elevation={0}
      position="sticky"
      sx={{ height: 80, color: "black", backgroundColor: "#fff", justifyContent:"center" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Welcome back, Christoffer
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item) => (
            <IconButton key={item}>{item}</IconButton>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ProjectHeader;

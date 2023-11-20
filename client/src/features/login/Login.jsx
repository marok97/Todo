import {
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Slide,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { styled } from "@mui/system";
import { useState, useRef, useEffect } from "react";
import { green, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, selectCurrentToken } from "./authSlice";
import service from "../../app/api/service";
import axios from "axios";
import { useSelector } from "react-redux";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "400px",
  margin: "auto",
  marginTop: theme.spacing(8),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "#CC0000",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Login = () => {
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [locked, setLocked] = useState(true);
  const handleLock = () => {
    setLocked((prevState) => !prevState);
  };

  const authenticate = () => {
    handleLock();
  };
  const containerRef = useRef(null);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await service.Auth.login(user, password);
      console.log(userData);

      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPassword("");

      const token = userData["access_token"];
      console.log(token)

      axios.interceptors.request.use((request) => {
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
      });

      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  return (
    <StyledPaper elevation={3} ref={containerRef}>
      {locked && (
        <StyledAvatar sx={{ bgcolor: red[700] }}>
          <LockIcon />
        </StyledAvatar>
      )}
      {!locked && (
        <Slide
          direction="left"
          in={!locked}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
          timeout={800}
        >
          {
            <StyledAvatar sx={{ bgcolor: green[500] }}>
              <LockOpenIcon />
            </StyledAvatar>
          }
        </Slide>
      )}
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          ref={userRef}
          onChange={handleUserInput}
          value={user}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
        />
        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // onClick={handleSubmit}
        >
          Sign In
        </StyledButton>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </StyledForm>
    </StyledPaper>
  );
};

export default Login;

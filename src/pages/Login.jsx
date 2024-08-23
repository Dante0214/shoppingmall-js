import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmail, signUpWithEmail } from "../services/authService";
import { supabase } from "../services/supabaseClient";

const Login = ({ setLogin }) => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const nav = useNavigate();

  const handleOAuthSignIn = async (provider) => {
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: "https://shoppingmall-js.vercel.app/",
        },
      });
      if (error) throw error;
      setLogin(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (signUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      setLogin(true);
      nav("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {signUp ? "회원가입" : "로그인"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            minWidth: isMobile ? "70vw" : "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {signUp ? "회원가입" : "로그인"}
          </Button>
          <Button onClick={() => setSignUp(!signUp)} fullWidth variant="text">
            {signUp
              ? `이미 계정이 있습니까? 로그인`
              : "계정이 없습니까? 회원가입"}
          </Button>
          <Button
            onClick={() => handleOAuthSignIn("github")}
            fullWidth
            variant="text"
            sx={{ mb: 2, textTransform: "none" }}
          >
            GitHub로 로그인
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

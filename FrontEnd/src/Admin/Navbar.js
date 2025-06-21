import { useHistory, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Avatar, Button, Box } from "@mui/material";
import React from "react";
import Auth from "modules/Auth";

const Navbar = () => {
  const history = useHistory();

  const logout = () => {
    Auth.logout();
    history.push("/");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#E2F0CB", color: "#000", zIndex: 1300 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
            Admin Dashboard
          </Typography>
        </Link>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar alt="Admin Avatar" sx={{ width: 32, height: 32 }} />
          <Button
            onClick={logout}
            variant="contained"
            color="error"
            sx={{
              padding: "6px 16px",
              fontWeight: 500
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

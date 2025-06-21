import { NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#eaf0e1",
        },
      }}
    >
      {/* Khoảng cách dưới navbar */}
      <Toolbar />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/admin/account">
            <ListItemText primary="Tài khoản" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/admin/order">
            <ListItemText primary="Đơn hàng" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/admin/storage">
            <ListItemText primary="Kho hàng" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

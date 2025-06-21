import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const AdminLayout = (props) => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Navbar />
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "10px", marginTop: 64, marginLeft:50, overflowY: "auto" }}>
        {props.children}
      </main>
    </div>
  );
};

export default AdminLayout;

import API from "myAxios/API";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";

const StatCard = ({ icon, title, value, color }) => (
  <Card
    sx={{
      display: "flex",
      alignItems: "center",
      p: 2,
      transition: "0.3s",
      "&:hover": {
        boxShadow: 6,
        transform: "scale(1.02)",
      },
    }}
  >
    <Box
      sx={{
        bgcolor: color,
        color: "#fff",
        p: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mr: 2,
      }}
    >
      {icon}
    </Box>
    <CardContent>
      <Typography variant="subtitle1" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {value.toLocaleString("en-US")}
      </Typography>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    orderCount: 0,
    productCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API({
          method: "GET",
          url: "/admin/stats",
        });
        if (response.status === 200) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 4 }}>
  <Typography variant="h4" fontWeight="bold" gutterBottom>
    Admin Dashboard
  </Typography>
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Link to="/admin/account" style={{ textDecoration: 'none' }}>
        <StatCard
          title="Số lượng người dùng"
          value={stats.userCount-1}
          icon={<PeopleIcon fontSize="large" />}
          color="#1976d2"
        />
      </Link>
    </Grid>
    <Grid item xs={12} md={4}>
      <Link to="/admin/order" style={{ textDecoration: 'none' }}>
        <StatCard
          title="Tổng đơn hàng"
          value={stats.orderCount}
          icon={<ShoppingCartIcon fontSize="large" />}
          color="#388e3c"
        />
      </Link>
    </Grid>
    <Grid item xs={12} md={4}>
      <Link to="/admin/storage" style={{ textDecoration: 'none' }}>
        <StatCard
          title="Sản phẩm trong kho"
          value={stats.productCount}
          icon={<StoreIcon fontSize="large" />}
          color="#fbc02d"
        />
      </Link>
    </Grid>
  </Grid>
</Box>
  );
};

export default AdminDashboard;

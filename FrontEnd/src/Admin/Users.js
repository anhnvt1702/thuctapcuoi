import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import API from "myAxios/API";

const fetchUsers = async () => {
  const response = await API({
    method: "GET",
    url: "/user/admin/getAllUsers",
  });

  return response.data.users;
};

const UserStats = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    userName: "",
    fullName: "",
    email: "",
    phone: "",
    status: "",
  });

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    loadUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      status: user.status,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await API({
        method: "PUT",
        url: `/user/admin/updateUser/${selectedUser.userId}`,
        data: updatedUser,
      });

      const refreshed = await fetchUsers();
      setUsers(refreshed);
      setOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  return (
    <div>
      <h2 className="m-4 font-bold">Danh sách người dùng</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
        <DialogContent>
          {["userName", "fullName", "email", "phone", "status"].map((field) => (
            <TextField
              key={field}
              fullWidth
              margin="dense"
              label={field}
              value={updatedUser[field]}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, [field]: e.target.value })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Huỷ
          </Button>
          <Button onClick={handleSave} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserStats;

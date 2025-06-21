import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import API from "myAxios/API";
import { getOrderStatusColor, getOrderStatusText } from "utils/commonData";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API({
          method: "GET",
          url: "/order/admin/orders",
        });

        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    API({
      method: "PUT",
      url: `/order/${orderId}/status`,
      data: { status: Number(newStatus) },
    })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId
              ? { ...order, order_Status: newStatus }
              : order
          )
        );
      })
      .catch((err) => console.error("Lỗi cập nhật trạng thái:", err));
  };

  return (
    <div>
      <h2 style={{ margin: "1rem 0" }}>Danh sách đơn hàng</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thay đổi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.orderId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.customer_Name}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <span
                    style={{ color: getOrderStatusColor(order.order_Status) }}
                  >
                    {getOrderStatusText(order.order_Status)}
                  </span>
                </TableCell>
                <TableCell>
                  <Select
                    value={order.order_Status}
                    onChange={(e) =>
                      handleStatusChange(order.orderId, e.target.value)
                    }
                    size="small"
                  >
                    <MenuItem value="1">Đang xử lý</MenuItem>
                    <MenuItem value="2">Xác nhận</MenuItem>
                    <MenuItem value="3">Đóng gói</MenuItem>
                    <MenuItem value="4">Hủy bỏ</MenuItem>
                    <MenuItem value="5">Đang vận chuyển</MenuItem>
                    <MenuItem value="6">Hoàn tất</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderAdmin;

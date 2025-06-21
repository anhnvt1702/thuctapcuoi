import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Avatar } from "@mui/material";
import API from "myAxios/API";

const AdminStorage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API({
      method: "GET",
      url: "/product/storage",
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm trong kho:", err);
      });
  }, []);

  return (
    <Paper style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        Kho hàng - Danh sách sản phẩm
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Ảnh</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Số lượng còn lại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.productId}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>
                <Avatar variant="square" src={product.img1path} alt={product.productName} />
              </TableCell>
              <TableCell>{product.price.toLocaleString()} VNĐ</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AdminStorage;

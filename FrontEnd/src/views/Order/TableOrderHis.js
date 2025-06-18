// ** React Imports
import React from 'react'
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material'
import { Order_Status_Enum } from 'utils/commonData'
import { DateTimeDisplay_1 } from 'utils/commonFunction'
import styled from '@emotion/styled'
import OrderHisDetail from './OrderHisDetail' 

const columns = [
  { id: 'orderDate', label: 'Thời gian đặt hàng', minWidth: 170, format: (value) => DateTimeDisplay_1(value) },
  { id: 'order_Status', label: 'Trạng thái', minWidth: 170, setColor: true, format: (value) => getOrderStatusText(value) },
  { id: 'customer_Name', label: 'Khách hàng', minWidth: 200 },
  { id: 'address', label: 'Địa chỉ', minWidth: 200 },
  { id: 'phone', label: 'SĐT', minWidth: 200 },
]


const CustomTablePagination = styled(TablePagination)({
  padding: '0',
});
function getOrderStatusText(status) {
  

  switch (status) {
    case Order_Status_Enum.DANG_XU_LY:
      return 'Đang xử lý'
    case Order_Status_Enum.DA_HUY_BO:
      return 'Đã huỷ bỏ'
    case Order_Status_Enum.DA_HOAN_TAT:
      return 'Đã hoàn tất'
    default:
      return 'Không xác định'
  }
}
function GetColor_OrderStatus(status) {
  try {
    console.log(`status=${JSON.stringify(status)}`);

    var color = "";
    switch (status) {
      case Order_Status_Enum.DANG_XU_LY:
        color = '#e6b800'
        break;
      case Order_Status_Enum.DA_HUY_BO:
        color = 'red'
        break;
      case Order_Status_Enum.DA_HOAN_TAT:
        color = 'green'
        break;
      default:
        color = 'blue'
        break;
    }
    return color
  } catch (error) {
    console.error(error)
  }
}

function TableOrderHis({ orders }) {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderSelected, setOrderSelected] = useState(null)
  const [openDialogDetail, setOpenDialogDetail] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const btnViewClick = (order) => {
    setOrderSelected(order)
    setOpenDialogDetail(true)
  }

  const closeFormDetail = () => {
    setOpenDialogDetail(false);
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && Array.isArray(orders) ? (orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.order_Id}>
                    {columns.map(column => {
                      const value = row[column.id]

                      return (
                        <TableCell key={column.id} align={column.align}>
                          <span style={column.setColor ? { color: GetColor_OrderStatus(row.order_Status) } : {}}>
                            {column.format ? column.format(value) : value}
                          </span>
                        </TableCell>
                      )
                    })}
                    <TableCell>
                      <Tooltip title="Xem thông tin đơn hàng">
                        <IconButton color="primary" aria-label="search" onClick={() => btnViewClick(row)}>
                          <InfoIcon/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                  </TableRow>
                )
              })) : (null)}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          sx={{
            ".MuiTablePagination-displayedRows": {
              marginBottom: "0",
            },
            ".MuiTablePagination-selectLabel": {
              marginBottom: "0",
            },
          }}

          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={orders && Array.isArray(orders) ? orders.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số bản ghi/trang"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên tổng số ${count}`}
        />
      </Paper>
      {orderSelected &&
        <OrderHisDetail p_order={orderSelected} openDialogDetail={openDialogDetail} closeFormDetail={closeFormDetail}></OrderHisDetail>
      }
    </>
  )
}

export default TableOrderHis

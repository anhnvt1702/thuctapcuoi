// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField';

// ** Demo Components Imports
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search'; // Import icon tìm kiếm (hoặc sử dụng biểu tượng tìm kiếm tùy chọn)
import React, { useState, useEffect } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { getOrdersByUser } from 'api/orderApi';
import TableOrderHis from './TableOrderHis';
import Auth from 'modules/Auth';
import { User_Side_Enum, commonData } from 'utils/commonData';

function OrderHis() {

    const dispatch = useDispatch();
    const [textSearch, SetTextSearch] = useState('');
    const [orders, setOrders] = useState([])

    useEffect(() => {
        search(false);
        // dispatch(addCallback(ORDER_SEARCH, search))
    }, []);

    const search = async (showMsgNodata = true) => {
        try {

            const keySearch = User_Side_Enum.USER + "|" + textSearch
            const userName = (Auth && Auth.getUserDetails() && Auth.getUserDetails().user_Name) ?? ""

            getOrdersByUser(userName, keySearch).then((data) => {
                console.log(`getOrdersByUser=${JSON.stringify(data)}`);

                setOrders(data);
            }).catch((error) => {
                console.error("Error:", error);
            });

            setOrders(orders)
        }
        catch (error) {
            console.error(error);
        }
    }

    const btnSearchClick = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            search();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container' style={{ marginTop: "200px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Card sx={{ padding: '0,0,0,0' }}>
                        <CardContent sx={{ padding: '0,0,0,0' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        label="Tìm kiếm"
                                        variant="outlined"
                                        onChange={(e) => SetTextSearch(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                </Grid>
                                <Grid item xs={12} md={3}
                                    sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained" onClick={btnSearchClick}><SearchIcon /></Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Thông tin đơn hàng' titleTypographyProps={{ variant: 'h6' }} />
                        <TableOrderHis orders={orders} />
                    </Card>
                </Grid>

            </Grid>

        </div>

    )
}

export default OrderHis

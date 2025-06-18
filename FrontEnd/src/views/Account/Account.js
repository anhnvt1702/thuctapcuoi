// ** React Imports
import React from 'react';

import { useState } from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useEffect } from 'react';
import { GetUserById } from 'api/accountApi';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Auth from 'modules/Auth';
import { Typography } from 'antd';
import { Box } from '@mui/material';

// ** Icons Imports

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))


const TabAccount = () => {
    // ** State
    const [openAlert, setOpenAlert] = useState(true)
    const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
    const { accountId } = useParams();

    const [user, setUser] = useState({});

    useEffect(() => {
        const userName = (Auth && Auth.getUserDetails() && Auth.getUserDetails().user_Name) ?? ""

        GetUserById(userName, accountId ? accountId : 0)
            .then((data) => {
                setUser(data);
                if (data.avatar) {
                setImgSrc(data.avatar);  
            }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }, []);

    const onChange = file => {
        const reader = new FileReader()
        const { files } = file.target
        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result)
            reader.readAsDataURL(files[0])
        }
    }

    const onInputChange = (e, property) => {
        setUser({
            ...user,
            [property]: e.target.value
        });
    }

    if (Auth && Auth.IsValidated()) {
        return (
            (<div className="container" style={{ marginTop: "200px" }}>
                <CardContent>
                    <form>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sx={{ marginTop: 4.8 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={imgSrc} alt='Profile Pic' style={{ width: "100px", height: "100px", border: '1px solid #e6e6e6', margin: "0 10px" }} />
                                    <Box>
                                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                                            Chọn ảnh
                                            <input
                                                hidden
                                                type='file'
                                                onChange={onChange}
                                                accept='image/png, image/jpeg'
                                                id='account-settings-upload-image'
                                            />
                                        </ButtonStyled>

                                        <Typography variant='body2' sx={{ marginTop: 5 }}>
                                            Ảnh đại diện của bạn
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Tài khoản' value={user && user.userName} aria-readonly={true} InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Họ và tên' value={user && user.fullName} aria-readonly={true} InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth type='email' label='Email' value={user && user.email} aria-readonly={true} InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth type='Trạng thái' label='Trạng thái' value={user && user.status_Text} aria-readonly={true} InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant='contained'>
                                    Lưu thay đổi
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </div>
            )
        )
    } else {
        return (
            <div className="container">
                <h5 style={{ marginTop: "150px" }}>Bạn phải đăng nhập để sử dụng chức năng này</h5>
            </div>
        )
    }
}

export default TabAccount

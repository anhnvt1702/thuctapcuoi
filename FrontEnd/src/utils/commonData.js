export const commonData = {
    base_url_api: 'http://localhost:5001',
    usertype_admin: '0',
    msgNoData: 'Không có dữ liệu tìm kiếm',
    msg_search_error: 'Xảy ra lỗi khi tìm kiếm',
    error_type: 'error',
    success_type: 'success',
    time_hide_notification: 2000,
    EXEFLAG_ADDNEW: 1,
    EXEFLAG_EDIT: 2,
    EXEFLAG_DELETE: 3,
    EXEFLAG_CANCEL: 9,
    EXEFLAG_CLOSE: 8,
    EXEFLAG_CREATE: 12,
    EXEFLAG_EXECUTED: 4,
    EXEFLAG_REFUSE: 14,
    EXEFLAG_CONFIRM: 13,

    rowPerPage : 20,
}

export const Order_Status_Enum={
    DANG_XU_LY : '1',
    DA_XAC_NHAN: '2',
    DA_DONG_GOI: '3',
    DA_HUY_BO: '4',
    DANG_VAN_CHUYEN:'5',
    DA_HOAN_TAT : '6'
}

export const SettleMethodEnum ={
    COD : '1',
    BankAccount : '2',
}

const env = process.env.NODE_ENV || 'development';
// const env = process.env.HNX_ENV ;


export const constHostAddressConfig = {
    WSHostAddress: env === "production" ? "ws://localhost:5001/ws" : "ws://localhost:5001/ws",
}

export const User_Side_Enum={
    ADMIN : '1',
    USER: '2',
}

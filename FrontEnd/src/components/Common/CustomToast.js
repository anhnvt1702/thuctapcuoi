import { toast } from 'react-toastify';

const time_close = 3000;

// Hàm tùy chỉnh để hiển thị thông báo
export const showToast = (message, type = SUCCESS) => {
    switch (type) {
        case SUCCESS:
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: time_close, // 3 giây
            });
            break;
        case ERROR:
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: time_close, // 3 giây
            });
            break;
        case WARNING:
             toast.warning(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: time_close, // 3 giây
            });
            break;
        default:
            toast.info(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: time_close, // 3 giây
            });
    }
};

export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';
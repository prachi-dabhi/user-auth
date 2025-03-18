
import toast from "react-hot-toast";


export const SERVERNAME= import.meta.env.VITE_SERVER_NAME;

export const showSuccessToast = (message, options = {}) => {
    return toast.success(message, {
        ...options,
        className: "success-toast",
        duration: options.duration || 5000,
    });
};

export const showErrorToast = (message, options = {}) => {
    return toast.error(message, {
        ...options,
        className: "error-toast",
        duration: options?.duration || 5000,
    });
};


import toast from "react-hot-toast";


export const SERVERNAME= import.meta.env.VITE_SERVER_NAME;

export const showSuccessToast = (message, options = {}) => {
    return toast.success(message, {
        ...options,
        className:
            " bg-white font-openSans font-medium text-base leading-[20px] !text-green border border-green",
        duration: options.duration || 5000,
    });
};

export const showErrorToast = (message, options = {}) => {
    if (message == "Unauthorized") {
        return
    }
    return toast.error(message, {
        ...options,
        className:
            "bg-white font-openSans font-medium text-base leading-[20px] !text-red border border-red",
        duration: options?.duration || 5000,
    });
};

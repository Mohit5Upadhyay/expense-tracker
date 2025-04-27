
// configuring API paths for different environments

export const BASE_URL = import.meta.env.VITE_API_BACKEND_URL || "http://localhost:8000";


// API paths :
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/me",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/delete/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/download-excel",
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/delete/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/download-excel",
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/image/upload-image",
    }
}





import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: 0,
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: 1,
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: 2,
        label: "Expense",
        icon: LuHandCoins,
        path: "/expenses",
    },

    {
        id: 3,
        label: "Logout",
        icon: LuLogOut,
        path: "/logout",
    }
]

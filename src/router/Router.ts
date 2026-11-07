import { createBrowserRouter } from "react-router-dom";
import DashboardUsers from "../page/user/dashboard";
import LayoutUsers from "../layouts/layouts.user";

const router = createBrowserRouter([
    {
        path: "/",
        Component : LayoutUsers,
        children : [
            {index  : true, Component : DashboardUsers}
        ]
    }
])

export default router
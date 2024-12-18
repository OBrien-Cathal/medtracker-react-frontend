import { userRoles as ur } from "../data/userRoles.ts";
import UserManagement from "../pages/UserManagment";
export const admin_routes = [
    { 
        path: "/userManagement",
        ele: <UserManagement/>,
        availability:[ur.admin]
    }
]
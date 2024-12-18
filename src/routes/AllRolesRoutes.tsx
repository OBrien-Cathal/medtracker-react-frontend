import AccountManagement from "../pages/AccountManagment.tsx";
import {userRoles as ur} from "../data/userRoles.ts";

export const allRoles_routes = [
    {
        path: "/accountManagement",
        ele: <AccountManagement/>,
        availability: [ur.user, ur.admin, ur.practitioner]
    }
]
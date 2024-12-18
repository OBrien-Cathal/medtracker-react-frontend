import {Navigate} from "react-router-dom"
import {useLocation} from "react-router-dom";
import Swal from 'sweetalert2';
import authenticationManager from "../auth/authenticationManager";

const RequireAuth = (children: any) => {
    let currentUserRole
    const location = useLocation();

    if (!authenticationManager.isLoggedIn()) {
        console.log("RequireAuth: not logged in")
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }

    let user = authenticationManager.getLoggedInUser()
    currentUserRole = user.currentUserRole

    if (currentUserRole) {
        console.log("currentUserRole: " + currentUserRole)

        if (children.userroles) {
            console.log("location")
            console.log(location)
            console.log("roles")
            console.log(children.userroles)
            if (children.userroles.length === 0 || children.userroles.includes(currentUserRole)) {
                return children.children
            } else {
                Swal.fire('Access Denied !', "", 'warning')
                return <Navigate to="/"/>
            }
        } else {
            return children.children
        }
    } else {
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }
}
export default RequireAuth
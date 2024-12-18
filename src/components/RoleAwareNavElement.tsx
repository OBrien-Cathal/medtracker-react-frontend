import authenticationManager from "../auth/authenticationManager.tsx";
import {NavLink} from "react-router-dom";

const RoleAwareNavElement = (props: any) => {
    const pathAllowedForRole = props.route.availability
        .includes(authenticationManager.getLoggedInUser().currentUserRole);

    console.log(props.route)
    if ( pathAllowedForRole) {
        return (
            <div className="NavElement">
                {<NavLink to={props.route.path}>{props.route.path}</NavLink>}
            </div>
        )
    } else {
        return ''
    }
}
export default RoleAwareNavElement
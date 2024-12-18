import {NavLink} from "react-router-dom";

const RoleAwareNavElement = (props: any) => {
        console.log(props.route)
        return (
            <div className="NavElement">
                {<NavLink to={props.route.path}>{props.route.path}</NavLink>}
            </div>
        )
}
export default RoleAwareNavElement
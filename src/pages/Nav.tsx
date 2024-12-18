import {NavLink} from "react-router-dom"

export default function Nav() {


    return (
        <div className="Nav">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/AccountManagement">Account</NavLink>
            <NavLink to="/UserManagement">UserManagement</NavLink>
            <NavLink to="/upload">Upload</NavLink>
        </div>
    )
}

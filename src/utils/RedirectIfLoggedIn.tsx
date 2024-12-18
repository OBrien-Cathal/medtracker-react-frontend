import { Navigate } from "react-router-dom";
import authenticationManager from "../auth/authenticationManager.tsx";

const RedirectIfLoggedIn = (children:any)=>{
    if (authenticationManager.isLoggedIn()) {
        console.log("Navigate to home")
        return <Navigate to="/home" />
    }
    console.log("returning children of")
    console.log(children)
    return children.children;
}
export default RedirectIfLoggedIn;
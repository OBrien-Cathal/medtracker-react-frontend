import AppRoutes from "./routes/AppRoutes.tsx";
import './app.css'
import React from "react";
import {useEffect} from "preact/hooks";
import authenticationDataService from "./service/authentication.service"
import Swal from 'sweetalert2';
import authenticationManager from "./auth/authenticationManager.tsx";

function App() {
    useEffect(() => {
        if (!authenticationManager.isLoggedIn()) {
            return
        }
        console.log("Token on startup:")
        authenticationDataService.verifyAuthentication({token: authenticationManager.getToken()})
            .then(value => {
                console.log(value)
                if (!value.data.authenticated) {
                    Swal.fire('Session Expired!', "", 'warning')
                    authenticationManager.removeLogin()
                }
            }).catch((r) => {
            console.log(r.error.message)
        });
    })

    return (
        <React.Fragment>
            <AppRoutes></AppRoutes>
        </React.Fragment>
    );
}

export default App
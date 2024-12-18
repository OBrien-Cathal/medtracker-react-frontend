import {BrowserRouter, Route, Routes} from "react-router-dom";
import RequireAuth from "../utils/RequireAuth";
import RedirectIfLoggedIn from "../utils/RedirectIfLoggedIn";

// unprotectedRoutes
import {public_routes} from "./UnProtectedRoutes";
// protectedRoutes
import {admin_routes} from "./AdminRoutes";
import {user_routes} from "./UserRoutes";
import {general_routes} from "./GeneralRoutes";
import Nav from "../pages/Nav.tsx";
import {auth_routes} from "./AuthRoutes.tsx";


const AppRoutes = () => {
    const protectedRoutes = [
        ...admin_routes,
        ...user_routes,
        ...general_routes,
        ...public_routes,
        ...auth_routes
    ];
    const unprotectedRoutes = [...public_routes];

    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                {
                    unprotectedRoutes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                path={e.path}
                                element={e.ele}
                            />
                        );
                    })
                }
                {
                    auth_routes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                path={e.path}
                                element={
                                    <RedirectIfLoggedIn>
                                        {e.ele}
                                    </RedirectIfLoggedIn>
                                }
                                // element={e.ele}
                            />
                        );
                    })
                }

                {
                    protectedRoutes.map((e) => {
                        return (
                            <Route
                                key={e.path}
                                path={e.path}
                                element={
                                    <RequireAuth userroles={e.availability}>
                                        {e.ele}
                                    </RequireAuth>
                                }
                                // element={e.ele}
                            />
                        );
                    })
                }
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes;

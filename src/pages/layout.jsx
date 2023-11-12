import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Login from "./login";
import AppbarComponent from "../components/appbarComponent";

function Layout() {
    const reducer = useSelector(state => state.reducer);
    return <>
        {
            reducer.login ? <div className="h-full">
                <AppbarComponent />
                <Outlet />
            </div> : <Login />
        }
    </>
}
export default Layout;
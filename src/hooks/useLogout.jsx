import axios from "../api/axios";
import useAuth from "./useAuth";

const logoutUrl = "https://intrendsanalytics.herokuapp.com/logout"
const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios(logoutUrl, {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    } 

    return logout;
}

export default useLogout
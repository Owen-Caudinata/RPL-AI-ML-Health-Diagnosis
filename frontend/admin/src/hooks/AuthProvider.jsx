import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const loginAction = async (formData) => {
        try {
            const response = await fetch(apiUrl + "/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });


            const res = await response.json();
            // console.log(res);

            if (res) {
                localStorage.setItem("site", res.token);
                setToken(res.token);

                const adminResponse = await fetch(apiUrl + "/admin/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + res.token
                    }
                });

                if (adminResponse.ok) {
                    const adminData = await adminResponse.json();
                    setAdmin(adminData);

                    navigate("/");
                    return;
                } else {
                    alert("Wrong username or password");
                    console.error("User request failed:", adminResponse.statusText);
                }
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };


    const logOut = () => {
        setAdmin(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ admin, token, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
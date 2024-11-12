import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Extract the token and user info from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        const user = queryParams.get("user");
        const email = queryParams.get("email");
        const _id = queryParams.get("_id");

        if (token) {
            // Store user information and token in local storage
            localStorage.setItem("userToken", JSON.stringify({ name: user, email, _id, token: token }));

            // Redirect to the home page or any other desired route
            navigate("/");
        }
    }, [navigate]);

    return <div>Authenticating...</div>;
};

export default AuthSuccess;

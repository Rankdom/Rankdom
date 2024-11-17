
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import './Form.css';
import api from "./api";
import LoadingIndicator from "./components/loading.tsx";


function Login() {

     const [email, setEmail] = useState("");
     const route = "Login/"
     const [loading ,setLoading] =useState(false)


 const navigate = useNavigate();
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault()
        try {

                await api.post(route,{email})

                navigate("/authenticator/")

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Login</h1>
            <input
                className="form-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                autoFocus

            />

             {loading && <LoadingIndicator/>}
            <button className="form-button" type="submit">Login</button>
            {/* Link to Register page */}
            <p>Don't have an account? <Link to="/Register">Register here</Link></p>
        </form>
    );
}

export default Login;

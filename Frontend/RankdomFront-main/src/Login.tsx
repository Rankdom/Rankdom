
import { useState } from "react";
import { Link } from "react-router-dom";
import './Form.css';

function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Handle login logic here
        } catch (error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Login</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <button className="form-button" type="submit">Login</button>
            {/* Link to Register page */}
            <p>Don't have an account? <Link to="/Register">Register here</Link></p>
        </form>
    );
}

export default Login;

import { useState } from "react";
import './Form.css';

interface RegisterProps {
    name: string;
}

function Register({ name }: RegisterProps) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Handle form submission logic
        } catch (error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={"form-container"}>
            <h1>{name}</h1>
            {name === "Register" && (
                <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
            )}
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
            <button className={"form-button"} type="submit">{name}</button>
        </form>


    );
}

export default Register;

import { useState} from "react";
import '../Form.css';
import {useNavigate} from "react-router-dom";
import api from "../api.js";
import LoadingIndicator from "./loading";



function Form({route,name}) {
    const [email,setEmail] =useState("")
    const [username,setUsername] =useState("")
    const [loading ,setLoading] =useState(false)
    let requiredEmail=false









    const navigate = useNavigate();
        requiredEmail=true
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault()
        try {

                await api.post(route,{username,email})

                navigate("/authenticator/")

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <form method="POST" onSubmit={handleSubmit} className={"form-container"}>
            <h1> {name}</h1>
            {name == "Register" && (
                <input className="form-input" type={"email"}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={"email"}
                       required={requiredEmail }
                />

            )}
            <input className="form-input"
                   type={"text"}
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   placeholder={"username"}
                   required

            />

            {loading && <LoadingIndicator/>}
            <button className={"form-button"} type="submit">{name}</button>
        </form>


);
}

export default Form;


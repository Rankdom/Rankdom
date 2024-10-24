import {useContext, useState} from "react";
import '../Form.css';
import {useNavigate,useParams } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import api from "../api.js";
import LoadingIndicator from "./loading";



function Authenticator() {
    const message = "You have now received an authentication code, congratulations. Check your Junk Folder please"
    const [loading ,setLoading] =useState(false)
    const [code ,setCoce] =useState("")
    const route="/authenticator/"
    const navigate = useNavigate();




    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault()
        try {
            await api.post(route,{code})
            navigate("/")

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form method="POST" onSubmit={handleSubmit} className={"form-container"}>
            <h3> {message}</h3>

                <input className="form-input" type={"text"}
                       value={code}
                       onChange={(e) => setCoce(e.target.value)}
                       placeholder={"code"}
                       required={true }
                />



            {loading && <LoadingIndicator/>}
            <button className={"form-button"} type="submit">{'Authenticate'}</button>
        </form>
    );
}

export default Authenticator;


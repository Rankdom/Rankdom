import {useState} from "react";
import '../Form.css';
import {useNavigate} from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import api from "../api.js";
import LoadingIndicator from "./loading";

function Authenticator({route}) {
    const message = "You have now received an authentication code, congratulations. Check your Junk Folder please"
    const [loading ,setLoading] =useState(false)
    const [code ,setCoce] =useState("")

    let requiredEmail=false

    const navigate = useNavigate();
    if(name=="Register")
        requiredEmail=true
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault()
        try {


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
                       required={requiredEmail }
                />



            {loading && <LoadingIndicator/>}
            <button className={"form-button"} type="submit">{'Authenticate'}</button>
        </form>
    );
}

export default Authenticator;


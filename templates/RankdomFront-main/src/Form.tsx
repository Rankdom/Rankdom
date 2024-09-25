import {useState} from "react";
import './Form.css';
import {useNavigate} from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN} from "./constants.JS";
import api from "./api.JS";
import LoadingIndicator from "./components/loading";
import {TurborepoAccessTraceResult} from "next/dist/build/turborepo-access-trace";

function Form({route,name}) {
    const [password,setPassword] =useState("")
    const [email,setEmail] =useState("")
    const [username,setUsername] =useState("")
    const [loading ,setLoading] =useState(false)
    let requiredEmail=false

    const navigate = useNavigate();
    if(name=="Register")
        requiredEmail=true
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault()
        try {

            if(name=="Login"){
                const  res = await api.post(route,{username,password})
                if(res=="Success"){
                    navigate("/")

                }
                else{
                alert(res.data.message)

                }
            }
            else{
                 await api.post(route,{username,password,email})

                navigate("/routeGoogle")

            }
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
            <input className="form-input" type={"password"}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder={"password"}
                   required

            />
            {loading && <LoadingIndicator/>}
            <button className={"form-button"} type="submit">{name}</button>
        </form>
    );
}

export default Form;


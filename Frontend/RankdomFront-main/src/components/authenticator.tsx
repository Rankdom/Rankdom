import { useState } from "react";
import "../Form.css";
import { useNavigate } from "react-router-dom";
import api from "./api.tsx";
import LoadingIndicator from "./loading";

interface AuthenticatorProps {
  route: string;
  name: string;
}


function Authenticator({ route, name }: AuthenticatorProps) {
  const message = "You have now received an authentication code, congratulations. Check your Junk Folder please";
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    try {
      await api.post(route, { code });
      const authToken = code;
      localStorage.setItem("authToken", authToken);
      navigate("/Profile");
    } catch (error) {
      alert((error as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit} className={"form-container"}>
      <h3>{message}</h3>
      <input
        className="form-input"
        type={"text"}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={"code"}
        required={true}
      />
      {loading && <LoadingIndicator />}
      <button className={"form-button"} type="submit">
        {name}
      </button>
    </form>
  );
}

export default Authenticator;

import { useContext, useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { dispatch } = useContext(AuthContext)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const guestLogin = (e) => {
    e.preventDefault();
    setEmail(import.meta.env.VITE_APP_USER_MAIL);
    setPassword(import.meta.env.VITE_APP_USER_PASSWORD);
  };

  const submitLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // sign in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user })
        navigate("/")
        // ...
      })
      .catch((error) => {
        setError(true)
      });
  };
  return (
    <div className="login">
      <form>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={submitLogin}>Login</button>
        <button className="guestButton" onClick={guestLogin}>Guest</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  )
}

export default Login
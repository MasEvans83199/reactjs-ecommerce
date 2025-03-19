import { useContext, useState } from "react"
import axios from "axios";
import { Modal } from "./Modal";
import { InputField } from "./InputField";
import { CurrentUserContext } from "../context/CurrentUserProvider";

export const SignUp = () => {
    const [isVisible, setVisibility] = useState(false);
    const [user, token, setToken] = useContext(CurrentUserContext);
    const [firstName, setFirstName] = useState("Mason");
    const [lastName, setLastName] = useState("E");
    const [location, setLocation] = useState("TN");
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("123456");
    const [confirmPassword, setConfirmPassword] = useState("123456");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const emptyFormFields = 
        !firstName || !lastName || !location || !email || !password || !confirmPassword;

    const passwordsNotMatch = password !== confirmPassword;

    if (!isVisible)
        return <button onClick={() => setVisibility(true)}>Sign Up</button>

    return (
        <Modal setVisibility={setVisibility}>
            <InputField label="First Name:" value={firstName} setValue={setFirstName} />
            <InputField label="Last Name:" value={lastName} setValue={setLastName} />
            <InputField label="Email:" value={email} setValue={setEmail} />
            <InputField label="Password:" value={password} setValue={setPassword} type="password" />
            <InputField label="Confirm Password:" value={confirmPassword} setValue={setConfirmPassword} type="password" />
            <InputField label="Location:" value={location} setValue={setLocation} />

            {error && (
                <div style={{border:"2px solid red"}}>
                    <p style={{color:"red"}}>{error}</p>
                </div>
            )}

            <button onClick={async ()=> {
                setIsSubmitted(true)
                if(emptyFormFields)
                    return setError("All fields are required.");
                if(passwordsNotMatch)
                    return setError("Passwords do not match.");
                setError("");

                try {
                    const response = await axios.post("http://localhost:8080/api/signup", {firstName, lastName, email, password, location});

                    const {data:{token}} = response;
                    setToken(token);
                    setVisibility(false);
                } catch(e) {
                    if(e.response.status === 409)
                        setError("Email already in use.");
                    else {
                        setError("Error creating user");
                        console.log(e);
                    }
                }
            }}
            >
                Sign Up
            </button>
        </Modal>
    )
}
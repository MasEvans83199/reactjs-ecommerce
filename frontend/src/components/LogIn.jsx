import { useState } from "react";
import { Modal } from "./Modal";
import { InputField } from "./InputField";

export const LogIn = () => {
    const [isVisible, setVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if(!isVisible)
        return <button onClick={() =>setVisibility(true)}>Log In</button>

    return (
        <Modal setVisibility={setVisibility}>
            <InputField label="Email:" setValue={setEmail} value={email} />
            <InputField label="Password:" setValue={setPassword} value={password} type="password"/>
            <button>Log In</button>
        </Modal>
    )
}
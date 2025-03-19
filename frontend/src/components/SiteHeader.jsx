import { useContext, useState } from "react"
import { Column } from "./Column"
import { LogIn } from "./LogIn"
import { Row } from "./Row"
import { SignUp } from "./SignUp"
import { CartContext } from "../context/CartProvider"
import { ViewCart } from "./ViewCart"
import { CurrentUserContext } from "../context/CurrentUserProvider"
import { useNavigate } from "react-router-dom"

export const SiteHeader = () => {
    const [currentUser, token, setToken] = useContext(CurrentUserContext);
    const navigate = useNavigate();
    return (
        <Column>
            <Row>
                <h1>Ecommerce App</h1>
                <Row>
                    <ViewCart />
                    {currentUser ? (
                        <>
                            <button onClick={() => {
                                navigate("/orders")
                            }}>View Orders</button>
                            <button onClick={() => setToken(null)}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <SignUp />
                            <LogIn />
                        </>
                    )}
                </Row>
            </Row>
        </Column>
    )
}
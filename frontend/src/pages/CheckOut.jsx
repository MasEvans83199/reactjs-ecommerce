import { useContext, useEffect, useState } from "react";
import { CartItemsList } from "../components/CartItemsList";
import { Column } from "../components/Column"
import { Row } from "../components/Row";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { CartContext } from "../context/CartProvider";

export const CheckOut = () => {
    const waitTime = 5 * 1000;
    const [cartItems, setCartItems] = useContext(CartContext);
    const [timeRemaining, setTimeRemaining] = useState(waitTime / 1000);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isConfirmed) {
            setCartItems([]);
            setTimeout(() => navigate("/"), waitTime);
            setInterval(() => setTimeRemaining(pre => pre - 1), 1000);
        }
    }, [isConfirmed])

    return (
        <Column>
            {isConfirmed ? (
                <div>
                    <p>Thank you. Order confirmed.</p>
                    <p>Returning to home in {timeRemaining} seconds...</p>
                </div>
            ) : (
                <Column>
                    <h2>User Info</h2>
                    <CartItemsList inMemory={true} />
                    <Row style={{ justifyContent: "center" }}>
                        <ConfirmModal label="Confirm Order" setIsConfirmed={setIsConfirmed} />
                        <button onClick={() => navigate("/")}>Continue Shopping</button>
                    </Row>
                </Column>
            )}
        </Column>
    )
}
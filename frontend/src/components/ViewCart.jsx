import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal"
import { CartContext } from "../context/CartProvider";
import { getNumberOfItemsInCart } from "../utils/cartManagement";
import { CartItemsList } from "./CartItemsList";

export const ViewCart = () => {
    const navigate = useNavigate();
    const [isVisible, setVisibility] = useState(false);
    const [cartItems] = useContext(CartContext);

    const numberOfItemsInCart = getNumberOfItemsInCart(cartItems);
    return (
        <>
            <button onClick={() => setVisibility(true)}>
                🛒 {numberOfItemsInCart > 0 ? `(${numberOfItemsInCart})` : ""}
            </button>
            {isVisible && (
                <Modal setVisibility={setVisibility}>
                    <CartItemsList />
                    <button onClick={()=> {
                        navigate("/check-out")
                        setVisibility(false);
                        }}>Check Out 🛒</button>
                </Modal>
            )}
        </>
    )
}
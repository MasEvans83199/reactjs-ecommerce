import { useContext, useState } from "react"
import { Modal } from "./Modal"
import { CartContext } from "../context/CartProvider";
import { getNumberOfItemsInCart } from "../utils/cartManagement";
import { CartItemsList } from "./CartItemsList";

export const ViewCart = () => {
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
                </Modal>
            )}
        </>
    )
}
import { useContext, useState } from "react"
import axios from "axios";
import { Column } from "./Column";
import { Row } from "./Row";
import { Modal } from "./Modal";
import { CurrentUserContext } from "../context/CurrentUserProvider";
import { CartContext } from "../context/CartProvider";
import { getCartTotal, getNumberOfItemsInCart } from "../utils/cartManagement";

export const ConfirmModal = ({ setIsConfirmed, label }) => {
    const [cartItems] = useContext(CartContext);
    const [currentUser, token,] = useContext(CurrentUserContext);
    const [isVisible, setVisibility] = useState(false);

    return (
        <>
            <button onClick={() => setVisibility(true)}>{label}</button>
            {isVisible && (<Modal setVisibility={setVisibility} >
                <Column>
                    <h3>Are you sure?</h3>
                    <Row style={{ justifyContent: "center" }}>
                        <button onClick={async () => {
                            try {
                                const cartTotal = getCartTotal(cartItems);
                                const numberOfItems = getNumberOfItemsInCart(cartItems);

                                await axios.post("http://localhost:8080/api/place-order", {
                                    user: {
                                        uid: currentUser.uid,
                                        email: currentUser.email,
                                        firstName: currentUser.firstName,
                                        lastName: currentUser.lastName,
                                        location: currentUser.location
                                    },
                                    order: {
                                        items: cartItems.map(item => ({
                                            productId: item.id,
                                            quantity: item.count,
                                            price: item.price
                                        })),
                                        total: cartTotal,
                                        itemCount: numberOfItems
                                    }
                                }, {
                                    headers: {
                                        authorization: `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    },
                                    withCredentials: true
                                });
                                setIsConfirmed(true);
                                setVisibility(false);
                            } catch (e) {
                                console.log("Error placing order", {
                                    message: e.message,
                                    response: e.response?.data,
                                    status: e.response?.status
                                });
                            }
                        }}
                        >
                            ✅Confirm
                        </button>
                        <button
                            onClick={() => {
                                setVisibility(false)
                            }}
                        >
                            🚫Cancel
                        </button>
                    </Row>
                </Column>
            </Modal>
            )}
        </>

    )
}
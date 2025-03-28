import { Row } from "./Row"
import { updateItemInCart } from "../utils/cartManagement"
import { useContext } from "react"
import { CartContext } from "../context/CartProvider"

export const CartItem = ({ index, item, inMemory }) => {
    const [cartItems, setCartItems] = useContext(CartContext);

    return (
        <>
            <p style={{ textAlign: "right" }}>{index + 1}</p>
            <p style={{ textAlign: "left" }}>{item.title}</p>
            <p style={{ textAlign: "left" }}>{item.price}</p>
            <Row>
                { inMemory &&
                    <button onClick={() => setCartItems((pre) => updateItemInCart("remove", item, pre))}>➖</button>
                }
                <p style={{ textAlign: "center" }}>{item.count}</p>
                { inMemory &&
                    <button onClick={() => setCartItems((pre) => updateItemInCart("add", item, pre))}>➕</button>
                }
            </Row>
            { inMemory &&
                <button onClick={() => setCartItems((pre) => updateItemInCart("delete", item, pre))}>❌</button>
            } : {
                <p>Completed</p>
            }
        </>
    )
}
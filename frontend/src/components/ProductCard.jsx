import { useContext } from "react";
import { Column } from "./Column";
import { ProductImage } from "./ProductImage";
import { Row } from "./Row";
import { CartContext } from "../context/CartProvider";
import { updateItemInCart } from "../utils/cartManagement";

export const ProductCard = ({ product }) => {
    const [cartItems, setCartItems] = useContext(CartContext);
    const {
        id,
        title,
        alt,
        imageSource,
        price,
        availability,
    } = product;

    return (
        <Column
            style={{
                width: "200px",
                height: "350px",
                margin: "8px",
                padding: "8px",
                border: "2px solid lightgray",
                borderRadius: "8px",
            }}
        >
            <ProductImage src={imageSource} alt={alt} title={title} />
            <h3>{title}</h3>
            <Row>
                <h4>${price}</h4>
                {!availability && (
                    <p style={{ color: "red", fontStyle: "italic" }}>Out of Stock</p>
                )}
            </Row>
            <button
                onClick={() => setCartItems((pre) => updateItemInCart("add", product, pre))}
                disabled={!availability}
            >
                    Add to Cart 🛒
            </button>
        </Column>
    )
}
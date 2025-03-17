import { Column } from "./Column";
import { ProductImage } from "./ProductImage";
import { Row } from "./Row";

export const ProductCard = ({ product }) => {
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
            width:"200px",
            height:"350px",
            margin:"8px",
            padding:"8px",
            border:"2px solid lightgray",
            borderRadius:"8px",
        }}
        >
            <ProductImage src={imageSource} alt={alt} title={title} />
            <h3>{title}</h3>
            <Row>
                <h4>${price}</h4>
                {!availability && (
                    <p style={{color:"red", fontStyle: "italic"}}>Out of Stock</p>
                )}
            </Row>
            <button disabled={!availability}>Add to Cart 🛒</button>
        </Column>
    )
}
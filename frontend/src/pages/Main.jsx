import { sampleProductsList } from "../assets/sampleProducts"
import { ProductCard } from "../components/ProductCard"
import { Row } from "../components/Row"

export const Main = () => {
    return (
        <Row
            style={{ flexWrap: "wrap" }}
        >
            {sampleProductsList.map((p) => (
                <ProductCard key={p.id + p.title} product={p} />
            ))}
        </Row>
    )
}
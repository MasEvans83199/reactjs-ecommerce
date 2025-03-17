import { Column } from "./Column"
import { LogIn } from "./LogIn"
import { Row } from "./Row"
import { SignUp } from "./SignUp"

export const SiteHeader = () => {
    return (
        <Column>
            <Row>
                <h1>Ecommerce App</h1>
            </Row>
            <Row>
                <button>🛒</button>
                <SignUp />
                <LogIn />
            </Row>
        </Column>
    )
}
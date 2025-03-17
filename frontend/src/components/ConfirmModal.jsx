import { useState } from "react"
import { Column } from "./Column";
import { Row } from "./Row";
import { Modal } from "./Modal";

export const ConfirmModal = ({ setIsConfirmed, label }) => {
    const [isVisible, setVisibility] = useState(false);

    return (
        <>
            <button onClick={()=> setVisibility(true)}>{label}</button>
            {isVisible && ( <Modal setVisibility={setVisibility} >
                <Column>
                    <h3>Are you sure?</h3>
                    <Row style={{ justifyContent: "center" }}>
                        <button onClick={() => {
                            setIsConfirmed(true)
                            setVisibility(false)
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
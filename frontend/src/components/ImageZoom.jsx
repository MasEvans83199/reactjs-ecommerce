import { Modal } from "./Modal"

export const ImageZoom = ({ src, title, alt, isVisible, setVisibility }) => {
    return (
        <>
            {isVisible && (<Modal setVisibility={setVisibility}>
                <div
                    style={{ backgroundColor: "white" }}
                >
                    <img src={src} title={title} alt={alt}
                        style={{
                            height: "80vh",
                            maxWidth: "90vw",
                            backgroundColor: "white"
                        }} />
                </div>
            </Modal>
            )}
        </>
    )
}
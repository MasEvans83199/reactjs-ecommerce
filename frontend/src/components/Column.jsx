export const Column = ({children, style}) => {
    return (
        <div
        style={{
            display:"flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "flex-start",
            ...style,
        }}
        >
            {children}
        </div>
    )
}
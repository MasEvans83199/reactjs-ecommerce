import { getDbConnection } from "../db";

export const placeOrderRoute = {
    path: "/api/place-order",
    method: "post",
    handler: async (req, res) => {
        console.log("Received POST request on /api/place-order");

        const { user, order } = req.body;

        if (!user || !order) {
            return res.status(400).json({ message: "Invalid request structure" });
        }

        const { uid, email, firstName, lastName, location } = user;
        const { items: cartItems, total: cartTotal, itemCount: numberOfItems } = order;

        if (!uid || !email || !firstName || !lastName || !location || !cartItems || !cartTotal || !numberOfItems) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const db = getDbConnection("ecommerce");
        try {
            const result = await db.collection("orders").insertOne({
                uid,
                email,
                firstName,
                lastName,
                orderDate: new Date(),
                location,
                cartItems,
                cartTotal,
                numberOfItems                
            });

            if (!result.insertedId) {
                return res.status(500).json({ message: "Failed to insert order" });
            }

            return res.status(200).json({ message: "Order placed successfully", orderId: result.insertedId });
        } catch (error) {
            console.error("Database error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
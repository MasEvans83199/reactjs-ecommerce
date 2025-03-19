import { getDbConnection } from "../db"

export const orderRoute = {
    path: '/api/orders',
    method: 'get',
    handler: async (req, res) => {
        try {
            if (!req.user || !req.user.uid) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const db = getDbConnection("ecommerce");
            if (!db) {
                return res.status(500).json({ message: "Database connection failed" });
            }

            const orders = await db.collection("orders")
                .find({ uid: req.user.uid })
                .sort({ orderDate: -1 })
                .toArray();

            res.status(200).json(orders);
        } catch (e) {
            console.error("Error getting orders:", e);
            res.status(500).json({ message: "Failed to fetch orders", error: e.message });
        }
    }
}
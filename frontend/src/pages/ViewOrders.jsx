import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Column } from "../components/Column";
import { CartItemsList } from "../components/CartItemsList";
import { CurrentUserContext } from "../context/CurrentUserProvider";

export const ViewOrders = () => {
    const [currentUser, token, setToken] = useContext(CurrentUserContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true
                    }
                );
                setOrders(response.data);
            } catch (e) {
                setError("Failed to load orders");
                console.error("Order fetch error:", e);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    if (!token) {
        return <div>Please sign in to view your orders</div>;
    }

    if (isLoading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <Column>
            <h2>Order History for {currentUser?.firstName}</h2>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order._id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "1rem",
                            marginBottom: "1rem",
                        }}
                    >
                        <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                        <p>Date: {new Date(order.orderDate).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        })}</p>
                        <CartItemsList
                            inMemory={false}
                            cartItemsProp={order.cartItems.map(item => ({
                                ...item,
                                id: item._id
                            }))}
                        />
                        <div style={{ marginTop: "1rem" }}>
                            <p><strong>Total Items:</strong> {order.numberOfItems}</p>
                            <p><strong>Order Total:</strong> ${order.cartTotal.toFixed(2)}</p>
                            <p><strong>Shipping to:</strong> {order.location}</p>
                        </div>
                    </div>
                ))
            )}
        </Column>
    );
};
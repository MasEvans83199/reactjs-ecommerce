import { orderRoute } from "./orderRoute";
import { placeOrderRoute } from "./placeOrderRoute";
import { testAuthRoute } from "./testAuthRoutes";

export const protectedRoutes = [testAuthRoute, placeOrderRoute, orderRoute];
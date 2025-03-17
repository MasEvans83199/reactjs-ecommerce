const cart = [

]

export const getNumberOfItemsInCart = (cartItems) =>
    cartItems.reduce(
        (acc, item) =>
            acc + item.count, 0
    );

export const getCartTotal = (cartItems) =>
    cartItems.reduce(
        (acc, item) =>
            acc + item.price * item.count, 0
    );

export const addItemToCart = (product, cartItems) => {
    const isInCart = cartItems.find(i => i.id === product.id)

    return isInCart 
    ? cartItems.reduce(
        (acc, item) =>
            item.id === product.id
                ? [...acc, {...item, count: item.count +1}]
                : [...acc, item],
        []
    )
    : [...cartItems, {...product, count: 1}];
}

export const removeItemFromCart = (product, cartItems) => {
    const isInCart = cartItems.find(i => i.id === product.id)
    if(!isInCart)
        return cartItems;
    const {count} = isInCart;

    return count > 1 
        ? cartItems.map(item => 
            item.id === product.id 
                ? {...item, count: item.count - 1}
                : item
          )
        : cartItems.filter(item => item.id !== product.id);
}

export const updateItemInCart = (action, product, cartItems) => {
    switch(action) {
        case "add":
            return addItemToCart(product, cartItems);
        case "remove":
            return removeItemFromCart(product, cartItems);
        case "delete":
            return deleteItemFromCart(product, cartItems);
        default:
            return cartItems;
    }
}

export const deleteItemFromCart = (product, cartItems) => cartItems.filter(item => item.id !== product.id);
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const quantities = useSelector((state) => state.quantity);

  // Update cart quantities whenever Redux quantities change
  useEffect(() => {
    setCart((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        quantity: quantities[item._id] || item.quantity,
      }))
    );
  }, [quantities]);

  const canAddToCart = (item, quantity) => {
    const existingItem = cart.find((i) => i._id === item._id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    return currentQuantity + quantity <= item.available_units;
  };

  const addToCart = (item) => {
    console.log("CartContext: Adding item to cart:", item);
    const quantity = quantities[item._id] || 1;

    if (!canAddToCart(item, quantity)) {
      throw new Error(`Cannot add more than ${item.available_units} items`);
    }

    setCart((prev) => {
      console.log("CartContext: Previous cart state:", prev);
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        console.log("CartContext: Item exists, updating quantity");
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: quantity } : i
        );
      }
      console.log("CartContext: Adding new item to cart");
      return [...prev, { ...item, quantity }];
    });
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item._id !== itemId));
  };

  const clearCart = () => setCart([]);

  // Calculate total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        canAddToCart,
        updateCartItemQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuantity } from "../store/quantitySlice";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const quantities = useSelector((state) => state.quantity);
  const dispatch = useDispatch();

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
    const quantity = quantities[item._id] || 1;

    if (!canAddToCart(item, quantity)) {
      throw new Error(`Cannot add more than ${item.available_units} items`);
    }

    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const incrementQuantity = (itemId, maxQuantity) => {
    const currentQuantity = quantities[itemId] || 1;
    if (currentQuantity < maxQuantity) {
      dispatch(setQuantity({ itemId, quantity: currentQuantity + 1 }));
    }
  };

  const decrementQuantity = (itemId) => {
    const currentQuantity = quantities[itemId] || 1;
    if (currentQuantity > 1) {
      dispatch(setQuantity({ itemId, quantity: currentQuantity - 1 }));
    }
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
    dispatch(setQuantity({ itemId, quantity: 1 }));
  };

  const clearCart = () => {
    setCart([]);
    // Reset all quantities in Redux
    Object.keys(quantities).forEach((itemId) => {
      dispatch(setQuantity({ itemId, quantity: 1 }));
    });
  };

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
        incrementQuantity,
        decrementQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

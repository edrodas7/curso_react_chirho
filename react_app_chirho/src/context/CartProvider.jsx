import { useState } from 'react';
import { CartContext } from './cartContextValue';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(product, quantity) {
    if (isInCart(product.id)) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  }

  function removeItem(productId) {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
  }

  function clearCart() {
    setCart([]);
  }

  function isInCart(productId) {
    return cart.some((item) => item.id === productId);
  }

  let totalQuantity = 0;
  let totalPrice = 0;
  for (const item of cart) {
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

import { createContext, useState } from 'react';

// Inicializamos un context
export const cartContext = createContext();

// Creamos un provider
export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const cartCopy = [...cart];

  const isInCart = (id) => cart.some(item => item.id === id);

  const addToCart = (itemToCart, quantity) => {
    if (!isInCart(itemToCart.id)) {
      cartCopy.push( {...itemToCart, quantity: quantity} );
      setCart(cartCopy);
      console.log(`Total: ${quantity} unidades de ${itemToCart.name}`);
    } else {
      const itemIndex = cartCopy.findIndex(item => item.id === itemToCart.id);
      cartCopy[itemIndex].quantity += quantity;
      console.log(`Total: ${cartCopy[itemIndex].quantity} unidades de ${itemToCart.name}`);
    }
  }

  const clearCart = () => setCart([]);

  const removeItem = (id) => {
    if (isInCart(id)) {
      const itemIndex = cartCopy.findIndex((item) => item.id === id);
      cartCopy.splice(itemIndex, 1);
      setCart(cartCopy);
      console.log('Item eliminado');
    } else {
      console.log('El item no se encuentra en el carrito!');
    }
  };

  return(
    <cartContext.Provider value={{ cart, addToCart, clearCart, removeItem }}>
      {children}
    </cartContext.Provider>
  )
}
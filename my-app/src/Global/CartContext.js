/**
 * Author: Ekansh Gupta
 * Date Created: 4/11/2024
 * Date Modified: 4/12/2024
 * Purpose: Create a cart object, store items in cart, allow for incrementing/decrementing, clearing
 * Version: 1.0
 * Change History: Initial
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();


// If there are already items previously in cart then get data, otherwise have empty values
const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cartData');
    if (storedCart) {
        const parsedData = JSON.parse(storedCart);
        return {
            shoppingCart: parsedData.shoppingCart,
            totalPrice: Number(parsedData.totalPrice), 
            totalQty: Number(parsedData.totalQty) 
        };
    }
    return {
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0
    };
};


const initialState = loadCartFromLocalStorage();

const saveCartToLocalStorage = (cartState) => {
    localStorage.setItem('cartData', JSON.stringify(cartState));
};

// Allow actions like adding to cart, increasing/decreasing quanity, empty cart
function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const itemIndex = state.shoppingCart.findIndex(item => item.id === action.item.id);
            let newShoppingCart = [...state.shoppingCart];
            if (itemIndex !== -1) {
                newShoppingCart[itemIndex] = {
                    ...newShoppingCart[itemIndex],
                    quantity: newShoppingCart[itemIndex].quantity + 1,
                    TotalProductPrice: (newShoppingCart[itemIndex].quantity + 1) * newShoppingCart[itemIndex].price
                };
            } else {
                newShoppingCart.push({
                    ...action.item,
                    quantity: 1,
                    TotalProductPrice: action.item.price  
                });
            }
            const newTotalPrice = newShoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const newTotalQty = newShoppingCart.reduce((total, item) => total + item.quantity, 0);
            return {
                ...state,
                shoppingCart: newShoppingCart,
                totalPrice: newTotalPrice,
                totalQty: newTotalQty
            };
            case 'INC':
                let updatedPrice = Number(state.totalPrice); 
                let updatedQty = state.totalQty; 

                let updatedCart = state.shoppingCart.map(cartItem => {
                    if (cartItem.id === action.id) {
                        const newQuantity = cartItem.quantity + 1; 
                        updatedPrice += Number(cartItem.price); 
                        updatedQty += 1;  

                        return {
                            ...cartItem,
                            quantity: newQuantity,
                            TotalProductPrice: newQuantity * Number(cartItem.price) 
                        };
                    }
                    return cartItem;
                });
                return {
                    ...state,
                    shoppingCart: updatedCart,
                    totalPrice: updatedPrice,
                    totalQty: updatedQty
                };
            case 'DEC':
                let tempCart = state.shoppingCart.map(item => {
                    if (item.id === action.id) {
            
                        if (item.quantity > 1) {
                            return { ...item, quantity: item.quantity - 1, TotalProductPrice: (item.quantity - 1) * item.price };
                        } else {
                            
                            return { ...item, quantity: 0, TotalProductPrice: 0 };  
                        }
                    }
                    return item;
                }).filter(item => item.quantity > 0);  
            
                const newTotalPriceDEC = tempCart.reduce((total, item) => total + (item.price * item.quantity), 0);
                const newTotalQtyDEC = tempCart.reduce((total, item) => total + item.quantity, 0);
            
                return {
                    ...state,
                    shoppingCart: tempCart,
                    totalPrice: newTotalPriceDEC,
                    totalQty: newTotalQtyDEC
                };                                   
            case 'CLEAR_CART':
                return {
                    shoppingCart: [], totalPrice: 0, totalQty: 0
                };
            default:
                return state;
    }
}

  
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
    useEffect(() => {
      saveCartToLocalStorage(state);
    }, [state]);
  
    return (
      <CartContext.Provider value={{ cart: state.shoppingCart, dispatch, totalPrice: state.totalPrice, totalQty: state.totalQty }}>
        {children}
      </CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);

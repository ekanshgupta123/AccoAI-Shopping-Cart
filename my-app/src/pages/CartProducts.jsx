/**
 * Author: Ekansh Gupta
 * Date Created: 4/11/2024
 * Date Modified: 4/12/2024
 * Purpose: Cart page showing all of the products in the cart
 * Version: 1.0
 * Change History: Initial
 */

import React from 'react';
import { useCart } from '../Global/CartContext'; 
import { Link } from 'react-router-dom';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { Icon } from 'react-icons-kit';


function CartProducts() {
    const { cart, dispatch, totalPrice } = useCart();
    
    // Clear the contents in the cart when user clicks on checkout
    const handleCheckout = (item) => {
        alert('Order has been placed');
        dispatch({ type: 'CLEAR_CART', item });
    };
    return (
        <div>
            {cart.length !== 0 && <h1>Cart</h1>}
            <div className='cart-container'>
                {/* Show this when the cart has no items in it */}
                {
                    cart.length === 0 && <>
                        <div>No items in your cart</div>
                        <div><Link to="/">Return to Home page</Link></div>
                    </>
                }
                {/* When there are items in the cart, show the product, 
                image, allow user to increment/decrement, quanity */}
                {cart && cart.map(cart => (
                    <div className='cart-card' key={cart.id}>

                        <div className='cart-img'>
                            <img src={cart.image} alt="not found" />
                        </div>

                        <div className='cart-name'>{cart.name}</div>

                        <div className='cart-price-orignal'>$ {cart.price}</div>

                        <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.id, cart })}>
                            <Icon icon={ic_add} size={24} />
                        </div>

                        <div className='quantity'>{cart.quantity}</div>

                        <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.id, cart })}>
                            <Icon icon={ic_remove} size={24} />
                        </div>

                        <div className='cart-price'>
                            ${Number(cart.TotalProductPrice).toFixed(2)}
                        </div>
                    </div>
                ))
                }
                
                {/* Show the total price of the order and allow user to checkout */}
                {cart.length > 0 && <div className='cart-summary'>
                    <div className='cart-summary-heading'>
                        Cart-Summary
                    </div>
                    <div className='cart-summary-price'>
                        <span>Total Price</span>
                        <span>${Number(totalPrice).toFixed(2)}</span>
                    </div>
                    <button className='btn btn-success btn-md' onClick={() => handleCheckout(cart)} style={{ marginTop: 5 + 'px' }}>
                        Checkout
                    </button>
                </div>}
            </div>
        </div>
    );
}

export default CartProducts;

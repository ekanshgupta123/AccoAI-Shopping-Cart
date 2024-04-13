/**
 * Author: Ekansh Gupta
 * Date Created: 4/11/2024
 * Date Modified: 4/12/2024
 * Purpose: Navbar linking the cart page and home page
 * Version: 1.0
 * Change History: Initial
 */

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { cart as cartIcon } from 'react-icons-kit/entypo/cart'
import { home } from 'react-icons-kit/icomoon/home';
import { useCart } from '../Global/CartContext';
import '../css/Home.css';


// Navbar showing home and shopping cart button
export default function Navbar() {
    const { cart } = useCart(); 
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    console.log(totalItems);
    return (
        <div style={{ height: '0px', padding: '10px 15px' }}>
            <div className='navbox'>
                <div className='leftside'>
                </div>  
                <div className='rightside'>
                <span>
                    <Link to='/' className='navlink'>
                        <Icon icon={home} size={32} />
                    </Link>
                    <Link to="cartproducts" className='navlink'>
                        <Icon icon={cartIcon} size={32}/>
                        {totalItems > 0 && (
                            <span className='cart-item-count'>{totalItems}</span>
                        )
                        } 
                    </Link>
                </span>
                </div>
            </div>
        </div>
    )
}

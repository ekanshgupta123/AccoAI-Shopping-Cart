/**
 * Author: Ekansh Gupta
 * Date Created: 4/11/2024
 * Date Modified: 4/12/2024
 * Purpose: Home page displaying all of the products
 * Version: 1.0
 * Change History: Initial
 */

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useCart } from '../Global/CartContext';
import '../css/ProductDetails.css';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, "1");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemList = itemsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setItems(itemList);
    };
    fetchItems();
  }, []);


// When user clicks on product, redirect to this page
const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
};

  return (
    <div>
        <h1>Store items</h1>
        {/* Show the items in the store like the image, name, price */}
        <div className = 'products-container'>
            {items.map(item => (
                <div className='product-card' key = {item.id} onClick={() => handleCardClick(item.id)}>  
                    <div className='product-img'>
                        <img src={item.image} alt={item.name} />
                    </div> 
                    <div className='product-name'>
                        {item.name}
                    </div>
                    <div className='product-price'>
                        $ {item.price}
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

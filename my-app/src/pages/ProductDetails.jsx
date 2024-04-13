/**
 * Author: Ekansh Gupta
 * Date Created: 4/11/2024
 * Date Modified: 4/12/2024
 * Purpose: Product details page showing each product's name, price, description, and image.
 * Version: 1.0
 * Change History: Initial
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../css/Home.css';
import { useCart } from '../Global/CartContext';

const ProductDetails = () => {
  const { dispatch } = useCart();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "1", productId); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
  }, [productId]);


  // Add items to cart
  const handleAddToCart = (item) => {
    alert(item.name + ' added to cart!');
    dispatch({ type: 'ADD_TO_CART', item });
  };

  return (
    <div className="product-details-container">
      {product ? (
        <>
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-description">{product.Description}</p> {/* Note: changed Description to description */}
            <p className="product-price">${Number(product.price).toFixed(2)}</p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        </>
      ) : (
        <p>Loading product details...</p> // Or any other loading indicator
      )}
    </div>
  );
  };

export default ProductDetails;

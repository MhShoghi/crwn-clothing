import React from "react";
import "./cart-item.styles.scss"

export const CartItem = ({item :{name, price, quantity,imageUrl }}) => (
    <div className="cart-item">
        <img alt={name} src={imageUrl} />

        <div className="item-details">
            <span>{name}</span>
            <span>{quantity} x ${price}</span>
        </div>
    </div>
);

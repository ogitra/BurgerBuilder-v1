import React from 'react';
import classes from './Order.module.css';

const Order = props => {
	const ingredients = [];

	for (let ingr in props.ingredients) {
		ingredients.push({ name: ingr, amount: props.ingredients[ingr] });
	}

	return (
		<div className={classes.Order}>
			<p>
				<strong>Number nº:</strong> {props.number}
			</p>
			<p>
				<strong>Ingredients:</strong>{' '}
			</p>
			<ul>
				{ingredients.map(item => {
					return (
						<li key={item.name}>
							{item.name}: {item.amount}
						</li>
					);
				})}
			</ul>

			<p>
				<strong>Price:</strong> USD {props.price.toFixed(2)}
			</p>
		</div>
	);
};

export default Order;

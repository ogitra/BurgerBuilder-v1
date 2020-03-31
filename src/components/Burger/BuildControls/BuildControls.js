import React from 'react';
import classes from './BuildControls.module.css';
import OneButton from './OneButton/OneButton';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const buildControls = props => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong>{props.price}</strong>
		</p>
		{controls.map(item => {
			return (
				<OneButton
					labelIngredient={item.label}
					key={item.label}
					added={() => props.added(item.type)}
					removed={() => props.removed(item.type)}
					disabled={props.disabled[item.type]}
				/>
			);
		})}
		<button className={classes.OrderButton} disabled={props.disabledOrder} onClick={props.displayModal}>
			ORDER NOW
		</button>
	</div>
);

export default buildControls;

import React from 'react';
import classes from './CheckoutPage.module.css';
import Burger from '../Burger/Burger';
import Button from '../../components/UI/Button/Button';

const checkoutPage = props => {
	return (
		<div className={classes.Checkout}>
			<h1>We hope it tastes well!!</h1>
			<Burger ingredients={props.ingredients} />
			<p>
				<strong>Total Price: $ {props.price.toFixed(2)}</strong>
			</p>
			<Button btnStyle={'Danger'} clicked={props.clickedCancel}>
				CANCEL
			</Button>
			<Button btnStyle={'Success'} clicked={props.clickedContinue}>
				CONTINUE
			</Button>
		</div>
	);
};

export default checkoutPage;

import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map((item, index) => {
			return (
				<li key={item}>
					<span style={{ textTransform: 'capitalize' }}>{item}</span>:
					{this.props.ingredients[item]}
				</li>
			);
		});
		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total Price: {this.props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to Checkout?</p>
				<Button btnStyle="Danger" clicked={this.props.clickedCancel}>
					CANCEL
				</Button>
				<Button btnStyle="Success" clicked={this.props.clickedContinue}>
					CONTINUE
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;

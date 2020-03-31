import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutPage from '../../components/CheckoutPage/CheckoutPage';
import ContactData from '../ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {
	checkoutContinue = () => {
		this.props.history.replace(this.props.match.url + '/contactdata');
	};
	checkoutCancel = () => {
		this.props.history.goBack();
	};

	render() {
		return (
			<div>
				<CheckoutPage
					ingredients={this.props.ing}
					price={+this.props.totalPrice}
					clickedContinue={this.checkoutContinue}
					clickedCancel={this.checkoutCancel}
				/>
				<Route
					path="/checkout/contactdata"
					render={() => (
						<ContactData
							ingredients={this.props.ing}
							price={this.props.totalPrice}
							{...this.props} //envia para o componente ContactData e/ou usa aqui como paramentro os 'props' do route(ou do link se tivesse)
						/>
					)}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ing: state.ing,
		totalPrice: state.totalPrice
	};
};

export default connect(mapStateToProps)(Checkout);

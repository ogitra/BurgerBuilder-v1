import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutPage from '../../components/CheckoutPage/CheckoutPage';
import ContactData from '../ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {
	checkoutContinue = () => {
		if (this.props.auth) {
			this.props.history.replace(this.props.match.url + '/contactdata');
		} else {
			this.props.history.push('/auth');
		}
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

				<Route path="/checkout/contactdata" render={() => <ContactData />} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ing: state.burger.ing,
		totalPrice: state.burger.totalPrice,
		auth: state.auth.idToken
	};
};

export default connect(mapStateToProps)(Checkout);

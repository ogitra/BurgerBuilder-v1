import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});

const asyncLogout = asyncComponent(() => {
	return import('./containers/Auth/Logout/Logout');
});

class App extends Component {
	componentDidMount() {
		this.props.initAppCheckIfLogin();
	}
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/checkout" component={asyncCheckout} />
						<Route path="/orders" component={asyncOrders} />
						<Route path="/auth" component={asyncAuth} />
						<Route path="/logout" component={asyncLogout} />
						<Route component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		initAppCheckIfLogin: () => dispatch(action.initAppCheckIfLogin())
	};
};

export default connect(null, mapDispatchToProps)(App);

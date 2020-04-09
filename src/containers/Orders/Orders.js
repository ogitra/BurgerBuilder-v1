import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import classes from './Orders.module.css';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';

class Orders extends Component {
	componentDidMount = () => {
		this.props.fetchOrdersFromGet(this.props.idToken, this.props.localId);
	};
	onRedirect = () => {
		this.props.history.push('/auth');
	};
	render() {
		let orders = (
			<div>
				{this.props.orders.map(item => (
					<Order key={item.id} number={item.id} ingredients={item.ingredients} price={+item.price} />
				))}
			</div>
		);

		if (!this.props.idToken) {
			orders = (
				<div className={classes.Orders}>
					<p>Log in to see orders</p>
					<Button btnStyle={'Success'} clicked={this.onRedirect}>
						LOGIN
					</Button>
				</div>
			);
		}

		return orders;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders.orders,
		idToken: state.auth.idToken,
		localId: state.auth.localId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchOrdersFromGet: (idToken, localId) => dispatch(actions.initOrders(idToken, localId))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);

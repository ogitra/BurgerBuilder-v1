import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {
	componentDidMount = () => {
		this.props.fetchOrdersFromGet();
	};

	render() {
		return (
			<div>
				{this.props.orders.map(item => (
					<Order key={item.id} number={item.id} ingredients={item.ingredients} price={+item.price} />
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders.orders
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchOrdersFromGet: () => dispatch(actions.initOrders())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);

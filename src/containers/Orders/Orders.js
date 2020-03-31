import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../components/Axios/axios-orders';

class Orders extends Component {
	state = {
		orders: []
	};

	componentDidMount = () => {
		const orders = [];
		axios.get('/orders.json').then(response => {
			for (let item in response.data) {
				orders.push({ ...response.data[item], id: item }); //add assim pra pegar oq ja tinha e criar uma categoria a mais( 'id')
			}
			this.setState({ orders: orders });
			console.log(orders);
		});
	};

	render() {
		return (
			<div>
				{this.state.orders.map(item => (
					<Order key={item.id} number={item.id} ingredients={item.ingredients} price={+item.price} />
				))}
			</div>
		);
	}
}

export default Orders;

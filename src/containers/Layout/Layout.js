import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = { showSideDrawer: false };

	sideDrawerClosedHandler = props => {
		this.setState({ showSideDrawer: false });
	};

	openMenuHandler = () => {
		this.setState({ showSideDrawer: true });
	};

	render() {
		return (
			<Aux>
				<Toolbar clicked={this.openMenuHandler} />
				<SideDrawer clicked={this.sideDrawerClosedHandler} show={this.state.showSideDrawer} />
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;

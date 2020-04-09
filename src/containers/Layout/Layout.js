import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
				<Toolbar clicked={this.openMenuHandler} auth={this.props.auth} />
				<SideDrawer
					clicked={this.sideDrawerClosedHandler}
					show={this.state.showSideDrawer}
					auth={this.props.auth}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return { auth: state.auth.idToken };
};

export default connect(mapStateToProps)(Layout);

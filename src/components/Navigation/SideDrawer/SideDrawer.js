import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationBar/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const sideDrawer = props => {
	let classForSideDrawer = [ classes.SideDrawer, classes.Close ];
	if (props.show) {
		classForSideDrawer = [ classes.SideDrawer, classes.Open ];
	}
	return (
		<Aux>
			<Backdrop clicked={props.clicked} show={props.show} />
			<div className={classForSideDrawer.join(' ')} onClick={props.clicked}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems clicked={props.clicked} auth={props.auth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;

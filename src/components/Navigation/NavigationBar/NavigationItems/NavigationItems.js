import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = props => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact clicked={props.clicked}>
			BurgerBuilder
		</NavigationItem>
		<NavigationItem link="/orders" clicked={props.clicked}>
			Orders
		</NavigationItem>
		{!props.auth ? (
			<NavigationItem link="/auth" clicked={props.clicked}>
				Login{' '}
			</NavigationItem>
		) : (
			<NavigationItem link="/logout" clicked={props.clicked}>
				Logout
			</NavigationItem>
		)}
	</ul>
);

export default navigationItems;

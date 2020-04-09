import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = props => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact clicked={props.clicked}>
			BurgerBuilder
		</NavigationItem>
		<NavigationItem link="/orders">Orders</NavigationItem>
		{!props.auth ? (
			<NavigationItem link="/auth">Login </NavigationItem>
		) : (
			<NavigationItem link="/logout">Logout</NavigationItem>
		)}
	</ul>
);

export default navigationItems;

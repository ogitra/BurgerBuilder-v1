import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationBar/NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar = props => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.clicked}> </DrawerToggle>

		<Logo />

		<div className={classes.DesktopOnly}>
			<NavigationItems auth={props.auth} />
		</div>
	</header>
);

export default toolbar;

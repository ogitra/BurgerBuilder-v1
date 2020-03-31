import React from 'react';
import classes from './OneButton.module.css';

const oneButton = props => (
	<div className={classes.OneButton}>
		<div className={classes.LabelIngredient}>{props.labelIngredient}</div>
		<button className={classes.Less} onClick={props.removed} disabled={props.disabled}>
			{' '}
			Less
		</button>
		<button className={classes.More} onClick={props.added}>
			More
		</button>
	</div>
);

export default oneButton;

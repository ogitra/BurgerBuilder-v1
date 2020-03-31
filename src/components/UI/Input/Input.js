import React from 'react';
import classes from './Input.module.css';

const input = props => {
	let inputElement = null;
	let validationError = null;
	let classesElement = [ classes.InputElement ];

	if (!props.valid) {
		classesElement.push(classes.Invalid);
		validationError = <p>Please enter a valid value</p>;
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={classesElement.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.onChange}
					required={props.required}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={classesElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.onChange}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select className={classesElement} value={props.value} onChange={props.onChange}>
					{props.options.map(item => {
						return (
							<option key={item.value} value={item.value}>
								{item.displayValue}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			inputElement = <input className={classesElement} {...props.elementConfig} value={props.value} />;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>

			{inputElement}
			{validationError}
		</div>
	);
};

export default input;

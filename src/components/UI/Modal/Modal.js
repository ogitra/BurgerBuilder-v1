import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

class Modal extends Component {
	shouldComponentUpdate(nextProps, netxState) {
		//metodo para atualizar ou nao um componente (faz isso para nao ficar atualizando o modal e seus children toda hora sem necessidade)
		return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children; //children tem a ver com o spinner aparecer ou nao
	}

	/*componentDidUpdate() {
		console.log('modal atualizadou'); //metodo para ver se atualizou um component
	}*/
	render() {
		return (
			<Aux>
				<Backdrop show={this.props.showModal} clicked={this.props.clicked} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.showModal ? '1' : '0'
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;

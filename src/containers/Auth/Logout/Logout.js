import React, { Component } from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';

class Logout extends Component {
	onLogoutConfirmHandler = () => {
		this.props.logoutConfirm();
		this.props.history.goBack();
	};
	onLogoutCancelHandler = () => {
		this.props.history.goBack();
	};

	render() {
		return (
			<div>
				<Modal showModal>
					<p style={{ textAlign: 'center' }}> Do you really wanna quit? </p>
					<div style={{ justifyContent: 'center', display: 'flex' }}>
						<Button btnStyle={'Success'} clicked={this.onLogoutConfirmHandler}>
							YES
						</Button>
						<Button btnStyle={'Success'} clicked={this.onLogoutCancelHandler}>
							NO
						</Button>
					</div>
				</Modal>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logoutConfirm: () => dispatch(action.checkAuthTimeout())
	};
};

export default connect(null, mapDispatchToProps)(Logout);

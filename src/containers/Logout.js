import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { clearLocaStorageItem } from '../helpers/RequestLogin';
// import { resetRedirectReferrer } from '../actions';

class Logout extends Component {
	componentWillMount() {
		clearLocaStorageItem('token');
		// this.props.dispatch(resetRedirectReferrer());
		this.props.history.push('/login');
	}

	render() {
		return null;
	}
}

Logout.propTypes = {
	// dispatch: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(connect()(Logout));

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Home extends Component {
	render() {
		return (
			<h1>HOME</h1>
		);
	}
}


// function mapStateToProp(state) {
// 	return {
// 		login: state.login
// 	};
// }
//
// export default connect(mapStateToProp)(Home);

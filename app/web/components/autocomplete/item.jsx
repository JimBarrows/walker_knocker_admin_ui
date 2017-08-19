import React from "react";

class Item extends React.Component {

	componentWillMount( ) {
		this.setState({ active: false });
	}

	activeOff( ) {
		this.setState({ active: false })
  }


	activeOn( ) {
		this.setState({ active: true })
	}

	render( ) {
		let { onClick, value } = this.props;
		let {
			active = false
		} = this.state;
		return <li class={'list-group-item' + (active
			? ' active'
			: '')} onClick={onClick} onMouseEnter={this.activeOn.bind( this )} onMouseLeave={this.activeOff.bind(this)}>{value}</li>
	}
}

export default Item;

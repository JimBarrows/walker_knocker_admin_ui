import React from "react";

class AddressRowEditor extends React.Component {

  componentWillMount( ) {
		this.propsToState( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		this.propsToState( nextProps );
	}

	propsToState( props ) {
		let { item } = props;
		this.setState({ ...item });
	}

  street_address_change(e) {
    this.setState({
        street_address: e.target.value
    })
  }

	render( ) {
    let {id, street_address, city, state, zip_code} = this.state;
		return (
			<tr id={id}>
				<td><input class="form-control" id={"street_address_" + id} onChange={this.street_address_change.bind( this )} required={true} type="text" value={street_address}/></td>
				<td>{city.name}</td>
				<td>{state.abbreviation}</td>
				<td>{zip_code.name}</td>
				<td>{this.props.row_controls}</td>
			</tr>
		);
	}
}

export default AddressRowEditor;

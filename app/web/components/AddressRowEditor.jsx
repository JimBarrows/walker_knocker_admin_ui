import React from "react";
import {SelectFormGroup} from "bootstrap-react-components";

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
    this.props.item.street_address = e.target.value
    this.props.onItemChange(this.props.item);
  }

	render( ) {
    let {id, street_address, city, state, zip_code} = this.state;
		return (
			<tr id={id}>
				<td><input class="form-control" id={"street_address_" + id} onChange={this.street_address_change.bind( this )} required={true} type="text" value={street_address}/></td>
				<td>{city.name}</td>
				<td><select class="form-control"
					        id={'state_select_' + id}
					        onChange={this.state_change.bind(this)}
					        required={required}>
						<option value="-1"></option>
						{options.map(o => <option key={o.value}
						                          value={o.value}>{o.label}</option>)} </select></td>
				<td>{zip_code.name}</td>
				<td>{this.props.row_controls}</td>
			</tr>
		);
	}
}

export default AddressRowEditor;

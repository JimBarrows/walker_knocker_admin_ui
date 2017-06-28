import React from "react";
import { RowControlButtons, StripedTable } from "bootstrap-react-components";
import { ItemDescription } from "react-templates-and-utils";

class AddressRow extends ItemDescription {
	editor( item ) {

		return (
			<tr id={item.id}>
				<td>{item.street_address}</td>
				<td>{item.city.name}</td>
				<td>{item.state.abbreviation}</td>
				<td>{item.zip_code.name}</td>
				<td><RowControlButtons id={"address_buttons_" + item.id} editing={this.state.editing} edit={this.editing.bind( this )} save={this.save.bind( this )} remove={this.remove.bind( this )}/></td>
			</tr>
		);
	}

	viewer( item ) {
		return (
			<tr id={item.id}>
				<td>{item.street_address}</td>
				<td>{item.city.name}</td>
				<td>{item.state.abbreviation}</td>
				<td>{item.zip_code.name}</td>
				<td><RowControlButtons id={"address_buttons_" + item.id} editing={this.state.editing} edit={this.editing.bind( this )} save={this.save.bind( this )} remove={this.remove.bind( this )}/></td>
			</tr>
		)
	}
}

export default AddressRow;

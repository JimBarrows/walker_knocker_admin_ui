import React from "react";
import { AddButton, StripedTable } from "bootstrap-react-components";
import { ItemList } from "react-templates-and-utils";
import Address from "./Address";
import Editor from "./Editor";

class AddressList extends ItemList {

	render( ) {
		let { list, allowEditing } = this.state;
		let button = this.buttonEditOrNothing( "Add", < Editor save = {
			this.addItem.bind( this )
		} /> );
		let rows = list
			? list.map( ( item, index ) => <Address item={item} key={index} save={this.updateItem.bind( this )}/> ) : <h2>There are no addresses in the system</h2>;
		return (
			<div id="AddressList">
				{button}
				{rows}
			</div>
		)
	}

}
export default AddressList;

import React from "react";
import { RowControlButtons, StripedTable } from "bootstrap-react-components";
import { Item } from "react-templates-and-utils";
import Editor from "./Editor";

class Address extends Item {

	editor( item ) {
		return <Editor item={item} row_controls={this.row_controls} save={this.save.bind( this )}/>
	}

	viewer( item ) {
		return (
			<div id={item.id} class="address adr list-group-item">
				<div class="street-address list-group-item-heading">{item.street_address}</div>
				<div class="list-group-item-text">
					<span class="locality">{item.city.name}</span>,&nbsp;
					<span class="region">{item.state.abbreviation}</span>&nbsp;
					<span class="postal-code">{item.zip_code.name}</span>
				</div>
			</div>
		)
	}

}

export default Address;

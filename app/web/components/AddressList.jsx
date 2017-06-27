import React from "react";
import { StripedTable } from "bootstrap-react-components";
import { ItemList, ItemDescription } from "react-templates-and-utils";
import AddressRow from "./AddressRow";

class AddressList extends ItemList {

	render( ) {
    let {list} =  this.props;
    let rows = <tr><td colSpan="4">There are no addresses</td></tr>;
    if( list && list.length > 0) {
      rows = list.map((item, index) => <AddressRow item={item} key={index}/>);
    }
		return (
			<StripedTable id='AddressList'>
				<thead>
					<tr>
						<th>Street Address</th>
						<th>City</th>
						<th>State</th>
						<th>Zip Code</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</StripedTable>
		);
	}
}
export default AddressList;

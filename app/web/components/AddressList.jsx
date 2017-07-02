import React from "react";
import { AddButton, StripedTable } from "bootstrap-react-components";
import { ItemList, ItemDescription } from "react-templates-and-utils";
import AddressRow from "./AddressRow";

class AddressList extends React.Component {


	addButtonClick( ) {
		let list = [this.props.new_item(this.state.list.length), ...this.state.list];

		this.setState({ list });
	}

	componentWillMount( ) {
		this.propsToState( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		this.propsToState( nextProps );
	}

	propsToState( props ) {
		let { list } = props;
		this.setState({ list });
	}

	remove_item( item ) {
		this.props.remove_item( item);
	}

	render( ) {
		let { list } = this.state;
		let rows = <tr>
			<td colSpan="4">There are no addresses</td>
		</tr>;
		if ( list && list.length > 0 ) {
			rows = [...list.map( ( item, index ) => <AddressRow allowEditing={true} editing={item.id === 'new_' + index} item={item} key={index} save={this.save_item.bind( this )} remove={this.remove_item.bind( this )}/> )];
		}
		return (
			<StripedTable id='AddressList'>
				<thead>
					<tr>
						<th>Street Address</th>
						<th>City</th>
						<th>State</th>
						<th>Zip Code</th>
						<th><AddButton id="add_address" onClick={this.addButtonClick.bind( this )}/></th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</StripedTable>
		);
	}

	save_item( item) {
		this.props.save_item(item);
	}

}
export default AddressList;

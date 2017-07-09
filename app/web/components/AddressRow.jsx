import React from "react";
import { RowControlButtons, StripedTable } from "bootstrap-react-components";
import { ItemDescription } from "react-templates-and-utils";
import AddressRowEditor from "./AddressRowEditor";

class AddressRow extends React.Component {

	componentWillMount( ) {
		this.propsToState( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		this.propsToState( nextProps );
	}

	propsToState( props ) {
		let { editing, list, allowEditing, item } = props;
		this.setState({ editing, list, allowEditing, item });
	}

	editor( item ) {
		return <AddressRowEditor item={item} row_controls={this.row_controls} onItemChange={this.onItemChange.bind(this)}/>
	}

	onItemChange(item) {
		this.setState({
			item
		});
	}
	remove() {
			this.props.remove(this.state.item);
	}

	render( ) {
		let { item, editing, allowEditing } = this.state;
		let element = ( editing && allowEditing )
			? this.editor( item )
			: this.viewer( item );
		return element;
	}

	get row_controls( ) {
		return ( <RowControlButtons id={"address_buttons_" + this.props.item.id} editing={this.state.editing} edit={this.toggle_editing.bind( this )} save={this.save.bind( this )} remove={this.remove.bind( this )}/> );
	}

	save( ) {
		console.log("this.state: ", this.state);
		this.setState({ editing: false });
		this.props.save( this.state.item );
	}

	toggle_editing( ) {
		this.setState({
			editing: !this.state.editing
		});
	}

	viewer( item ) {
		return (
			<tr id={item.id}>
				<td>{item.street_address}</td>
				<td>{item.city.name}</td>
				<td>{item.state.abbreviation}</td>
				<td>{item.zip_code.name}</td>
				<td>{this.row_controls}</td>
			</tr>
		)
	}

}

export default AddressRow;

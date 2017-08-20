import React from "react";
import { connect } from "react-redux";
import { compose, gql, graphql } from 'react-apollo';
import { EditableList, NumberFormGroup, PageHeader, TextFormGroup } from "bootstrap-react-components";
import constants from "../../constants";
import AddressList from "../components/addresses";
import create_gql from "../../graphql/address/create.graphql";
import list_gql from "../../graphql/address/list.graphql";
import update_gql from "../../graphql/address/update.graphql";
import delete_gql from "../../graphql/address/delete.graphql";

let { DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER } = constants;
let foo = NumberFormGroup;
class AddressListContainer extends React.Component {

	// addItem( item ) {
	// 	this.props.createQl( item );
	// }

	addListItem( item) {
		let id = this.state.list.length + 1;
		this.setState({
			current: null,
			list: [
				...this.state.list, {
					id,
					name: item.name,
					age: item.age
				}
			]
		});
	}

	body( item ) {
		return <div class="vcard adr">
			<span class="street-address">{item.street_address}</span>
			<span class="locality">{item.city.name}</span>
			<span class="region">{item.state.name}</span>
			<span class="postal-code">{item.zip_code.name}</span>
		</div>
	}

	constructor( props ) {
		super( props );
		this.state = {
			list: [],
			current: null
		}
	}

	formElements( item ) {
		return <div class="formElements">
			<TextFormGroup id="street_address" label="Street Address" value={item.street_address}/>
			<TextFormGroup id="name" label="Name" value={item.street_address}/>
		</div>
	}

	header( item ) {
		return item.street_address;
	}

	onChange(event,item) {
		let changedItem = Object.assign( {}, item)
		if(event.target.id === 'name') {
			changedItem.name = event.target.value
		} else if ( event.target.id === 'age') {
			changedItem.age = event.target.value
		}
		return changedItem;
	}

	newItem( ) {
		return { name: '', age: 0 };
	}

	removeListItem( item ) {
		this.setState({
			list: this.state.list.filter( i => i.id !== item.id )
		})
	}
	render( ) {
		let { list } = this.props;

		let main_display = list.loading
			? <p>Still loading....</p>
			: <EditableList addItem={this.addListItem.bind(this)}
										body={this.body}
										editFormElements={this.formElements.bind( this )}
										formElements={this.formElements.bind( this )}
										header={this.header}
										id="address_list"
										list={list.addresses}
										newItem={this.newItem.bind( this )}
										onChange={this.onChange.bind(this)}
										removeItem={this.removeListItem.bind(this)}
										updateItem={this.updateListItem.bind(this)}/>;

		return (
			<div id="AddressListPage">
				<PageHeader id="AddressListPage">
					<h1>Address List</h1>
				</PageHeader>
				{main_display}
			</div>
		);
	}

	updateListItem( item ) {
			let original = this.state.list.findIndex( l => l.id === item.id );
			let originalList = this.state.list;
			originalList[original] = Object.assign( {}, originalList[original], item );
			this.setState({ list: originalList })
	}
}

const mapStateToProps = ( state ) => {
	return { };
};

const mapDispatchToProps = ( dispatch ) => {
	return { };
};

let create_gql_options = {
	name: 'create',
	props: ({ create }) => ({
		createQl: ( item ) => create({
			variables: {
				newAddress: {
					street_address: item.street_address,
					city_id: item.city.id,
					state_id: item.state.id,
					zip_code_id: item.zip_code.id,
					country_id: ''
				}
			},
			updateQueries: {
				"function_types": (prev, { mutationResult }) => {
					let newType = mutationResult.data.create_function_type;
					return Object.assign({}, prev, {
						function_types: [
							...prev.function_types,
							newType
						]
					});
				}
			}
		})
	})
}

let list_gql_options = {
	name: "list"
}
//
// let update_gql_options = {
// 	name: "update_address"
// }
//
// let delete_gql_options = {
// 	name: "delete_address"
// }
//
let graphgql_list = [
	graphql( list_gql, list_gql_options ),
	graphql( create_gql, create_gql_options ),
	// 	graphql( update_gql, update_gql_options ),
	// 	graphql( delete_gql, delete_gql_options )
];
//
const AddressListContainerWithGql = compose( ...graphgql_list )( AddressListContainer );
//
export default connect(state => ({ }), dispatch => ({
	show_message: message => ({
		type: DISPLAY_MESSAGE,
		payload: {
			context: MESSAGE_CONTEXT_DANGER,
			message: message.message
		}
	})
}))( AddressListContainerWithGql );

import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {EditableList, FormGroup, NumberFormGroup, PageHeader, TextFormGroup} from "bootstrap-react-components";
import CityFormGroup from "../components/CityFormGroup";
import StateFormGroup from "../components/StateFormGroup";
import ZipCodeFormGroup from "../components/ZipCodeFormGroup";
import constants from "../../constants";
import create_gql from "../../graphql/address/create.graphql";
import list_gql from "../../graphql/address/list.graphql";
import update_gql from "../../graphql/address/update.graphql";
import delete_gql from "../../graphql/address/delete.graphql";

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

class AddressListContainer extends React.Component {

	addListItem(item) {
		this.props.createQl(item);
	}

	body(item) {
		return <div class="vcard adr">
			<span class="street-address">{item.street_address}</span><br/>
			<span class="locality">{item.city.name}</span>,&nbsp;
			<span class="region">{item.state.name}</span>&nbsp;
			<span class="postal-code">{item.zip_code.name}</span>
		</div>;
	}

	constructor(props) {
		super(props);
		this.state = {
			current: null
		};
	}

	formElements(item) {
		return <div class="formElements">
			<TextFormGroup id="street_address" label="Street Address" required={true} value={item.street_address}
			               onChange={this.onStreetAddressChange(item).bind(this)}/>
			<CityFormGroup id="city" required={true} value={item.city
					? item.city.name
					: ""} onChange={this.onCityChange(item).bind(this)}/>
			<StateFormGroup id="state" required={true} value={item.state
					? item.state.name
					: ""} onChange={this.onStateChange(item).bind(this)}/>
			<ZipCodeFormGroup id="zip_code" required={true} value={item.zip_code
					? item.zip_code.name
					: ""} onChange={this.onZipCodeChange(item).bind(this)}/>
		</div>;
	}

	header(item) {
		return item.street_address;
	}

	onChange(event, item) {
		let changedItem = Object.assign({}, item);
		return changedItem;
	}

	onStreetAddressChange(item) {
		return (event) => {
			item.street_address = event.target.value;
		};
	}

	onCityChange(item) {
		return (city) => {
			item.city = city;
		};
	}

	onStateChange(item) {
		return (state) => {
			item.state = state;
		};
	}

	onStreetAddressChange(item) {
		return (event) => {
			item.street_address = event.target.value;
		};
	}

	onZipCodeChange(item) {
		return (zip_code) => {
			item.zip_code = zip_code;
		};
	}

	newItem() {
		return {address:'', city:{id:'', name:''}, state:{id:'', name:''}, zip_code:{id:'', name:''}};
	}

	removeListItem(item) {
		this.setState({
			list: this.state.list.filter(i => i.id !== item.id)
		});
	}

	render() {
		let {list} = this.props;

		let main_display = list.loading
				? <p>Still loading....</p>
				: <EditableList addItem={this.addListItem.bind(this)} body={this.body}
				                 formElements={this.formElements.bind(this)}
				                header={this.header} id="address_list" list={list.addresses} newItem={this.newItem.bind(this)}
				                onChange={this.onChange.bind(this)} removeItem={this.removeListItem.bind(this)}
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

	updateListItem(item) {
		let original           = this.state.list.findIndex(l => l.id === item.id);
		let originalList       = this.state.list;
		originalList[original] = Object.assign({}, originalList[original], item);
		this.setState({list: originalList});
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

let create_gql_options = {
	name : 'create',
	props: ({create}) => ({
		createQl: (item) => create({
			variables    : {
				newAddress: {
					street_address: item.street_address,
					city_id       : item.city.id,
					state_id      : item.state.id,
					zip_code_id   : item.zip_code.id,
					country_id    : ''
				}
			},
			updateQueries: {
				"function_types": (prev, {mutationResult}) => {
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
};

let list_gql_options = {
	name: "list"
};
//
// let update_gql_options = {
// 	name: "update_address"
// }
//
// let delete_gql_options = {
// 	name: "delete_address"
// }
//
let graphgql_list                 = [
	graphql(list_gql, list_gql_options),
	graphql(create_gql, create_gql_options),
	// 	graphql( update_gql, update_gql_options ),
	// 	graphql( delete_gql, delete_gql_options )
];
//
const AddressListContainerWithGql = compose(...graphgql_list)(AddressListContainer);
//
export default connect(state => ({}), dispatch => ({
	show_message: message => ({
		type   : DISPLAY_MESSAGE,
		payload: {
			context: MESSAGE_CONTEXT_DANGER,
			message: message.message
		}
	})
}))(AddressListContainerWithGql);

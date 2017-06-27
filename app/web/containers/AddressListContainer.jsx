import React from "react";
import { connect } from "react-redux";
import { compose, gql, graphql } from 'react-apollo';
import { PageHeader } from "bootstrap-react-components";
import constants from "../../constants";
import AddressList from "../components/AddressList";
import create_gql from "../../graphql/address/create.graphql";
import list_gql from "../../graphql/address/list.graphql";
import update_gql from "../../graphql/address/update.graphql";
import delete_gql from "../../graphql/address/delete.graphql";

let { DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER } = constants;

class AddressListContainer extends React.Component {

	form_component( ) {
		return <h2>Form Component</h2>
	}

	extract_item( ) {
		return { };
	}

	render( ) {
		let {list} = this.props;

		let main_display = list.loading
			 ? <p>Still loading....</p>
			: <AddressList list={list.addresses} />;

		return (
			<div id="AddressListPage">
				<PageHeader id="AddressListPage">
					<h1>Address List</h1>
				</PageHeader>
        {main_display}
			</div>
		);
	}

  update() {}

  view_component() {
    return <h2>view_component</h2>;
  }
}

let create_gql_options = {
	name: 'create_address',
	props: ({ create }) => ({
		create_ql: ( item ) => create({
			variables: {
				street_address: item.street_address,
        directions: item.directions,
        city_id: item.city_id,
        state_id: item.state_id,
        zip_code_id: item.zip_code_id,
        country_id: item.country_id
			},
			optimisticResponse: {
				"create_function_type": {
          street_address: item.street_address,
          directions: item.directions,
					"__typename": "FunctionType"
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

let update_gql_options = {
  name: "update_address"
}

let delete_gql_options = {
  name: "delete_address"
}

let graphgql_list = [
	graphql( list_gql, list_gql_options ),
	graphql( create_gql, create_gql_options ),
	graphql( update_gql, update_gql_options ),
	graphql( delete_gql, delete_gql_options )
];

const AddressListContainerWithGql = compose( ...graphgql_list )( AddressListContainer );

export default connect(state => ({ }), dispatch => ({
	show_message: message => ({
		type: DISPLAY_MESSAGE,
		payload: {
			context: MESSAGE_CONTEXT_DANGER,
			message: message.message
		}
	})
}))(AddressListContainerWithGql);

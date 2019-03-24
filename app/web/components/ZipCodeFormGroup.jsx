import React from "react";
import {connect} from "react-redux";
import {compose, gql, graphql} from 'react-apollo';
import {FormGroup} from "bootstrap-react-components";
import Autocomplete from "../components/autocomplete";
import constants from "../../constants";
import zip_code_list_gql from "../../graphql/zip_code_list.graphql";

class ZipCodeFormGroup extends React.Component {

	onChange(zip_code_name) {
		this.props.onChange(this.props.list.zip_codes.find(zip_code => zip_code.name === zip_code_name) || "");
	}

	render() {
		let {
			    id       = "",
			    list     = [],
			    required = false,
			    value    = ""
		    }            = this.props;
		let autocomplete = list.loading ? "Loading Zip Code list" :
				<Autocomplete id={"zip_code_" + id} options={list.zip_codes.map(zip_code => zip_code.name)} value={value}
				              onChange={this.onChange.bind(this)}/>;
		return (
				<FormGroup id={"zip_code_" + id} label="Zip Code" required={required}>
					{autocomplete}
				</FormGroup>
		);

	}
}

const mapZipCodeToProps = (zip_code) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

let zip_code_list_gql_options = {
	name   : "list",
	options: {
		variables: {name: ""}
	}
};

let graphgql_list = [graphql(zip_code_list_gql, zip_code_list_gql_options)];

const ZipCodeFormGroupWithGql = compose(...graphgql_list)(ZipCodeFormGroup);

let {DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER} = constants;

export default connect(zip_code => ({}), dispatch => ({
	show_message: message => ({
		type   : DISPLAY_MESSAGE,
		payload: {
			context: MESSAGE_CONTEXT_DANGER,
			message: message.message
		}
	})
}))(ZipCodeFormGroupWithGql);

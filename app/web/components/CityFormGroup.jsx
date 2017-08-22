import React from "react";
import { connect } from "react-redux";
import { compose, gql, graphql } from 'react-apollo';
import { FormGroup } from "bootstrap-react-components";
import Autocomplete from "../components/autocomplete";
import constants from "../../constants";
import city_list_gql from "../../graphql/city_list.graphql";

class CityFormGroup extends React.Component {

  onChange(city_name) {
    this.props.onChange( this.props.list.cities.find(city => city.name === city_name) || "");
  }

	render( ) {
		let {
			id = "",
			list = [],
			onChange,
			required = false,
			value = ""
		} = this.props;
    let autocomplete = list.loading? "Loading City list" : <Autocomplete id={"city_" + id} options={list.cities.map( city => city.name )} value={value} onChange={this.onChange.bind( this )}/>;
		return (
			<FormGroup id={"city_" + id} label="City" required={required}>
      {autocomplete}
			</FormGroup>
		);

	}
}

const mapStateToProps = ( state ) => {
	return { };
};

const mapDispatchToProps = ( dispatch ) => {
	return { };
};

let city_list_gql_options = {
	name: "list",
  options: {
    variables: {name: ""}
  }
}

let graphgql_list = [graphql( city_list_gql, city_list_gql_options )];

const CityFormGroupWithGql = compose( ...graphgql_list )( CityFormGroup );

let { DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER } = constants;

export default connect(state => ({ }), dispatch => ({
	show_message: message => ({
		type: DISPLAY_MESSAGE,
		payload: {
			context: MESSAGE_CONTEXT_DANGER,
			message: message.message
		}
	})
}))( CityFormGroupWithGql );

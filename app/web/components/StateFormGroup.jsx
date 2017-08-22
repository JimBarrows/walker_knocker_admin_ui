import React from "react";
import { connect } from "react-redux";
import { compose, gql, graphql } from 'react-apollo';
import { FormGroup } from "bootstrap-react-components";
import Autocomplete from "../components/autocomplete";
import constants from "../../constants";
import state_list_gql from "../../graphql/state_list.graphql";

class StateFormGroup extends React.Component {

  onChange(state_name) {
    this.props.onChange( this.props.list.states.find(state => state.name === state_name) || "");
  }

	render( ) {
		let {
			id = "",
			list = [],
			onChange,
			required = false,
			value = ""
		} = this.props;
    let autocomplete = list.loading? "Loading State list" : <Autocomplete id={"state_" + id} options={list.states.map( state => state.name )} value={value} onChange={this.onChange.bind( this )}/>;
		return (
			<FormGroup id={"state_" + id} label="State" required={required}>
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

let state_list_gql_options = {
	name: "list",
  options: {
    variables: {name: ""}
  }
}

let graphgql_list = [graphql( state_list_gql, state_list_gql_options )];

const StateFormGroupWithGql = compose( ...graphgql_list )( StateFormGroup );

let { DISPLAY_MESSAGE, MESSAGE_CONTEXT_DANGER } = constants;

export default connect(state => ({ }), dispatch => ({
	show_message: message => ({
		type: DISPLAY_MESSAGE,
		payload: {
			context: MESSAGE_CONTEXT_DANGER,
			message: message.message
		}
	})
}))( StateFormGroupWithGql );

import React from "react";
import { connect } from "react-redux";
import { compose, gql, graphql } from 'react-apollo';
import { FormGroup } from "bootstrap-react-components";
import Autocomplete from "../components/autocomplete";

class CityFormGroup extends React.Component {

	render( ) {
		let {
			id="",
			onChange,
			required = false,
			value = ""
		} = this.props;
		let city_options = [ "Phoenix", "San Angelo" ];
		return (
			<FormGroup id={"city_" + id} label="City" required={required} >
				<Autocomplete id={"city_" + id} options={city_options} value={value} onChange={onChange.bind( this )}/>
			</FormGroup>
		);

	}
}

export default CityFormGroup;

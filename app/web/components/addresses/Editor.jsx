import React from "react";
import { ItemEditor } from "react-templates-and-utils";
import { SelectFormGroup } from "bootstrap-react-components";
import Autocomplete from "../autocomplete";

class Editor extends ItemEditor {

  city_change( city_name ) {
    this.setState({
      city: {
        id: city_name,
        name: city_name
      }
    });
  }

	propsToState( props ) {
		let {
			id = 'new',
			street_address = '',
			city = {
				name : ''
			},
			state = {
				abbreviation : ''
			},
			zip_code = {
				name : ''
			}
		} = props;
		this.setState({ id, street_address, city, state, zip_code });
	}

	state_change( e ) {
		this.setState({
			state: {
				id: e.target.selectedOptions[0].value,
				abbreviation: e.target.selectedOptions[0].label
			}
		});
	}

	street_address_change( e ) {
		this.setState({ street_address: e.target.value })
	}

	render( ) {
		let { id, street_address, city, state, zip_code } = this.state;
		let city_options = [
			{
				id: 1,
				name: "Phoenix"
			}, {
				id: 2,
				name: "Tucson"
			}, {
        id:3,
        name: "Philadelphia"
      }
		]
		let state_options = [
			{
				id: 1,
				name: "Arizona",
				abbreviation: "AZ"
			}, {
				id: 2,
				name: "California",
				abbreviation: "CA"
			}
		];
		let zip_code_options = [
			{
				id: 1,
				name: "85037"
			}, {
				id: 2,
				name: "85036"
			}
		];
		return (
			<div id={id} class="address">
				<div><input class="form-control" id={"street_address_" + id} onChange={this.street_address_change.bind( this )} required={true} type="text" value={street_address}/></div>
				<div>
          <Autocomplete id={'city_select_' + id} onChange={this.city_change.bind(this)} options={city_options.map(city => ({value: city.id, label: city.name}))} selected={city.name}/>
				</div>
				<div>
					<select class="form-control" id={'state_select_' + id} onChange={this.state_change.bind( this )}>
						<option value="-1"></option>
						{state_options.map( o => <option key={o.id} value={o.id}>{o.abbreviation}</option>)}
					</select>
				</div>
				<div>
					<select class="form-control" id={'zip_code_select_' + id} onChange={this.zip_code_change.bind( this )}>
						<option value="-1"></option>
						{zip_code_options.map( o => <option key={o.id} value={o.id}>{o.name}</option>)}
					</select>
				</div>
				<div>{this.props.row_controls}</div>
				<button id="saveButton" type="button" class="btn btn-success" onClick={this.save.bind( this )}>Save
				</button>
			</div>
		);
	}

	stateToItem( ) {
		let { id, street_address, city, state, zip_code } = this.state;
		return ({ id, street_address, city, state, zip_code });
	}

  zip_code_change( e ) {
    this.setState({
      zip_code: {
        id: e.target.selectedOptions[0].value,
        name: e.target.selectedOptions[0].label
      }
    });
  }
}

export default Editor;

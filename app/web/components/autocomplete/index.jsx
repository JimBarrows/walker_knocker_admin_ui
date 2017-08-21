import React from "react";
import { SelectFormGroup } from "bootstrap-react-components";
import Item from "./item";

class Autocomplete extends React.Component {

	constructor( props ) {
		super( props );
		let {
			value = "",
			options = [ ]
		} = props;
		this.state = {
			value,
			options,
			show_type_ahead: false
		};
	}

	render( ) {
		let {
			id = ""
		} = this.props
		let {
			show_type_ahead,
			options = [],
			value
		} = this.state;

		let type_ahead = show_type_ahead
			? <div class="panel panel-default">
					<ul id={"list_group_" + id} class="list-group">
						{options.map( ( o, index ) => <Item key={index} value={o} onClick={this.select_change.bind( this )}/> )}
					</ul>
				</div>
			: "";
		return (
			<div id={"autocomplete_" + id} class="autocomplete">
				<input type="text" class="form-control" value={value} onChange={this.text_change.bind( this )}/> {type_ahead}
			</div>
		);
	}

	select_change( e ) {
		let value = e.target.textContent
		this.setState({ value, show_type_ahead: false });
		if ( this.props.onChange ) {
			this.props.onChange( value );
		}
	}

	text_change( e ) {
		let new_value = e.target.value;
		let options = [ ]
		if ( new_value ) {
			options = this.props.options.filter(o => o.startsWith( new_value ));
		} else {
			options = this.props.options;
		}

		this.setState({ value: new_value, options, show_type_ahead: true })
	}
}

export default Autocomplete;

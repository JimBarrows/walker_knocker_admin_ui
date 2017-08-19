import React from "react";
import { SelectFormGroup } from "bootstrap-react-components";
import Item from "./item";

class Autocomplete extends React.Component {

  componentWillMount() {
    let {options=[], selected=""} = this.props;
    this.setState({ options, selected, show_type_ahead:false });
  	}

	componentWillReceiveProps( nextProps ) {
    let {options=[], selected=""} = nextProps;
		this.setState({ options, selected });
	}

	render( ) {
		let {
			id = ""
		} = this.props
		let {
			selected = "",
			options = [ ],
      show_type_ahead = false
		} = this.state;

    let type_ahead= show_type_ahead ? <div class="panel panel-default">
      <ul class="list-group">
      {options.map(( o, index ) => <Item key={index} value={o.label} onClick={this.select_change.bind(this)}/>)}
      </ul>
    </div> : "";
		return (
			<div id={"autocomplete_" + id} class="autocomplete">
				<input type="text" class="form-control" value={selected} onChange={this.text_change.bind( this )}/>
        {type_ahead}
			</div>
		);
	}

  select_change( e) {
    let selected = e.target.textContent
    this.setState({
      selected,
      show_type_ahead: false
    });
    if( this.props.onChange) {
      this.props.onChange( selected);
    }
  }

	text_change( e ) {
    let new_selected = e.target.value;
    let options =[]
    if( new_selected) {
      options = this.props.options.filter( o => o.label.match(new_selected) );
    } else {
      options = this.props.options;
    }

    this.setState({
      selected: new_selected,
      options,
      show_type_ahead:true
    })
    if( this.props.onChange) {
      this.props.onChange( new_selected);
    }
  }
}

export default Autocomplete;

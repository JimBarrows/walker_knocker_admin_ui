import React from "react";
import { StripedTable } from "bootstrap-react-components";
import { ItemDescription } from "react-templates-and-utils";

class AddressRow extends ItemDescription {
  editor( item) {

    return (<tr id="{item.id}">
      <td>{item.street_address}</td>
      <td>{item.city.name}</td>
      <td>{item.state.abbreviation}</td>
      <td>{item.zip_code.name}</td>
    </tr>);
  }

  viewer( item) {
    return (<tr id="{item.id}">
      <td>{item.street_address}</td>
      <td>{item.city.name}</td>
      <td>{item.state.abbreviation}</td>
      <td>{item.zip_code.name}</td>
    </tr>);
  }
}

export default AddressRow;

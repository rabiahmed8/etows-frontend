// Imports
import React, { Component } from 'react';

// Import Search Bar Components
import SearchBar from 'material-ui-search-bar';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';
import config from "../../config.js";

class AddressInput extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query:this.props.value
    };

  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
        // fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: [],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(this.props.id),
      options,
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    autocomplete.addListener('place_changed', ()=>this.handlePlaceSelect(autocomplete));
  }
  
  handlePlaceSelect = (autocomplete) => {

    // Extract City From Address Object
    const addressObject = autocomplete.getPlace();
    const address = addressObject?.formatted_address;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0]?.long_name,
          query: addressObject?.formatted_address,
        }
      );
      this.props.onChange(this.state.query);
    }
  }

  render() {
    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAP_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}/>
        <SearchBar
            id={this.props.id} 
            className={this.props.className} 
            placeholder={this.props.placeholder}
            value={this.state.query} 
            onCancelSearch={this.props.onChange}
            onChange={this.props.onChange}
            />
      </div>
    );
  }
}

export default AddressInput;
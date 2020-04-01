// import React , { Component } from 'react';
// import './Map.css';
// import Script from 'react-load-script';
// // import SearchBar from 'material-ui-search-bar';
// // import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

// class MapRender extends Component {
//   constructor() {
//     super();
//     this.state = {
//       zoom: 13,
//       maptype: 'roadmap',
//       place_formatted: '',
//       place_id: '',
//       place_location: '',
//       lat: 37.7749,
//       lng: -122.431297,
//       city: '',
//       query: ''
//     };
//     this.handlePlaceSelect=this.handlePlaceSelect.bind(this);
//     this.handleScriptLoad=this.handleScriptLoad.bind(this);
//   }

//   componentDidMount() {
//     let map = new window.google.maps.Map(document.getElementById('map'), {
//       center: {
//         lat : this.state.lat,
//         lng : this.state.lng
//       },
//       zoom: 10, 
//       mapTypeId : 'roadmap',
//     });
//     map.addListener('zoom_changed', () => {
//       this.setState({
//         zoom: map.getZoom(),
//       });
//     });
//     map.addListener('maptypeid_changed', () => {
//       this.setState({
//         mapType: map.getMapTypeId(),
//       });
//     });
//     let marker = new window.google.maps.Marker({
//       map: map,
//       position: {
//         lat: this.state.lat,
//         lng: this.state.lng
//       }
//     });

//     let inputNode = document.getElementById('pac-input');
//     console.log(inputNode)
//     map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(inputNode);
//     let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

//     autoComplete.addListener('place_changed',() => {
//       let place = autoComplete.getPlace();
//       let location = place.geometry.location;
//       this.setState({
//         place_formatted: place.formatted_address,
//         place_id: place.place_id,
//         place_location: location.toString(),
//       });

//       //bring the selected place in view on the map
//       map.fitBounds(place.geomgetry.viewport);
//       map.setCenter(location);

//       marker.setPlace({
//         placeId: place.place_id,
//         location: location,
//       });
//     });
//   }

//   handleScriptLoad = () => {
//     // Declare Options For Autocomplete
//     const options = {
//       types: ['(cities)'],
//     };

//     // Initialize Google Autocomplete
//     /*global google*/ // To disable any eslint 'google not defined' errors
//     this.autocomplete = new google.maps.places.Autocomplete(
//       document.getElementById('autocomplete'),
//       options,
//     );

//     // Avoid paying for data that you don't need by restricting the set of
//     // place fields that are returned to just the address components and formatted
//     // address.
//     this.autocomplete.setFields(['address_components', 'formatted_address']);

//     // Fire Event when a suggested name is selected
//     this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
//   }

//   handlePlaceSelect = () => {

//     // Extract City From Address Object
//     const addressObject = this.autocomplete.getPlace();
//     const address = addressObject.address_components;

//     // Check if address is valid
//     if (address) {
//       // Set State
//       this.setState(
//         {
//           city: address[0].long_name,
//           query: addressObject.formatted_address,
//         }
//       );
//     }
//   }


//   render() {
//     return (
//       <div id='app'>
//         <div id='map'>
//           <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g&libraries=places" onLoad={this.handleScriptLoad}></Script>
//           <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
//         </div>      
//         <div id='search'>
//         <MuiThemeProvider>
//         <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
//           onChange={this.handlePlaceSelect}
//           style={{
//             margin: '0 auto',
//             maxWidth: 800,
//           }}
//         />
//         </MuiThemeProvider>  
//         </div>
//       </div>
//     );
//   }
// };

// export default MapRender;
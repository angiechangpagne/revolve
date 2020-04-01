// import SearchBar from 'material-ui-search-bar';
// //Import React Scrit Libraray to load Google object
// import Script from 'react-load-script';
// import React from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


// class Search extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       city: '',
//       query: '',
//     };
//   }

//   render(props){
//     return (
//       <div>
//         <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoq4_-BeKtYRIs-3FjJL721G1eP5DaU0g&libraries=places" onLoad={this.handleScriptLoad}></Script>
//         <MuiThemeProvider>
//         <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
//           onChange={this.props.setAddress}
//           onRequestSearch={this.props.handlePlaceSelect}
//           style={{
//               margin: '0 auto',
//               maxWidth: 800,
//             }}
//         /></MuiThemeProvider> 
//       </div>
//     );
//   }
 
// };


// export default Search;
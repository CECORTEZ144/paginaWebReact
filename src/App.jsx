import React, { Component } from 'react'
import './App.css';
//import { appendFile } from 'fs';
import './assets/bootstrap/dist/css/bootstrap.min.css'
import './assets/fontawesome-free/css/all.css'
import  {AppRoute}  from './conf/route.jsx'

class App extends Component {

  constructor(...props){
    super(...props);

    this.state = {};
  }

  render(){
    return ( 
        <AppRoute />
     );
  }
}

export default App
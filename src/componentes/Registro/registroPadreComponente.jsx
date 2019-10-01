import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import RegistroPaso01 from './registroHijo01Componente.jsx'
import RegistroPaso02 from './registroHijo02Componente.jsx'

class RegistroPadreComponente extends Component{

    constructor(props){
        super(props);

        this.state = {
            persona : null,
            usuario : null,
            vista : 1
        }
    }

    myCallbackPersona = (dataFromChildPersona, vista) => {
        this.setState({ persona: dataFromChildPersona, vista : vista });
    }

    render(){

        const html = document.getElementsByTagName('html');
        const body = document.getElementsByTagName('body');
        const root = document.getElementById('root');
    
        root.setAttribute("class", "h-100");
        html[0].setAttribute("class", "h-100");
        body[0].setAttribute("class", "h-100");

        return(
            
            <div className="h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    {  this.state.vista == 1 ? <RegistroPaso01 callbackFromParent = { this.myCallbackPersona } persona = { this.state.persona  } /> : null }
                    {  this.state.vista == 2 ? <RegistroPaso02 dataFromParent = { this.state.persona } callbackFromParent = { this.myCallbackPersona } /> : null }
                </div>
            </div>

        );
    }

}

export default RegistroPadreComponente;
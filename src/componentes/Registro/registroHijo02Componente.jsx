import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import FormErrors from '../../helpers/FormValidador.jsx'
import data, {postData, getData} from '../../datos/data.jsx'

class Registrar2Componente extends Component{

    constructor(props){
        super(props);

        this.state = {
            persona : {
                nombre : "",
                direccion : "",
                telefono : "",
                edad : ""
            },
            usuario : "",
            password : "",
            confirmarpassword : "",
            usuarioValido : false,
            passwordValido : false,
            confirmarpasswordValido : false,
            formularioValido : false,
            vista : 1, //Regresa a paso 1
            formErrors : {
                usuario : "",
                password : "",
                confirmarpassword : ""
            }
        }

        let usuario = {
            usuario : "",
            contrasena : ""
        }

        let persona = {
            nombre : "",
            direccion : "",
            telefono : "",
            edad : ""
        }

        let registro = {
            usuario : usuario,
            persona : persona
        }
        
        this.state.registro = registro;

        if(this.props.dataFromParent != null){
            this.state.persona = this.props.dataFromParent;
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAtras = this.handleAtras.bind(this);
        this.handleRegistrarUsuario = this.handleRegistrarUsuario.bind(this);

    }

    handleRegistrarUsuario(e){

        this.state.registro.persona = this.state.persona;
        this.state.registro.usuario = {
            usuario : this.state.usuario,
            contrasena : this.state.password
        };

        let result = data.postData("registro/alta", this.state.registro);

        if (result.usuario != null){
            
        }

    }

    handleAtras(e){
        this.props.callbackFromParent(this.state.persona, this.state.vista);  
    }

    handleInputChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState( { [name] : value },  () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usuarioValido = this.state.usuarioValido;
        let passwordValido = this.state.passwordValido;
        let confirmarpasswordValido = this.state.confirmarpasswordValido;

        var mediumRegexPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
        var mediumRegexUser = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

        switch(fieldName) {
            case "usuario":
                usuarioValido = mediumRegexUser.test(value);
                fieldValidationErrors.nombre = usuarioValido ? '' : ' El usuario debe contener minusculas y numeros, con una longitud minima de 6 caracteres';
                break;
            case 'password':
                passwordValido = mediumRegexPassword.test(value);
                fieldValidationErrors.contrasena = passwordValido ? '': ' La contrasena debe contener como minimo 6 caracteres, una minuscula, una mayuscula y un caracter especial.';
                break;
            case 'confirmarpassword':
                    confirmarpasswordValido = this.state.password == value;
                    fieldValidationErrors.confirmacioncontrasena = confirmarpasswordValido ? '': ' Las contrasenas no coinciden';
                break;
            default:
                break;
        }

        this.setState({formErrors: fieldValidationErrors,
                        usuarioValido : usuarioValido,
                        passwordValido : passwordValido,
                        confirmarpasswordValido : confirmarpasswordValido
                      }, this.validateForm);
                    }
      
    validateForm() {
        this.setState({formValid: this.state.usuarioValido && this.state.passwordValido && this.state.confirmarpasswordValido});
    }

    render(){

        return(
            
            <div className="col-md-3 col-xs-12 card">
                <div>
                    <h2>Registro de cuenta, paso 2</h2>
                </div>
                <h5>Resumen</h5>
                <div className="mb-0">
                    <label>Nombre:</label> { this.state.persona.nombre } 
                </div>
                <div className="mb-0">
                    <label>Direccion:</label> { this.state.persona.direccion } 
                </div>
                <div className="mb-0">
                    <label>Telefono:</label> { this.state.persona.telefono } 
                </div>
                <div className="mb-0">
                    <label>Edad:</label> { this.state.persona.edad } 
                </div>
                <hr></hr>
                <div className="input-group mb-3">
                    <input maxLength="30" type="text" onChange={this.handleInputChange} name="usuario" value={this.state.usuario} className="form-control" placeholder="usuario" aria-label="usuario" aria-describedby="usuario" />
                </div>

                <div className="input-group mb-3">
                    <input onChange={this.handleInputChange} name="password"  value={this.state.password} type="password" className="form-control" placeholder="Escribe una contrasena" aria-label="escribe una contrasena" aria-describedby="escribe una contrasena" />
                </div>

                <div className="input-group mb-3">
                    <input type="password" onChange={this.handleInputChange} name="confirmarpassword"  value={this.state.confirmarpassword} className="form-control" placeholder="Confirma la contrasena" aria-label="confirma la contrasena" aria-describedby="edad" />
                </div>

                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <div className="input-group mb-3 d-flex justify-content-center">
                    <button className="btn btn-secondary mr-2" onClick={this.handleAtras} > Regresar al paso 1 </button>
                    <button className="btn btn-primary" disabled={!this.state.formValid} onClick= {this.handleRegistrarUsuario} > Registrarse </button>
                </div>

            </div>

        );
    }

}

export default Registrar2Componente;
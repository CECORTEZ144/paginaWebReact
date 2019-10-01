import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import FormErrors from '../helpers/FormValidador.jsx'
import data, {postData, getData} from '../datos/data.jsx'

class loginComponente extends Component{

    constructor(props){
        super(props)

        this.state = {
            falloLogin : false,
            user : "",
            password : "",
            userValid : false,
            passwordValid : false,
            formularioValido : false,
            formErrors : {
                user : "",
                password : ""
            }
        }

        /* Hacemos el bindeo de las funciones para Javascript */
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    handleSubmitLogin(){
        let result = data.postData("log/in", { usuario : this.state.user, contrasena : this.state.password });

        if(result.usuario == ""){
            this.state.falloLogin = true;
        } else {
            this.props.history.push("/usuario");
        }

    }

    noSeEncontroUsuario = () => {
        return <span className="text-danger">No se encontro usuario</span>
    }

    handleInputChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState( { [name] : value },  () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let userValid = this.state.userValid;
        let passwordValid = this.state.passwordValid;

        var mediumRegexPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
        var mediumRegexUser = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

        switch(fieldName) {
            case "user":
                userValid = mediumRegexUser.test(value);
                fieldValidationErrors.user = userValid ? '' : ' muy corto';
                break;
            case 'password':
                passwordValid = mediumRegexPassword.test(value);
                fieldValidationErrors.password = passwordValid ? '': ' muy corto';
                break;
            default:
                break;
        }

        this.setState({formErrors: fieldValidationErrors,
            userValid : userValid,
            passwordValid : passwordValid
                      }, this.validateForm);
                    }
      
    validateForm() {
        this.setState({formValid: this.state.userValid && this.state.passwordValid});
    }

    render (){

        const html = document.getElementsByTagName('html');
        const body = document.getElementsByTagName('body');
        const root = document.getElementById('root');
    
        root.setAttribute("class", "h-100");
        html[0].setAttribute("class", "h-100");
        body[0].setAttribute("class", "h-100");

        return (
            <div className="h-100">
                <div className="row h-100 justify-content-center align-items-center">

                    <div className="col-md-3 col-xs-12 card">
                        
                        <div>
                            <h2>Inicio de sesion</h2>
                        </div>
                        <hr></hr>
                        { this.state.falloLogin ? <noSeEncontroUsuario></noSeEncontroUsuario> : "" }
                        <div className="input-group mb-3">
                            <input maxLength="30" type="text" name="user" className="form-control" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="user-icon" onChange={ this.handleInputChange } />
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="unser-icon"><i className="fas fa-user"></i></span>
                            </div>

                        </div>

                        <div className="input-group mb-3">
                            <input maxLength="50" type="password" name="password" className="form-control" placeholder="Contrasena" aria-label="Contrasena" aria-describedby="user-key-password" onChange={ this.handleInputChange }/>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="unser-icon"><i className="fas fa-key"></i></span>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <div className="input-group mb-3 d-flex justify-content-center">
                            <Link className="btn btn-secondary mr-2" to="/registro" > No tengo cuenta </Link>
                            <button className="btn btn-primary"  disabled={!this.state.formValid} onClick={this.handleSubmitLogin}> Ingresar </button>
                        </div>

                    </div>
                    
                    
                </div>
            </div>
        )    
    }
}

export default loginComponente
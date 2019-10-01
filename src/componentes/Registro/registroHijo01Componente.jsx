import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import FormErrors from '../../helpers/FormValidador.jsx'

class RegistrarComponente extends Component{

    constructor(props){
        super(props);

        this.state = {
            nombreValido : false,
            direccionValido : false,
            telefonoValido : false,
            formularioValido : false,
            formErrors : {
                nombre : "",
                direccion : "",
                telefono : "",
                edad : ""
            },
            vista : 2,
            nombre : "",
            direccion : "",
            telefono : "",
            edad : ""
            
        }
        
        if(this.props.persona != null){

            this.state.nombre = this.props.persona.nombre 
            this.state.direccion = this.props.persona.direccion
            this.state.telefono = this.props.persona.telefono
            this.state.edad = this.props.persona.edad
            this.state.nombreValido = true
            this.state.direccionValido = true
            this.state.formularioValido = true

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSiguiente = this.handleSiguiente.bind(this);

    }

    handleSiguiente(e){
        this.props.callbackFromParent({
            nombre : this.state.nombre,
            direccion : this.state.direccion,
            telefono : this.state.telefono,
            edad : this.state.edad
        }, this.state.vista);
    }

    handleInputChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState( { [name] : value },  () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nombreValido = this.state.nombreValido;
        let direccionValido = this.state.direccionValido;
        let telefonoValido = this.state.telefonoValido;
        let edadValido = this.edadValido;

        var onlyNumbers = new RegExp("^[0-9]{10,10}$")

        switch(fieldName) {
            case "nombre":
                nombreValido = value.length >= 10;
                fieldValidationErrors.nombre = nombreValido ? '' : ' muy corto';
                break;
            case 'direccion':
                direccionValido = value.length >= 10;
                fieldValidationErrors.direccion = direccionValido ? '': ' muy corto';
                break;
            case 'telefono':
                telefonoValido =onlyNumbers.test(value);
                fieldValidationErrors.telefono = telefonoValido ? '': ' debe ser de 10 digitos';
                break;
            case 'edad':
                edadValido = value.length > 1;
                fieldValidationErrors.edad = edadValido ? '': ' no puede ser vacia';
                break;
            default:
                break;
        }

        this.setState({formErrors: fieldValidationErrors,
                        nombreValido : nombreValido,
                        direccionValido : direccionValido,
                        telefonoValido : telefonoValido,
                        edadValido : edadValido
                      }, this.validateForm);
                    }
      
    validateForm() {
        this.setState({formularioValido: this.state.nombreValido && this.state.direccionValido && this.state.telefonoValido && this.state.edadValido});
    }

    render(){

        return(
            <div className="col-md-3 col-xs-12 card">

                <div>
                    <h2>Registro de cuenta, paso 1</h2>
                </div>
                <hr></hr>
                <div className="input-group mb-3">
                    <input maxLength="30" type="text" onChange={this.handleInputChange} name="nombre" value={this.state.nombre} className="form-control" placeholder="Nombre completo" aria-label="Nombre completo" aria-describedby="nombre-completo" />
                </div>

                <div className="input-group mb-3">
                    <input maxLength="50" type="text" onChange={this.handleInputChange} name="direccion"  value={this.state.direccion} className="form-control" placeholder="Direccion" aria-label="Direccion" aria-describedby="direccion" />
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="unser-icon"><i className="fas fa-home"></i></span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <input maxLength="10" minLength="10" onChange={this.handleInputChange} name="telefono"  value={this.state.telefono} type="tel" className="form-control" placeholder="Contacto movil" aria-label="contacto movil" aria-describedby="contacto movil" />
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="unser-icon"><i className="fas fa-mobile"></i></span>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <input min="10" max="100" type="number" onChange={this.handleInputChange} name="edad"  value={this.state.edad} className="form-control" placeholder="Edad" aria-label="edad" aria-describedby="edad" />
                </div>

                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

                <div className="input-group mb-3 d-flex justify-content-center">
                    <Link className="btn btn-secondary mr-2" to="/" > Regresar al Inicio de Sesion </Link>
                    <button className="btn btn-primary" disabled={!this.state.formularioValido} onClick={this.handleSiguiente} > Siguiente </button>
                </div>

            </div>
        );
    }

}

export default RegistrarComponente;
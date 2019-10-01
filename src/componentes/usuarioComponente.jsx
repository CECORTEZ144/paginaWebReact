import React, {Component} from 'react'
import './imagen.css'
import data, { imagenBaseUrl64, getIpPublic} from '../datos/data.jsx'

class usuarioComponente extends Component{

    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
        this.state.urlImagenServer = "";
        this.state.copiado = "";

        this._handleImageChange = this._handleImageChange.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this.copyToClipboard = this.copyToClipboard.bind(this)

        getIpPublic().then(function(ipAdress){
            sessionStorage.setItem("ipAdress", ipAdress.origin);
        })


      }
    
      _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);
        
        let pantallaAltura = window.screen.height;
        let pantallaLargo = window.screen.width;
        let ip = this.state.ipAdress

        imagenBaseUrl64({
            image : this.state.imagePreviewUrl.split(',')[1],
            name :  this.state.file.name,
            description : this.state.file.name + ", " + pantallaAltura  + " X " + pantallaLargo + " desde mi ip: " + sessionStorage.getItem("ipAdress") 
        }).then(function(result){
            console.log(result.data);
            let elemento = document.getElementById("url-imagen-guardada");
            elemento.value = result.data.link;
        });

      }
      
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)

      }
      
      
    copyToClipboard(e){
        let elemento = document.getElementById("url-imagen-guardada");
        elemento.select();

        document.execCommand('copy');
        
        this.state.copiado = "Copiado"

        e.target.focus();
  };

      render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
    
        return (
            
          <div className="previewComponent">
            <form onSubmit={(e)=>this._handleSubmit(e)}>
              <input className="fileInput" 
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
              <button className="submitButton" 
                type="submit" 
                onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
            </form>
            <div className="imgPreview">
              {$imagePreview}
            </div>
            <input type="text" urlImagenServer="w-100" value={ this.state.urlImagenServer } id="url-imagen-guardada" ></input>
            <button onClick={this.copyToClipboard}>Copiar Texto</button>
            <span>{ this.state.copiado  } </span> 
          </div>
        )
      }

}

export default usuarioComponente
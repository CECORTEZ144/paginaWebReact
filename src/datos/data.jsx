const baseUrl = 'http://localhost:8080/Dev/'
const baseUrlImagenes = 'https://api.imgur.com/3/image'
const baseUrlUIPAPi = 'https://httpbin.org/ip'

export const getIpPublic = async () => {
    try {
        
        let result = await fetch(baseUrlUIPAPi).then(res => res.json() );
    
        return result;

    } catch(e){
        console.log(e);
        return e;
    }
}

export const imagenBaseUrl64 = async (parametros) => {
    try {
        
        let result = await fetch(baseUrlImagenes, {
            method : "post",
            body : JSON.stringify(parametros),
            headers : {
                'Content-Type': 'application/json',
                'Authorization' : 'Client-ID 546c25a59c58ad7'

            }
        }).then( res => res.json() );

        return result;

    } catch(e){
        console.log(e);
        return e;
    }
}

export const postData = async (extencionUrl, datos) => {
    try {

        let result = await fetch(baseUrl + extencionUrl, {
            method : "post",
            body : JSON.stringify(datos),
            headers : {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json() );

        return result;

    } catch(e){
        console.log(e);
        return e;
    }
}

export const getData = async (extencionUrl, datos) => {
    try {
        let result = await fetch(baseUrl + extencionUrl, {
            body : JSON.stringify(datos)
        }).then(res => res.json() );
    
        return result;

    } catch(e){
        console.log(e);
        return e;
    }
}

export default { postData, getData }
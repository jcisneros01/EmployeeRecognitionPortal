class Api {
    static headers() {
        return { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'dataType': 'json',
            //'X-Requested-With': 'XMLHttpRequest',
        }
    }

    static get(route, authorize = false) {
        return this.xhr(route, null, 'GET', authorize);
    }

    static put(route, params, authorize = false) {
        return this.xhr(route, params, 'PUT', authorize)
    }

    static post(route, params, authorize = false) {
        return this.xhr(route, params, 'POST', authorize)
    }

    static delete(route, params, authorize = false) {
        return this.xhr(route, params, 'DELETE', authorize)
    }

    static xhr(route, params, verb, authorize) {
        var host = 'https://awardapp.azurewebsites.net';
        if (process.env.NODE_ENV !== 'production') {
            host = 'https://localhost:44359';
        }
      
        const url = `${host}${route}`;
        let options = Object.assign({ method: verb}, params ? { body: JSON.stringify(params)}: null);
        options.headers = Api.headers();
        if(authorize) {
            Object.assign(options.headers, { 'Authorization': `Bearer ${localStorage.userJWT}` })
        }
       
        return fetch(url, options)//.then(resp => {
           
            
            //if(resp.ok) {
               // return resp//.json()
            //}
           // return json.then(err => { throw err});
        //})//.then(json => json);
    }
}

export default Api;

class Api {
    static headers() {
        return { 
            'Content-Type': 'application/json',
            //'dataType': 'json',
            //'X-Requested-With': 'XMLHttpRequest',
        }
    }

    static get(route) {
        return this.xhr(route, null, 'GET');
    }

    static put(route, params) {
        return this.xhr(route, params, 'PUT')
    }

    static post(route, params) {
        return this.xhr(route, params, 'POST')
    }

    static delete(route, params) {
        return this.xhr(route, params, 'DELETE')
    }

    static xhr(route, params, verb) {
        var host = ''
        if (process.env.NODE_ENV !== 'production') {
             host = 'https://localhost:5000';
        }
        else {
            host = 'https://awardapp.azurewebsites.net'
        }
        const url = `${host}${route}`;
        let options = Object.assign({ method: verb}, params ? { body: JSON.stringify(params)}: null);
        options.headers = Api.headers();
        return fetch(url, options).then( resp => {
            let json = resp.json();
            if(resp.ok) {
                return json
            }
            return json.then(err => { throw err});
        }).then(json => json);
    }
}

export default Api;

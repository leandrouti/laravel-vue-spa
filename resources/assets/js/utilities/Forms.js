import Errors from './Errors';

class Forms {
    constructor(data){
        this.originalData = data;
        this.errors = new Errors();

        for(let field in data){
            this[field] = data[field];
        }
    }
    
    reset() {
        for(let field in this.originalData){
            this[field] = '';
        }
        this.errors.clear();
    }

    data() {
        let data = {};

        for(let property in this.originalData){
            data[property] = this[property];
        }
        
        return data;
    }

    submit(requestType, url) {
        
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("on catch " + error);
                    this.onFail(error.response.data);
                    reject(error.response.data);
                });
        });
        
    }

    onSuccess(response) {
        this.reset();
    }

    onFail(errors) {
        this.errors.record(errors.errors);
    }
}

export default Forms;
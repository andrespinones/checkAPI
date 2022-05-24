export class User {
    constructor(
        public email: string,
        public _token: string, 
        private role: number,
        private expirationDate: Date,
        private apiKey:string
    ){}

    get token()
    { 
        //Regresa el atributo privado _token
        if( new Date() > this.expirationDate)
        {
            //Si el token expira entonces regresa nulo
            console.log('token expired')
            return null;
        }
        return this._token;
    }
}

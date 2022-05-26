export class User {
    constructor(
        public email: string,
        public _token: string, 
        public role: string,
        public expirationDate: Date,
        public apiKey:string,
        public userID:number
    ){}

    get token(){ 
        if( new Date() > this.expirationDate){
            return null;
        }
        return this._token;
    }
}
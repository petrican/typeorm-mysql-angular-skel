export class User {
  constructor(
    public auth: boolean,
    private _token: string,
    public username: string,
    public user_full_name: string,
    public user_email: string,
    public role: string
  ) //private _tokenExpirationDate: Date
  {}

  get token() {
    // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    //   return null;
    // }
    return this._token;
  }
}

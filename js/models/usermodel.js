import Model from "../models/model"

class UserModel extends Model {
  constructor(){
    this._instance = null;
  }

  static getInstance(){

    if (this._instance == null){
      this._instance = new UserModel();
    }
    return this._instance;
    
  }


}

UserModel._instance = null;

export default UserModel;

MVC

Model - View - Controller 
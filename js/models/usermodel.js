import Model from "../models/model.js"

class UserModel extends Model {
  constructor(){
    super();
    this._instance = null;
  }

  static getInstance(){

    if (this._instance == null){
      this._instance = new UserModel();
    }
    return this._instance;
  }

  getJsonData(){
    const users = JSON.parse(localStorage.getItem("users"));

    if (users != null){
      return users;
    }
    return [];
  }

  getAll(){
    let rows = JSON.parse(localStorage.getItem("users")) || [];
    return rows;
  }

  
  getById(id){
    const users = this.getJsonData();
    let user = null;
    user = users.find(a => a.id == id);
    return user;
  }

  adduser(data){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    data.id = this.generateId()
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }

  editUser(data){
    
    let rows = JSON.parse(localStorage.getItem("users")) || [];
    let index = users.findIndex(a => a.id == data.id);
    if (index > -1){      
      rows.splice(index,1,data)
      localStorage.setItem("users", JSON.stringify(rows));
      return true;
    }
    return false
  }

  deleteUser(id){
    let rows = JSON.parse(localStorage.getItem("users")) || [];
    let filtered = users.filter(a => a.id != id);
    localStorage.setItem("users", JSON.stringify(filtered));
    return true;
  }

  generateId(){    
    return "UID"+Date.now();
  }

  emailExists(email){
    let rows = JSON.parse(localStorage.getItem("users")) || [];
    let index = rows.findIndex(a => a.email == email);
    return index > -1;
  }

}

UserModel._instance = null;

export default UserModel;
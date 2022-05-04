export class InquiryModel {
  constructor(){
    this._instance = null;
  }

  static getInstance(){

    if (this._instance == null){
      this._instance = new InquiryModel();
    }
    return this._instance;
    
  }

  getJsonData(){
    const users = JSON.parse(localStorage.getItem("inquiries"));

    if (users != null){
      return users;
    }
    return [];
  }

  getAll(){
    const events = JSON.parse(localStorage.getItem("inquiries"));
    if (events != null){
      return events;
    }

    return []
  }

  getById(id){
    const users = this.getJsonData();
    let user = null;
    user = users.find(a => a.id == id);
    return user;
  }

  addRec(event){
    let events = JSON.parse(localStorage.getItem("inquiries")) || [];
    event.id = this.generateId();
    events = [...events, event];
    localStorage.setItem("inquiries", JSON.stringify(events));
    return true;
  }

  editRec(data){
    let rows = JSON.parse(localStorage.getItem("inquiries")) || [];
    let index = rows.findIndex(a => a.id == data.id);
    if (index > -1){      
      rows.splice(index,1,data)
      localStorage.setItem("inquiries", JSON.stringify(rows));
      return true;
    }
    return false;
  }

  deleteRec(id){
    let rows = JSON.parse(localStorage.getItem("inquiries")) || [];
    let filtered = rows.filter(a => a.id != id);
    localStorage.setItem("inquiries", JSON.stringify(filtered));
    return true;
  }

  generateId(){    
    return "INQ-"+Date.now();
  }

}


InquiryModel._instance = null;

export default InquiryModel;
export class EventModel {
  constructor(){
    this._instance = null;
  }

  static getInstance(){

    if (this._instance == null){
      this._instance = new EventModel();
    }
    return this._instance;
    
  }

  getJsonData(){
    const users = JSON.parse(localStorage.getItem("events"));

    if (users != null){
      return users;
    }
    return [];
  }

  getAll(){
    const events = JSON.parse(localStorage.getItem("events"));
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
    let events = JSON.parse(localStorage.getItem("events")) || [];
    event.id = this.generateId();
    events = [...events, event];
    localStorage.setItem("events", JSON.stringify(events));
    return true;
  }

  editRec(data){
    let rows = JSON.parse(localStorage.getItem("events")) || [];
    let index = rows.findIndex(a => a.id == data.id);
    if (index > -1){      
      rows.splice(index,1,data)
      localStorage.setItem("events", JSON.stringify(rows));
      return true;
    }
    return false;
  }

  deleteRec(id){
    let rows = JSON.parse(localStorage.getItem("events")) || [];
    let filtered = rows.filter(a => a.id != id);
    localStorage.setItem("events", JSON.stringify(filtered));
    return true;
  }

  generateId(){    
    return "EVT-"+Date.now();
  }

}


EventModel._instance = null;

export default EventModel;
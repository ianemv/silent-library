export class EventModel {
  constructor(){
    this._instance = null;
  }

  getInstannce(){

    if (this._instance == null){
      this._instance = new EventModel();
    }
    return this._instance;
    
  }

  getAllEvents(){
    const events = JSON.parse(localStorage.getItem("events"));
    if (events != null){
      return events;
    }
  }

  addEvent(event){
    let events = JSON.parse(localStorage.getItem("events"));
    events = [...events, event];
    localStorage.setItem("events", JSON.stringify(events));
  }

  editEvent(data){
    
    let rows = JSON.parse(localStorage.getItem("events")) || [];
    let index = events.findIndex(a => a.id == data.id);
    if (index > -1){      
      rows.splice(index,1,data)
      localStorage.setItem("events", JSON.stringify(rows));
      return true;
    }
    return false;
  }

  deleteUser(id){
    let rows = JSON.parse(localStorage.getItem("users")) || [];
    let filtered = users.filter(a => a.id != id);
    localStorage.setItem("events", JSON.stringify(filtered));
    return true;
  }

  generateId(){    
    return "UID"+Date.now();
  }

}
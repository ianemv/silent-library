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
}
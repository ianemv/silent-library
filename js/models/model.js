export default class Model {
  
  constructor(model){
    this.modelName = model;
  }

  static getInstance(){

    if (this._instance == null){
      this._instance = new Model();
    }
    return this._instance;
    
  }
  
  addNew(model){
    let recs = JSON.parse(localStorage.getItem(this.modelName));
    recs = [...recs, model];
    localStorage.setItem(this.modelName, JSON.stringify(recs));
  }
}


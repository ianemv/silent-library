import { createTable } from "../elements/table.js";
import InquiryModel from "../models/inquiry.js";

const COLUMNS = [
  {name: 'id', title: "ID"},
  {name: 'name', title: "Title"},
  {name: 'message', title: "Message"},
  {name: 'date', title: "Date"},
  {name: 'event_id', title: "Event ID"} 
]


function renderTable () {
  const model = InquiryModel.getInstance();
  const rows = model.getAll();
  createTable("#inquiriestable",COLUMNS,rows, "inquiries")
}

// edit form
if (document.querySelector("#inquiriestable")){
  renderTable()
}

export const createTable = (id, columns, rows, page) => {
	const headings = createTableHeading(columns);
	
  let rowTable = createBookTableRows(rows, columns);
  
  switch(page){
    case 'books':
      rowTable = createBookTableRows(rows, columns);
      break;
    case 'borrowers':
      rowTable = createBorrowersTableRows(rows, columns);
      break;
    case 'events':
      rowTable = createEventsTableRows(rows, columns);
      break;

  }
  



	let table = "<table>";
	table += headings;
	table += rowTable;
	table += "</table>";
  document.querySelector(id).innerHTML = table;
}

const createTableHeading = (columns) => {
	
	let headings = '';
	headings +="<th><tr>";
	
	columns.forEach(element => {
		headings += "<td>"+element.title+"</td>";
	});
  
  headings += "<td>Action</td>"
  headings +="</tr></th>";
	return headings;
}
const createBookTableRows = (data, columns) => {
	let rows = "";

	data.forEach(row => {
		rows += "<tr>";

    columns.forEach(c => {
      rows += "<td>";
      rows += row[c.name]
			rows += "</td>";
    })
    rows += "<td>";
    rows += "<a class='btn text-white bg-blue p-10 mx-10 d-block' href=\"../books/editBook.html?id="+row.id+"\">Edit</a>";
    rows += "<button class=\"delete-book my-10 btn text-white bg-blue p-10 d-block w-100 cursor-pointer\" data-action=\"books\" data-id=\""+row.id+"\">Delete</button>";
    rows += "</td>";		
		rows +="</tr>";
	})

	return rows;
}
const createBorrowersTableRows = (data, columns) => {
	let rows = "";

	data.forEach(row => {
		rows += "<tr>";

    columns.forEach(c => {
      rows += "<td>";
      rows += row[c.name]
			rows += "</td>";
    })
    rows += "<td>";
    rows += "<a class='btn text-white bg-blue p-10 mx-10 d-block' href=\"../borrowers/edit.html?id="+row.id+"\">Edit</a>";
    rows += "<button class=\"delete-borrower my-10 btn text-white bg-blue p-10 d-block w-100 cursor-pointer\" data-action=\"borrowers\" data-id=\""+row.id+"\">Delete</button>";
    rows += "</td>";		
		rows +="</tr>";
	})

	return rows;
}

const createEventsTableRows = (data, columns) => {
	let rows = "";

	data.forEach(row => {
		rows += "<tr>";

    columns.forEach(c => {
      rows += "<td>";
      rows += row[c.name]
			rows += "</td>";
    })
    rows += "<td>";
    rows += "<a class='btn text-white bg-blue p-10 mx-10 d-block' href=\"../events/edit.html?id="+row.id+"\">Edit</a>";
    rows += "<button class=\"delete-event my-10 btn text-white bg-blue p-10 d-block w-100 cursor-pointer\" data-action=\"events\" data-id=\""+row.id+"\">Delete</button>";
    rows += "</td>";		
		rows +="</tr>";
	})

	return rows;
}
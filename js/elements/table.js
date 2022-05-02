export const createTable = (id, columns, rows) => {
	const headings = createTableHeading(columns);
	const rowTable = createBookTableRows(rows, columns);
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
    rows += "<a href=\"../books/editBook.html?id="+row.id+"\">Edit</a>";
    rows += "<button class=\"delete-book mx-10\" data-action=\"books\" data-id=\""+row.id+"\">Delete</button>";
    rows += "</td>";		
		rows +="</tr>";
	})

	return rows;
}
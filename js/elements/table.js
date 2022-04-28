export const createTable = (id, columns, rows, action) => {
	const headings = createTableHeading(columns);
	const rowTable = createTableRows(rows, action);
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
		headings += "<td>"+element+"</td>";
	});
	headings +="</tr></th>";
	return headings;
}
const createTableRows = (data, action = false) => {
	let rows = "";

	data.forEach(row => {
		rows += "<tr>";
		const cols = Object.keys(row).forEach(a => {
			rows += "<td>";
			rows +=  row[a]
			rows += "</td>";
		})
		if (action){
			rows += "<td></td>"
		}
		rows +="</tr>";
	})

	return rows;

}
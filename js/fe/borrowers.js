import UserModel from "../models/usermodel.js";

const model = UserModel.getInstance();

function loadBorrowers(){
	const borrowers = model.getAll();
	let rows = ``

	const today = new Date(Date.now());

	borrowers.forEach((a,i) => {
		rows += `<tr>
			<td>${a.first_name} ${a.last_name}</td>
			<td>${today.toDateString()}</td>
			<td align="right">${Math.floor(Math.random() * 100)}</td>
		</tr>`
	})

	document.querySelector("#borrowers-list-body").innerHTML = rows;
}

loadBorrowers()
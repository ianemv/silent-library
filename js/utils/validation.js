export function showError(el, errors){
	Object.keys(errors).forEach(key => {
		let fldErrors = errors[key].join(",")
		document.querySelector(`${el} [data-field="${key}"]`).innerHTML=fldErrors;
  })
}
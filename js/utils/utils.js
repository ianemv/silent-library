export const formToObject = (form) => {
	const elements = form.elements;
  let data = {};

  for (var i = 0; i < elements.length; i++){
    data[elements[i].name] = elements[i].value;
  }
	return data;
}
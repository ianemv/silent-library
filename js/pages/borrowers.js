function handleSubmitForm(e){
	alert("i was called by submit")
}

document.querySelector("#submitbform").addEventListener("click",handleSubmitForm);

document.querySelector("#title").addEventListener("click",function(){
	//alert("i was focus")
})
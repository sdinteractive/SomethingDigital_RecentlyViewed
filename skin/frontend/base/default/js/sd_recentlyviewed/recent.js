document.observe('dom:loaded',function(){
	//get localstorage and append
	var html = localStorage.getItem('recently-viewed') || '',
		recent = document.getElementById('recently-viewed').innerHTML;

	console.log(html += recent);
	localStorage.setItem('recently-viewed',html);
});
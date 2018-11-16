function basePase(val){
	var c = document.createElement('div');
	c.innerHTML = val;
	val = c.innerText || c.textContent;
	c = null;
	return val;
}
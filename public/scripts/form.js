var indexC = 0;
var x = document.querySelectorAll(".nonact");
var atr = document.querySelector("#atr");
var adl = document.querySelector("#adl");
var falt = 0;

function atras(){
	atr.style.display="block";
	adl.style.display="block";
	x[indexC].classList.remove("activesld");
	if(indexC!=0)
		indexC--;
	if(indexC==0)
		atr.style.display="none";
	x[indexC].classList.add("activesld");
	scrollUp(0);
}

function adelante(){
	adl.style.display="block";
	atr.style.display="block";
	// if(indexC==1)
	// 	if(!checkinputs()){
	// 		alert("No se llenaron todos los campos");
	// 		return;
	// 	}
	x[indexC].classList.remove("activesld");
	if(indexC!=x.length-1)
		indexC++;
	if(indexC==x.length-1)
		adl.style.display="none";
	x[indexC].classList.add("activesld");
	scrollUp(0);
}

function checkinputs(){
	if(x[indexC].querySelector("input").value=='') return false;
	if(x[indexC].querySelectorAll("select")[0].value=='') return false;
	if(x[indexC].querySelectorAll("select")[1].value=='') return false;
	return true;
}

function scrollUp(x){
	window.scrollTo({
	top: x,
	left: 0,
	behavior: 'smooth'
	});
}
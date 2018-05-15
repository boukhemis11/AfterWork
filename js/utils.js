function loadTables(){
	let tableName = localStorage.getItem('tabName');
	let tableTime = localStorage.getItem('tabTime');
	// sort tableTime and table Name ? 
	
	console.log(tableName);
	console.log(tableTime);
	setTable(tableName, tableTime);
	
	
	
}



function setTable (tab2, tab3){
if(tab3.length==1){
	document.getElementById("name1").innerHTML = tab2[0];
	document.getElementById("score1").innerHTML = tab3[0];
}else if(tab3.length==2){
	document.getElementById("name1").innerHTML = tab2[1];
	document.getElementById("score1").innerHTML = tab3[1];
	document.getElementById("name2").innerHTML = tab2[0];
	document.getElementById("score2").innerHTML = tab3[0];
}else if(tab3.length==3){
	document.getElementById("name1").innerHTML = tab2[2];
	document.getElementById("score1").innerHTML = tab3[2];
	document.getElementById("name2").innerHTML = tab2[1];
	document.getElementById("score2").innerHTML = tab3[1];
	document.getElementById("name3").innerHTML = tab2[0];
	document.getElementById("score3").innerHTML = tab3[0];
}else if(tab3.length==4){
	document.getElementById("name1").innerHTML = tab2[3];
	document.getElementById("score1").innerHTML = tab3[3];
	document.getElementById("name2").innerHTML = tab2[2];
	document.getElementById("score2").innerHTML = tab3[2];
	document.getElementById("name3").innerHTML = tab2[1];
	document.getElementById("score3").innerHTML = tab3[1];
	document.getElementById("name4").innerHTML = tab2[0];
	document.getElementById("score4").innerHTML = tab3[0];
}else if(tab3.length==5){
	document.getElementById("name1").innerHTML = tab2[4];
	document.getElementById("score1").innerHTML = tab3[4];
	document.getElementById("name2").innerHTML = tab2[3];
	document.getElementById("score2").innerHTML = tab3[3];
	document.getElementById("name3").innerHTML = tab2[2];
	document.getElementById("score3").innerHTML = tab3[2];
	document.getElementById("name4").innerHTML = tab2[1];
	document.getElementById("score4").innerHTML = tab3[1];
	document.getElementById("name5").innerHTML = tab2[0];
	document.getElementById("score5").innerHTML = tab3[0];
}
}
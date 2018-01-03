
var clickChickx = false;
var cellArray = [];
var clickArray = [];
var clickArrayc = [];
var ic = 0;
var check = "on";
var mode = "normal";

var sound = {
    "#b1": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    "#b2": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    "#b3": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    "#b4": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };


$('#check').change(function() { 
    if (this.checked) {
        $("button").prop("disabled",false);
        check = "on";
    } else {
        $("button").prop("disabled",true);
        check = "off";
        restart();
    }
});



$('#strict').change(function(){
    mode = "strict";
})

$('#normal').change(function(){
    mode = "normal";
})

$("#b1").click(function() {
	checkClick("#b1");
})


$("#b2").click(function() {
	checkClick("#b2");
})

$("#b3").click(function() {
	checkClick("#b3");
})

$("#b4").click(function() {
	checkClick("#b4");
})

$(".startbtn").click(function() {
	if(cellArray.length < 1){
		game();
	} else if(cellArray.length >= 1){
		restart()
	}
})


function game() {
	var timexs;
	if(cellArray.length < 9){
		timexs = 500;
		timexx = 1000;
		$(".level").text("Level One");
		$(".level").css("background-color", "#fff");
	}else if(cellArray.length >= 9 && cellArray.length < 13){
		timexs = 250;
		timexx = 750;
		$(".level").text("Level Two");
		$(".level").css("background-color", "#D3D3D3");
	}else if(cellArray.length >= 13){
		timexs = 100;
		timexx = 300;
		$(".level").text("Level Three");
		$(".level").css("background-color", "#708090");
		$(".level").css("color", "#fff");
	}
	$("button").prop("disabled",true);
	if(cellArray.length < 1){
		cellauto();
		click(cellArray[0], timexs);

	} else {
		if(cellArray.length === clickArray.length && cellArray.length <= 19 ){
			cellauto();
			clickArray = [];
		}
		if(clickArray.length === 20){
			console.log("win");
			$(".cell").addClass("winx");
			$(".cview").text("You Win!");
			setTimeout(restart, 2500);
		}else {
			var howManyTimes = cellArray.length;
		    if( ic <= howManyTimes ){
		    	click(cellArray[ic], timexs);
		    	ic++;
		    	setTimeout(game, timexx);
		    } else if (ic > howManyTimes){
		    	ic = 0;
		    }

		}
		
	}
	
	clickChickx = true;
	if(clickArray.length < 20){
		textCheck();
	}
	$("button").prop("disabled",false);
}

	


function cellauto() {
	var random = Math.floor((Math.random() * 4) + 1);
	var cellx = "#b"+random
	cellArray.push(cellx);
}


function addclass(){
	$(".cell").addClass("buttonx");
}

function click(cellno, time){
	$(cellno).removeClass("buttonx");
	$(cellno).prop("border","none");
	setTimeout(addclass, time);
}

function checkClick(x){

	if(clickChickx){
		clickArray.push(x);
		sound[x].play();
		click(x, 200);
		chickArrays();
		if(cellArray.length === clickArray.length) {
			setTimeout(game, 1000);
		}
	}
}

function chickArrays(){
	var x = 1;
	for (var i = 0; i < clickArray.length; i++) {
		if(clickArray[i] != cellArray[i]){
			console.log("wrong");
			$(".cview").text("!!");
			clickArray = [];
			if(mode === "normal"){
				setTimeout(game, 1500);
			}else if(mode === "strict"){
				setTimeout(restart, 1500);
			}
			
			x = 0;
		} else {
			console.log("true");
		}
		if(!x){
			return;
		}
	}

}

function textCheck(){
	if(cellArray.length > 0) {
		$(".cview").text(cellArray.length);
	}
}

function restart(){
	clickChickx = false;
	cellArray = [];
	clickArray = [];
	clickArrayc = [];
	ic = 0;
	$(".cell").removeClass("winx");
	if(check === "on"){
		$(".cview").text("Restart");
		setTimeout(game, 2000);
	}else if (check === "off"){
		$(".cview").text("Press Start");
	}
	
}
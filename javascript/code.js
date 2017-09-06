var setM = 25;
var cansetM = true;
var cansetB = true;
var setB = 5;
var runM;
var runB;
var currentSecond;
var paused = false;
var played = false;
var breaked = false;
	// format time
	function format(min,second) {
		// body...
		if (min < 10){
			min = "0" + min;
		}
		if (second < 10) {
			second = "0" + second;
		}
		return (min+":"+second)
	}
	// reset
	function reset(){
		paused = false;
		cansetM = true;
		cansetB = true;
		setM = 25;
		setB = 5;
		clearInterval(runM);
		clearInterval(runB);
		$("#time").text("25:00");
		$("#setM").text(25);
		$("#setB").text(5);
	}
	function stoprun() {
		paused = false;
		cansetM = true;
		cansetB = true;
		clearInterval(runM);
		clearInterval(runB);
		$("#time").text(setM+":00");
	}
	// run M
	function runtimeM(){
		breaked = false;
		played = true;
		document.getElementById("label").innerHTML = "Session";
		cansetB = false;
		cansetM = false;
		var secondM = (paused ? currentSecond : setM*60);
		paused = false;
		runM = setInterval(function(){
	    						secondM--;
	    						var tempM = parseInt(secondM/60);
	    						var tempS = secondM - tempM*60;
	    						$("#time").text(format(tempM,tempS));
	    						if (secondM == 0) {
	    							clearInterval(runM);
	    							runtimeB();
	    						}
							}, 100);
	};
	// run B
	function runtimeB() {
		played = true;
		breaked = true;
		document.getElementById("label").innerHTML = "Break";
		var secondB = (paused ? currentSecond : setB*60);
		paused = false;
		runB = setInterval(function(){
	    						secondB--;
	    						var tempM = parseInt(secondB/60);
	    						var tempS = secondB - tempM*60;
	    						$("#time").text(format(tempM,tempS));
	    						if (secondB == 0) {
	    							clearInterval(runB);
	    							runtimeM();
	    						}
							}, 100);
	}
	// pause
	function pause() {
		paused = true;
		clearInterval(runM);
		clearInterval(runB);
		var a = document.getElementById("time").innerHTML.split(":");
		// setM = parseInt(a[0]);
		currentSecond = parseInt(a[0])*60 + parseInt(a[1]);
		
	}
	$( document ).ready(function() {
	    // console.log( "ready!" );
	    // set button up down
	    $("#upM").click(function(event) {
	    	if (cansetM) {
	    		setM++;
		    	$("#setM").text(setM);
		    	$("#time").text((setM < 10 ? ("0"+setM):setM)+":00")
	    	}
	    	
	    	// console.log(setM);
	    });
	    $("#downM").click(function(event) {
	    	if ((setM > 1)&&(cansetM)) {
	    		setM--;
		    	$("#setM").text(setM);
		    	$("#time").text((setM < 10 ? ("0"+setM):setM)+":00");
	    	}
	    	
	    });
	    $("#upB").click(function(event) {
	    	if (cansetB) {
	    		setB++;
	    		$("#setB").text(setB);
	    	}
	    	
	    });
	    $("#downB").click(function(event) {
	    	if ((setB > 1)&&(cansetB)) {
	    		setB--;
	    		$("#setB").text(setB);
	    	}
	    });
	    // set function play button
	    $("#playButton").click(function(event) {
	    	if (!played) {
	    		if (!breaked) {
	    			runtimeM();
	    		}
	    		else
	    		{
	    			runtimeB();
	    		}
	    		
	    	}
	    	// disable setTime
	    	
				
	   	$("#stopButton").click(function(event) {
	   		played = false;
	   		stoprun();
	   	}); 	
	    						
	    });
	    $("#resetButton").click(function(event) {
	    	// alert("xx");
	    	paused = false;
	    	played = false;
	    	reset();

	    });
	    $("#pauseButton").click(function(event) {
	    	played = false;
	    	pause();
	    });
	});

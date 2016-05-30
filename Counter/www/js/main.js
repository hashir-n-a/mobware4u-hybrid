 
var current_count = 0;

/**
 * Function gets called when screen is tapped
 * @param event
 */
function tapHandler(event) {
	// get next count
	current_count = current_count + 1;
	// set count in knob
	$('#knob').val(current_count).trigger('change');
	// save it to local storage
	localStorage.setItem("counter_current_count", current_count);
	// display an animation
	$('#knob').animateCss('zoomIn');
	// alert if goal
	var saved_goal = localStorage.getItem("counter_goal");
	if(current_count >= parseInt(saved_goal)) {
		alert("GOAL");
	}
}
 


function initialise() {
	// add jquery method for animation
	$.fn.extend({
	    animateCss: function (animationName) {
	        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
	            $(this).removeClass('animated ' + animationName);
	        });
	    }
	});
	
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
    
    // init current count from local storage
    var data = localStorage.getItem("counter_current_count");
    if(data != null && data != "0") {
    	current_count = parseInt(data);
    	$('#knob').val(current_count).trigger('change');
    }

    // init tap handler
    $("#clock").click(tapHandler);
    
    // reset button handler
    $("#reset_button").click(function() {
    	var r = confirm("Do you really want to reset?");
    	if (r == true) {
    		current_count = 0;
    		$('#knob').val(current_count).trigger('change');
    		localStorage.setItem("counter_current_count", current_count);
    		$('#knob').animateCss('bounce');
    	}
    });
    
    // set goal button handler
    $("#goal_button").click(function() {
    	var saved_goal = localStorage.getItem("counter_goal");
    	if(saved_goal == null) {
    		saved_goal = "100";
    	}
    	var goal = prompt("Enter a goal", saved_goal);
    	if (goal != null) {
    		if(isNumeric(goal)) {
	    		goal = parseInt(goal);
	    		localStorage.setItem("counter_goal", parseInt(goal));
	    		$("#knob").trigger('configure',{
	    	        'thickness':0.1,
	    	        'readOnly':true,
	    	        'angleOffset':0,
	    	        'min':0,
	    	        'max':parseInt(goal),
	    	        'fgColor':"#999999",
	    	        'bgColor':"#444444"
	    	    });
	    		$('#knob').animateCss('bounce');
    		} else {
    			alert("enter a valid number");
    		}
    	}
    });

    // init goal from local storage
    var saved_goal = localStorage.getItem("counter_goal");
    if(saved_goal == null) {
		saved_goal = "100";
	}
    
    // init knob
    $("#knob").knob({
        'thickness':0.1,
        'readOnly':true,
        'angleOffset':0,
        'min':0,
        'max':parseInt(saved_goal),
        'fgColor':"#999999",
        'bgColor':"#444444"
    });
    
    // display footer after animation
    $('#flash_message').hide();
    
    $('#clock').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    	$('#flash_message').show();        
        $('#flash_message').delay(5000).fadeOut('slow');
    });
}



function isNumeric(num){
    return !isNaN(num)
}
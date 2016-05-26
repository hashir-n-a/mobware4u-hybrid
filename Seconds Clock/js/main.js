 


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    s = (h*60 + m)*60 + s;
    
    $('#knob').val(s).trigger('change');
    
    t = setTimeout(function () {
  		startTime()
    }, 500);
 }
 

function initialise() {
	
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
    
    document.addEventListener("webkitvisibilitychange", function() {
    	 if (document.webkitHidden) {
    		    try {
                	tizen.power.release("SCREEN");
    		    }catch(ignore) {}
    	 }
    }, false);
    
    try {
    	tizen.power.request("SCREEN", "SCREEN_NORMAL");
    }catch(ignore) {}

    $("#knob").knob({
        'thickness':0.1,
        'readOnly':true,
        'angleOffset':0,
        'min':0,
        'max':86400,
        'fgColor':"#999999",
        'bgColor':"#444444"
    });
    
	startTime();
};
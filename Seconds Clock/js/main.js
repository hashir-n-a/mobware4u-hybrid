 
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    s = (h*60 + m)*60 + s;
    
    $('#knob').val(s).trigger('change');
    
    setTimeout(function () {
  		startTime();
    }, 500);
 }
 

function onScreenStateChanged(previousState, changedState) {
    //alert("Screen state changed from " + previousState + " to " + changedState);
    if (changedState == "SCREEN_DIM"   ){
        //tizen.power.restoreScreenBrightness();
        tizen.power.turnScreenOn();
    }       
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
    
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            try {
            	tizen.power.release("SCREEN");
            }catch(ignore){}
        } else  {
        	 try {
        		tizen.power.request("SCREEN", "SCREEN_NORMAL");
             }catch(ignore){}
        }
    }, false);
    
    
    try {
    	// whenever screen turns dim then turn it back on
    	tizen.power.setScreenStateChangeListener(onScreenStateChanged);
    }catch(ignore){}

    
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
}
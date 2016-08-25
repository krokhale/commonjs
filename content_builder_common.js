
// Worldcode API interface to Unity side

	$(document).ready(function() {

	    $("#Exit").click(
    		function (event)
    		{					
    		    engine.trigger('OnExit'); // no arguments, this callback orders to close any window where it was called
    		}
	    );

	    $("#Play").click(
    		function (event)
    		{	
    		    // before send OnPlay, check please #Worldcode against the regex and empty rules
    		    engine.trigger('OnPlay'); // no arguments
    		}
	    );
	    
	    $("#Settings").click(
    		function (event)
    		{					
    		    engine.trigger('OnSettings'); // no arguments
    		}
	    );

	    $("#Worldcode").click(
    		function (event)
    		{					
    		    engine.trigger('OnTextFieldClick'); // no arguments
    		}
	    );
	    
	    $("#Worldcode").keyup(
    		function (event)
    		{					
    		    //there should be 
    		    // 1) for changed Worldcode apply regex: Regex.Replace(worldCode, @"[^a-zA-Z0-9\-]", "")
    		    // 2) do not send empty Worldcode
    		    // 3) higlight empty worldcode field with red element birder
    		    engine.trigger('OnWorldcodeChaged', $("#Worldcode").val()); // Value (string)
    		}
	    );
			
	    $("#Exit, #Play, #Settings").mouseenter(function() {
    		engine.trigger('OnMouseEnter', 1); // 1 - show hand cursor
    	    })
    	    .mouseleave(function() {
    		engine.trigger('OnMouseLeave'); // back to normal cursor
	    });
	    
	    $("#Worldcode").mouseenter(function() {
    		engine.trigger('OnMouseEnter', 2); // 1 - show mouse cursor for the text input 
    	    })
    	    .mouseleave(function() {
    		engine.trigger('OnMouseLeave'); // back to normal cursor
	    });

	});
	
    engine.on("SetWorldCode", function (value)
    {
//	console.log( "SetWorldCode " + value);
    	$("#Worldcode").val(value);
    });

    engine.on("AddCharacter", function (value)
    {
	    console.log( "AddCharacter " + value);
    	if(value == "-1")
    	    removeAtCursor($("#Worldcode"));
    	else
    	    insertAtCursor($("#Worldcode"), value);
        });

    engine.on("OnBackendReady", function ()
    {
      	$("#Wait").hide();
      	$("#Play").show();
    });

function removeAtCursor(myField) 
{
    var pos = myField.getCursorPosition();
    myField.val( myField.val().substring(0, pos-1)
        + myField.val().substring(pos, myField.val().length));
    pos -= 1;
	myField[0].setSelectionRange(pos, pos);

    engine.trigger('OnWorldcodeChaged', myField.val());
}

function insertAtCursor(myField, myValue) 
{
    var pos = myField.getCursorPosition();

console.log( "insertAtCursor " + myField + ", " + myValue + ", pos " +  pos + ", " + myField.val());

        myField.val( myField.val().substring(0, pos)
            + myValue
            + myField.val().substring(pos, myField.val().length));

    pos += myValue.length;
	myField[0].setSelectionRange(pos, pos);

    engine.trigger('OnWorldcodeChaged', myField.val());
}

(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);

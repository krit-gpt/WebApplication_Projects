/*
Instead of applying this class and doing .toggleClass, what we can do is something like this:

$("li").click(function(){
	if($(this).css("color") === "rgb(128, 128, 128)" {	//Cant write gray as JS needs coclor in rgb format!
	$(this).css("color", "black");
	}

	else{
	$(this).css({				//can give multiple arguments in the .css by passing in a block  -- {  }
		color: "gray",
		textDecoration : "line-through"  // Another thing to note is that textDecoration has to be in camel case
	});									// Cant write text-decoration like normal css, in JS
	}									// have to use CameCase for this.
});
*/

$("ul").on("click", "li", function(){  // put the selector on <ul> which was definitely on the page when it was loaded
										// and select <li> which might not be on the page when loaded.
	$(this).toggleClass("completed");
}); // important to note the difference between on() and click()
//click() is only for past elements, whereas, on() is for the future elements as well!

 
$("ul").on("click", "span", function(event){   // event added because we need to stopPropogation()
$(this).parent().fadeOut(900, function(){  // parent() of span is <li>
	//the inside this referes to the parent -- <li>
	$(this).remove(); //remove() is inside fadeOut() so that, it is not called the instant fadeOut() gets called
						// this ensures that the item gets faded out first and then removed!!
	});
event.stopPropogation(); // This is a jQuery function that stops event bubbling! That is the event is limited to this particular 						// 
});	
					 // level and not propogated upwards to <li> and then to <ul> and then to <body>


$("input[type='text']").keypress(function(event){ // 13 is enter; so when enter pressed, 
	if(event.which === 13){
		var todoText = $(this).val();  //get the value of the text from input.
		$(this).val("");  // clear out the input field.
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
		//this is how you append a new ToDo to the <ul> 
	}  // make sure that the new field added also has the same class and the icon
});


$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();  //fadeToggle() will ensure that the clicking on the plus sign will toggle the 
											//lower lying element
});
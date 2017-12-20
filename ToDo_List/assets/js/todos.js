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
	}
});
*/

$("li").click(function(){
	$(this).toggleClass("completed");
});


$("span").click(function(event){
$(this).parent().fadeOut(900, function(){  // parent() of span is <li>

	$(this).remove(); //remove() is inside fadeOut() so that, it is not called the instant fadeOut() gets called
						// this ensures that the item gets faded out first and then removed!!
	});
event.stopPropogation(); // This is a jQuery function that stops event bubbling! That is the event is limited to this particular 						// 
});						 // level and not propogated upwards to <li> and then to <ul> and then to <body>


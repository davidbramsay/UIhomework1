// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to	= "English";
	var lang_from = "Spanish";

	var currentDict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var keyArray = Object.keys(currentDict);

	// Your code here

	//replace titles with lang_to and lang_from variables
	var insertLang = $("body").html().replace(/LANGFROM/g, lang_from).replace(/LANGTO/g, lang_to);
	$("body").html(insertLang);

	//set focus
	$("input").focus();



	//choose random word from current_dict
	var randIndex = Math.floor(Math.random() * keyArray.length);

	//insert into html
	console.log(keyArray[randIndex] + ":" + currentDict[keyArray[randIndex]]);
	$("#lCol .curEntry").html(currentDict[keyArray[randIndex]]);



	//check/update word
	function updateCheck(wordInput) {

		if( wordInput == keyArray[randIndex] ){ //IF WORD CORRECT
			
			$("#lCol .pastEntries").prepend("<div class='correct pastEntry'>" + currentDict[keyArray[randIndex]] + "</div>");
			$("#cCol .pastEntries").prepend("<div class='correct pastEntry'>" + wordInput + "</div>");
			$("#rCol .pastEntries").prepend("<div class='correct pastEntry'><span class='ui-icon ui-icon-check'></span></div>");

		} else { //IF WORD INCORRECT
			
			$("#lCol .pastEntries").prepend("<div class='incorrect pastEntry'>" + currentDict[keyArray[randIndex]] + "</div>");
			$("#cCol .pastEntries").prepend("<div class='incorrect pastEntry'>" + wordInput + "</div>");
			$("#rCol .pastEntries").prepend("<div class='incorrect pastEntry'>" + keyArray[randIndex] + "</div>");

		}


		//PICK NEW WORD
		randIndex = Math.floor(Math.random() * keyArray.length);
		$("#lCol .curEntry").html(currentDict[keyArray[randIndex]]);

		//CLEAR OLD WORD AND REFOCUS	
		$("input").val('');
		$("input").focus();

	}




	$("input").autocomplete({
		autoFocus:true, 
		minLength: 2, 
		source:keyArray, 
		select: function(event, ui){
			updateCheck(ui.item.label);
			$(this).val(''); 
			return false;
		}
	});


	//click button
	$("button").click(function(){
		updateCheck($("input").val());	
	});

	//press enter
	$("input").keypress(function (e) {
  		if (e.which == 13) {
    		updateCheck($("input").val());
   			return false;
  		}
	});
    
});

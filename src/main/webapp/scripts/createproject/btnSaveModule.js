var i = 1;

$("#btnSaveModule").click(function(){
	var html="<div class='panel panel-primary'>"+
		    	"<div class='panel-heading' role='tab' id='heading"+i+"'>"+
		    		"<h4 class='panel-title'>"+
			        	"<a role='button' data-toggle='collapse' data-parent='#recordsModule' href='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>"+
			          		"Module"+i+""+
			        	"</a>"+
			        	"<span id='btnDeleteModule"+i+"' type='button' class='btn btn-danger marginTop-5 pull-right'>Delete</span>"+
		      		"</h4>"+
		    	"</div>"+
			    "<div id='collapse"+i+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading"+i+"'>"+
			    	"<div class='panel-body'>"+
			    	"</div>"+
			    "</div>"+
			"</div>";
	$("#recordsModule").append(html);
	i++;
});

function checkData(){
	var moduleName = "";
	var initialName = "";
	var startDate = "" , endDate = "";
	var count_elements = $('[id^=btnDeleteModule]').length;
	alert(""+count_elements);
}

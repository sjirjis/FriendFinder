$("#errorModal").modal('hide');

// Capture the form inputs 
$("#submit").on("click", function() {

	// Form validation
	function validateForm() {
	  var isValid = true;
	  $('.form-control').each(function() {
	    if ( $(this).val() === '' )
	        isValid = false;
	  });
	  return isValid;
	};

    // If all required fields are filled
    if (validateForm() == true) {
        var userInput = {
            name: $("#name").val(),
            photo: $("#photo").val(),
            scores: [
            	$("#q1").val(),
            	$("#q2").val(),
            	$("#q3").val(),
            	$("#q4").val(),
            	$("#q5").val(),
            	$("#q6").val(),
            	$("#q7").val(),
            	$("#q8").val(),
            	$("#q9").val(),
            	$("#q10").val()
            ]
        };

        $.post('/api/friends', userInput, function(data) {
            $("#bestMatchName").text(data.name);
            $('#bestMatchImg').attr("src", data.photo);
            $("#resultsModal").modal('toggle');
        });
    } else {
        $("#errorModal").modal('show');
    }
    return false;
});

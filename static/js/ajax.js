$("#vote-form").submit(function (event) {
    // Cancel submitting
    event.preventDefault();

    // Get the data from the form
    var $form = $(this);

    // Get submit button
    var $button = $form.find("input");

    // Submit
    $.ajax({
        url: $form.attr("action"),
        type: $form.attr("method"),
        data: $form.serialize(),
        timeout: 10000,

        // Before sending
        beforeSend: function (xhr, settings) {
            $button.attr('disabled', true);

        },
        // After response
        complete: function (xhr, textStatus) {
            $button.attr('disabled', false);

        },

        // Success
        success: function (result, textStatus, xhr) {
            $form[0].reset();
            alert("OK");
        },
        // Error
        error: function (xhr, textStatus, error) {
            alert("NG");

        }


    });
});
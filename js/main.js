
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('#submitbutton').on('click', function () {
        var check = true;

        $('#msgcontainersuccess').css('display', 'none');
        $('#msgcontainererror').css('display', 'none')

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        if (check) submitForm();
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    function submitForm() {
        const form = document.querySelector('form');
        const url = 'https://mobx15efm1.execute-api.us-east-1.amazonaws.com/Prod/submitForm';

        // Capture the form data
        let data = {};
        Array.from(form).filter(input => input.name).map(input => (data[input.name] = input.value));

        // Create the AJAX request
        var xhr = new XMLHttpRequest();
        xhr.open(form.method, url, true);
        xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        // Send the collected data as JSON
       xhr.send(JSON.stringify(data));

        $('#submitbutton').prop('disabled', true);
        $('form').css('opacity', 0.4);

        xhr.onloadend = response => {
           $('#submitbutton').prop('disabled', false);
           $('form').css('opacity', 1);

            if (response.target.status === 200) {
                $('#msgcontainersuccess').css('display', 'block');
                form.reset();
            } else {
                $('#msgcontainererror').css('display', 'block');
                form.reset();
            }
        };
    }

})(jQuery);
$(function () {
    // TODO Check: interval_var, post-created-at in the forms
    // Temperature Sensor
    let buttonpressed_temp;
    let interval_var_temp;
    let button_counter_temp = 0;
    let timeOut = 5 * 60 * 1000;
    $('.submitbutton_temp,.submitbutton_all').click(function () {
        buttonpressed_temp = $(this).attr('name')
    });
    $('#TemperatureForm,#AllSensorsForm').on('submit', function (event) {
        event.preventDefault();
        if (buttonpressed_temp == "Continuous" && button_counter_temp != 1) {
            console.log("Continuous Submission enabled for Temperature panel.");
            create_post_temp();
            button_counter_temp = 1;
            interval_var_temp = setInterval(create_post_temp, 2000);
            setTimeout(clear_interval_temp, timeOut);
        } else if (buttonpressed_temp == "Once") {
            console.log("Temperature Submit Once button was pressed.");
            if (interval_var_temp) {
                clearInterval(interval_var_temp);
                button_counter_temp = 0;
            }
            create_post_temp();
        } else if (buttonpressed_temp == "Stop") {
            console.log("Stopping continuous submission for Temperature panel.");
            if (interval_var_temp) {
                clearInterval(interval_var_temp);
                button_counter_temp = 0;
            }
        }
    });

    function clear_interval_temp() {
        if (interval_var_temp) {
            clearInterval(interval_var_temp);
            button_counter_temp = 0;
        }
    }

    function create_post_temp() {
        console.log("Entered create_post_temp() temperature function.");
        let dateTime_temp = getDateTimenow();
        $.ajax({
            url: "", // the endpoint
            type: "POST", // http method
            data: {
                temperature: $('#post-temperature').val(),
                created_at_temp: dateTime_temp
            }, // data sent with the post request
            // handle a successful response
            success: function () {
                let temperature = parseFloat($('#post-temperature').val());
                $('#post-created-at-temp').val(dateTime_temp);
                $('#post-temperature').val(getNextValue(temperature, -5, 5));
                console.log("POSTing was successful for temperature"); // another sanity check
            },

            // handle a non-successful response
            error: function (xhr, errmsg, err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }

    // Acceleration Sensor
    let button_counter_accel = 0;
    let buttonpressed_accel;
    let interval_var_accel;
    $('.submitbutton_accel,.submitbutton_all').click(function () {
        buttonpressed_accel = $(this).attr('name')
    });
    $('#AccelerationForm,#AllSensorsForm').on('submit', function (event) {
        event.preventDefault();
        if (buttonpressed_accel == "Continuous" && button_counter_accel != 1) {
            console.log("Continuous Submission enabled for Acceleration panel.");
            create_post_accel();
            button_counter_accel = 1;
            interval_var_accel = setInterval(create_post_accel, 2000);
            setTimeout(clear_interval_accel, timeOut);
        } else if (buttonpressed_accel == "Once") {
            console.log("Acceleration Submit Once button was pressed.");
            if (interval_var_accel) {
                clearInterval(interval_var_accel);
                button_counter_accel = 0;
            }
            create_post_accel();
        } else if (buttonpressed_accel == "Stop") {
            console.log("Stopping continuous submission for Acceleration panel.");
            if (interval_var_accel) {
                clearInterval(interval_var_accel);
                button_counter_accel = 0;
            }
        }
    });

    function create_post_accel() {
        console.log("Entered create_post_accel() accel function.");
        let dateTime_accel = getDateTimenow();
        $.ajax({
            url: "", // the endpoint
            type: "POST", // http method
            data: {
                acceleration_x: $('#post-acceleration-X').val(),
                acceleration_y: $('#post-acceleration-Y').val(),
                acceleration_z: $('#post-acceleration-Z').val(),
                created_at_accel: dateTime_accel
            }, // data sent with the post request
            // handle a successful response
            success: function () {
                let acceleration_x = parseFloat($('#post-acceleration-X').val());
                let acceleration_y = parseFloat($('#post-acceleration-Y').val());
                let acceleration_z = parseFloat($('#post-acceleration-Z').val());

                $('#post-created-at_accel').val(dateTime_accel);
                $('#post-acceleration-X').val(roundOffAndParse(acceleration_x + getRandomNumber(-5, 5)));
                $('#post-acceleration-Y').val(roundOffAndParse(acceleration_y + getRandomNumber(-5, 5)));
                $('#post-acceleration-Z').val(roundOffAndParse(acceleration_z + getRandomNumber(-5, 5)));
                console.log("POSTing was successful for acceleration"); // another sanity check
            },

            // handle a non-successful response
            error: function (xhr, errmsg, err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }

    function clear_interval_accel() {
        if (interval_var_accel) {
            clearInterval(interval_var_accel);
            button_counter_accel = 0;
        }
    }

    // WheelSpeed Sensor
    let button_counter_ws = 0;
    let buttonpressed_ws;
    let interval_var_ws;
    $('.submitbutton_ws,.submitbutton_all').click(function () {
        buttonpressed_ws = $(this).attr('name')
    });
    $('#WheelSpeedForm,#AllSensorsForm').on('submit', function (event) {
        event.preventDefault();
        if (buttonpressed_ws == "Continuous" && button_counter_ws != 1) {
            console.log("Continuous Submission enabled for Wheel Speed panel");
            create_post_ws();
            button_counter_ws = 1;
            interval_var_ws = setInterval(create_post_ws, 2000);
            setTimeout(clear_interval_ws, timeOut);
        } else if (buttonpressed_ws == "Once") {
            console.log("Wheel Speed Submit Once button was pressed.");
            if (interval_var_ws) {
                clearInterval(interval_var_ws);
                button_counter_ws = 0;
            }
            create_post_ws();
        } else if (buttonpressed_ws == "Stop") {
            console.log("Stopping continuous submission for Wheel Speed panel.");
            if (interval_var_ws) {
                clearInterval(interval_var_ws);
                button_counter_ws = 0;
            }
        }
    });

    function create_post_ws() {
        console.log("Entered create_post_ws() WS function.");
        let dateTime_ws = getDateTimenow();
        $.ajax({
            url: "", // the endpoint
            type: "POST", // http method
            data: {
                created_at_ws: dateTime_ws,
                wheel_speed_fr: $('#post-wheel-speed-fr').val(),
                wheel_speed_fl: $('#post-wheel-speed-fl').val(),
                wheel_speed_br: $('#post-wheel-speed-br').val(),
                wheel_speed_bl: $('#post-wheel-speed-bl').val(),
            }, // data sent with the post request
            // handle a successful response
            success: function () {
                let wheel_speed_fr = parseFloat($('#post-wheel-speed-fr').val());
                let wheel_speed_fl = parseFloat($('#post-wheel-speed-fl').val());
                let wheel_speed_br = parseFloat($('#post-wheel-speed-br').val());
                let wheel_speed_bl = parseFloat($('#post-wheel-speed-bl').val());
                $('#post-created-at_ws').val(dateTime_ws);
                $('#post-wheel-speed-fr').val(getNextValue(wheel_speed_fr, -5, 5));
                $('#post-wheel-speed-fl').val(getNextValue(wheel_speed_fl, -5, 5));
                $('#post-wheel-speed-br').val(getNextValue(wheel_speed_br, -5, 5));
                $('#post-wheel-speed-bl').val(getNextValue(wheel_speed_bl, -5, 5));
                console.log("POSTing was successful for WS"); // another sanity check
            },

            // handle a non-successful response
            error: function (xhr, errmsg, err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }

    function clear_interval_ws() {
        if (interval_var_ws) {
            clearInterval(interval_var_ws);
            button_counter_ws = 0;
        }
    }

    // Suspension Sensor
    let button_counter_ss = 0;
    let buttonpressed_ss;
    let interval_var_ss;
    $('.submitbutton_ss,.submitbutton_all').click(function () {
        buttonpressed_ss = $(this).attr('name')
    });
    $('#SuspensionForm,#AllSensorsForm').on('submit', function (event) {
        event.preventDefault();
        if (buttonpressed_ss == "Continuous" && button_counter_ss != 1) {
            console.log("Continuous Submission enabled for Suspension panel");
            create_post_ss();
            button_counter_ss = 1;
            interval_var_ss = setInterval(create_post_ss, 2000);
            setTimeout(clear_interval_ss, timeOut);
        } else if (buttonpressed_ss == "Once") {
            console.log("Suspension Submit Once button was pressed.");
            if (interval_var_ss) {
                clearInterval(interval_var_ss);
                button_counter_ss = 0;
            }
            create_post_ss();
        } else if (buttonpressed_ss == "Stop") {
            console.log("Stopping continuous submission for Suspension panel.");
            if (interval_var_ss) {
                clearInterval(interval_var_ss);
                button_counter_ss = 0;
            }
        }
    });

    function create_post_ss() {
        console.log("Entered create_post_ss() Suspension function.");
        let dateTime_ss = getDateTimenow();
        $.ajax({
            url: "", // the endpoint
            type: "POST", // http method
            data: {
                created_at_ss: dateTime_ss,
                suspension_fr: $('#post-suspension-fr').val(),
                suspension_fl: $('#post-suspension-fl').val(),
                suspension_br: $('#post-suspension-br').val(),
                suspension_bl: $('#post-suspension-bl').val()
            }, // data sent with the post request
            // handle a successful response
            success: function () {
                let suspension_fr = parseFloat($('#post-suspension-fr').val());
                let suspension_fl = parseFloat($('#post-suspension-fl').val());
                let suspension_br = parseFloat($('#post-suspension-br').val());
                let suspension_bl = parseFloat($('#post-suspension-bl').val());
                $('#post-created-at_ss').val(dateTime_ss);
                $('#post-suspension-fr').val(getNextValue(suspension_fr, -5, 5));
                $('#post-suspension-fl').val(getNextValue(suspension_fl, -5, 5));
                $('#post-suspension-br').val(getNextValue(suspension_br, -5, 5));
                $('#post-suspension-bl').val(getNextValue(suspension_bl, -5, 5));
                console.log("POSTing was successful for ss"); // another sanity check
            },

            // handle a non-successful response
            error: function (xhr, errmsg, err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }

    function clear_interval_ss() {
        if (interval_var_ss) {
            clearInterval(interval_var_ss);
            button_counter_ss = 0;
        }
    }

    // Fuel Level Sensor
    let button_counter_fl = 0;
    let buttonpressed_fl;
    let interval_var_fl;
    $('.submitbutton_fl,.submitbutton_all').click(function () {
        buttonpressed_fl = $(this).attr('name')
    });
    $('#FuelLevelForm,#AllSensorsForm').on('submit', function (event) {
        event.preventDefault();
        if (buttonpressed_fl == "Continuous" && button_counter_fl != 1) {
            console.log("Continuous Submission enabled for Fuel Level panel");
            create_post_fl();
            button_counter_fl = 1;
            interval_var_fl = setInterval(create_post_fl, 2000);
            setTimeout(clear_interval_fl, timeOut);
        } else if (buttonpressed_fl == "Once") {
            console.log("Fuel Level Submit Once button was pressed.");
            if (interval_var_fl) {
                clearInterval(interval_var_fl);
                button_counter_fl = 0;
            }
            create_post_fl();
        } else if (buttonpressed_fl == "Stop") {
            console.log("Stopping continuous submission for Fuel Level panel.");
            if (interval_var_fl) {
                clearInterval(interval_var_fl);
                button_counter_fl = 0;
            }
        }
    });

    function create_post_fl() {
        console.log("Entered create_post_fl() fl function.");
        let dateTime_fl = getDateTimenow();
        $.ajax({
            url: "", // the endpoint
            type: "POST", // http method
            data: {
                created_at_fl: dateTime_fl,
                current_fuel_level: $('#post-current-fuel-level').val(),
            }, // data sent with the post request
            // handle a successful response
            success: function () {
                let current_fuel_level = parseFloat($('#post-current-fuel-level').val());
                if (current_fuel_level <= 10) {
                    current_fuel_level += 90;
                } else {
                    current_fuel_level -= getRandomNumber(0, 5);
                }
                $('#post-created-at_fl').val(dateTime_fl);
                $('#post-current-fuel-level').val(roundOffAndParse(current_fuel_level));

                console.log("POSTing was successful for FL"); // another sanity check
            },

            // handle a non-successful response
            error: function (xhr, errmsg, err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }

    function clear_interval_fl() {
        if (interval_var_fl) {
            clearInterval(interval_var_fl);
            button_counter_fl = 0;
        }
    }

    // This function returns current date time in the format "yyyy-mm-dd hh:min:ss"
    function getDateTimenow() {
        var now = new Date();
        var yyyy = now.getFullYear();
        var mm = ("0" + (now.getMonth() + 1)).slice(-2);
        var dd = ("0" + now.getDate()).slice(-2);
        var hours = ("0" + now.getHours()).slice(-2);
        var minutes = ("0" + now.getMinutes()).slice(-2);
        var seconds = ("0" + now.getSeconds()).slice(-2);
        var curr_date = yyyy + '-' + mm + '-' + dd;
        var curr_time = hours + ':' + minutes + ':' + seconds;
        return curr_date + " " + curr_time;
    }

    // This function returns next sensor value, also makes sure that the value is in between 0 and 100
    function getNextValue(sensorValue, min, max) {
        let nextSensorValue;
        let MAX_VALUE = 100;
        let MIN_VALUE = 0;
        if ((sensorValue - MIN_VALUE) < Math.abs(min)) {
            max = max - min;
            min = 0;
        } else if ((MAX_VALUE - sensorValue) < Math.abs(max)) {
            max = 0;
        }
        nextSensorValue = sensorValue + getRandomNumber(min, max);
        return roundOffAndParse(nextSensorValue);
    }

    //This function returns random number between min(inclusive) and max(exclusive)
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function roundOffAndParse(nextSensorValue) {
        let rounded = nextSensorValue.toFixed(2);
        return parseFloat(rounded);
    }

    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
});

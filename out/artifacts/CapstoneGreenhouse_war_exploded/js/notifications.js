$(document).ready( function() {

    // Contacts functions
    getContacts();

    // Get error message
    getErrorMessages();

    // Get notification settings
    getNotificationSettings();

    // Check if browser is Raspberry Pi
    if ( navigator.platform.toLowerCase().indexOf('linux') >= 0 ) {
        $('#nav-list').addClass('nav-small');
        $('#nav-list').html('<ul><a href="/settings"><li class="nav-active"><img width="40" height="40" src="images/gear.png"><span class="nav-item" style="letter-spacing: 1.5px;">SETTINGS</span></li></a><a href="sensors.html"><li class="nav-li"><img width="35" height="35" src="images/sensors.png"><span class="nav-item">SENSORS</span></li></a><a href="history.html"><li class="nav-li"><img width="35" height="35" src="images/history.png"><span class="nav-item">HISTORY</span></li></a></ul>');

    } else {
        $('#nav-list').addClass('nav');
        $('#nav-list').html('<ul><a href="index.html"><li class="nav-li"><img width="40" height="40" src="images/home.png"><span class="nav-item">HOME</span></li></a><a href="#"><li class="nav-active"><img width="40" height="40" src="images/gear.png"><span class="nav-item" style="letter-spacing: 1.5px;">SETTINGS</span></li></a><a href="sensors.html"><li class="nav-li"><img width="35" height="35" src="images/sensors.png"><span class="nav-item">SENSORS</span></li></a><a href="history.html"><li class="nav-li"><img width="35" height="35" src="images/history.png"><span class="nav-item">HISTORY</span></li></a><a href="/documentation"><li class="nav-li"><img style="margin-top:22px;" width="40" height="30" src="images/learn.png"><span class="nav-item">LEARN</span></li></a></ul>');
    }

});

window.setInterval( function() {
    // Get error message
    getErrorMessages();

}, 3000 );

function getContacts() {

    $.ajax({
        type: 'GET',
        url: '/api/contacts',
        success: function (response) {
            var data = JSON.parse(response);

            // Add contacts to table
            var table = document.getElementById('contact-table-body');
            table.innerHTML = "";

            for( var i=0; i<data.length; i++ ) {
                var row = table.insertRow(i);

                var col1 = row.insertCell(0);
                col1.innerHTML = data[i].name;

                var col2 = row.insertCell(1);
                col2.innerHTML = data[i].position;

                var col3 = row.insertCell(2);
                col3.innerHTML = data[i].email;

                var col4 = row.insertCell(3);
                col4.innerHTML = data[i].phone;
            }
        }
    });
}

// Close schedule modal
$(document).on('click', '#contact-submit', function() {
    addContact();
});

function addContact() {
    console.log("Add Contact");
    $.ajax({
        type: 'POST',
        url: '/api/contacts',
        data: $('#contact-form').serialize(),
        success: function() {
            getContacts();
            $('#contact-form')[0].reset();
        }
    });
}

// Get all error messages
function getErrorMessages() {

    $.ajax({
        type: 'GET',
        url: 'api/error',
        success: function(response) {
            var data = JSON.parse(response);

            // Add errors to table
            var table = document.getElementById('error-table-body');
            table.innerHTML = "";

            for( var i=data.length-12; i<data.length; i++ ) {
                var row = table.insertRow(0);

                var col1 = row.insertCell(0);
                col1.innerHTML = data[i].message;

                var col2 = row.insertCell(1);
                col2.innerHTML = data[i].time;

            }
        }
    });
}

// Get notification settings
function getNotificationSettings() {
    $.ajax({
        type: 'GET',
        url: 'api/notifications',
        success: function(response) {
            var data = JSON.parse(response);

            if( data.tempNotify == 1 ) {
                $('#temperature').prop('checked', true);
            }

            if( data.soilNotify == 1 ) {
                $('#soil-moisture').prop('checked', true);
            }

            // Set limits
            $('#temperature-below').val(data.tempLow);
            $('#temperature-above').val(data.tempHigh);
            $('#soil-below').val(data.soilLow);
            $('#soil-above').val(data.soilHigh);
        }
    });
}

$(document).on('click', '#temperature', function() {
    setNotificationSettings();
});

$(document).on('click', '#soil-moisture', function() {
    setNotificationSettings();
})

$(document).on('click', '.settings-input', function() {
    setNotificationSettings();
})

// Set notification settings
function setNotificationSettings() {
    var data = {};

    // Convert from on/off to 1/0
    if( $('#temperature').is(':checked') ) {
        data.tempNotify = 1;
    } else {
        data.tempNotify = 0;
    }

    if( $('#soil-moisture').is(':checked') ) {
        data.soilNotify = 1;
    } else {
        data.soilNotify = 0;
    }

    data.tempHigh = $('#temperature-above').val();
    data.tempLow = $('#temperature-below').val();
    data.soilHigh = $('#soil-above').val();
    data.soilLow = $('#soil-below').val();

    $.ajax({
        type: 'POST',
        url: '/api/notifications',
        data: data,
        success: function() {

        }
    })
}

// Submit error message
$(document).on('click', '#error-submit', function() {

    $.ajax({
        type: 'POST',
        url: '/api/error',
        data: { apikey: '44ffe28b-f470-4bc0-8ee9-38fce01438ce', message: $('#set-error-message').val(), code: $('#set-error-code').val() },
        success: function() {
            getErrorMessage();
        }
    })
});


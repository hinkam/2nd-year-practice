function main() {
    $(window).keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    const imageID = /[a-z0-9]{16}/.exec(window.location.href)[0];

    $.ajax({
        type: 'GET',
        url: '/api/image/check',
        data: {
            imageID
        },
        success: (serverData) => {
            if (serverData.isAccessable) {
                document.cookie = `time=${new Date()}`;
                document.cookie = `accessPath=${window.location.href}`;
                showPwModal(imageID);
            } else {
                $('#error-modal').modal('show');
                $('#error-button').click(() => {
                    window.location = 'http://localhost:8080'; // Hardcode. Too bad!
                });
            }
        }
    });
}

function showPwModal(imageID) {
    $('#password-modal').modal('show');
    $('#enter-button').click(() => {
        $('#imageID').val(imageID);
        let $form = $('#password-form');
        $.ajax({
            type: 'GET',
            url: '/api/image/get',
            data: $form.serialize(),
            success: (serverData) => {
                if (serverData.isCorrectPassword) {
                    $('#password-modal').modal('hide');
                    renderImage(serverData.image64);
                    $('#access-count').text(`Access count: ${serverData.accessCount}`);
                } else {
                    $('#modal-title').text('Incorrect password! Try again');
                }
            }
        });
    });
}

function renderImage(base64) {
    $('#user-image').attr('src', `data:image/png;base64, ${base64}`);
}

$(document).ready(main);

function main(){
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
    $('#upload-button').click(() => {
        let $form = $('#main-form');
        $.ajax({
            type: 'POST',
            url: '/api/image/create',
            data: $form.serialize(),
            success: (serverData) => {
                let link = `http://localhost:8080/image/${serverData.imageID}`;
                $('#image-link').attr('href', link);
                $('#image-password').text(`Your password: ${serverData.imagePw}`);
                $('#upload-result').modal('show');
            }
        });
    });
}

$(document).ready(main);

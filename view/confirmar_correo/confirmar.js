$(document).ready(function() {
    //TODO: Obtiene el id que está en la URL
    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const confirmar = params.get("id");
    const decoded_id = decodeURIComponent(confirmar);
    const id = decoded_id.replace(/\s/g, '+');

    console.log(id);

    //TODO: Hace una peticion a la operacion CASE "activar"
    $.post("../../controller/usuario.php?op=activar", {usu_id : id},
        function (data, textStatus, jqXHR) {
            
        },
        "dataType"
    );
});
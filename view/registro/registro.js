//TODO: Funcion principal que inicializa los eventos del formulario
function init() {
    //TODO: Detecta el envio del formulario y llama a la funcion registrar
    $("#mnt_form").on("submit", function(e){
        registrar(e);
    });
}

function validateEmail() {
    var email = $("#usu_correo").val();
    var isValid = validator.isEmail(email);
    displayErrorMessage("#usu_correo", isValid, "Ingrese Correo Electrónico");

    return isValid;
}

function displayErrorMessage(fieldSelector, isValid, message) {
    var errorField = $(fieldSelector).next(".validation-error");
    errorField.text(isValid ? "" : message);
    errorField.toggleClass("text-danger", !isValid);
}

//TODO: Funcion que envia los datos del formulario mediante AJAX
function registrar(e) {
    //TODO: Evita que el formulario se envie de forma tradicional
    e.preventDefault();

    //TODO: Obtiene todos los datos del formulario
    var formData = new FormData($("#mnt_form")[0]);

    //TODO: Envia los datos al controlador utilizando una peticion AJAX
    $.ajax({
        //TODO: Ruta del controlador y operacion a ejecutar
        url: "../../controller/usuario.php?op=registrar",

        //TODO: Metodo HTTP utilizado para enviar los datos
        type: "POST",

        //TODO: Datos del formulario que se enviaran al servidor
        data: formData,

        //TODO: Permite enviar FormData sin modificar el tipo de contenido
        contentType: false,

        //TODO: Evita que jQuery procese automaticamente los datos
        processData: false,

        //TODO: Se ejecuta cuando el servidor responde correctamente
        success: function (datos){
            console.log("Guardado " + datos);
        },
    });
}

//TODO: Ejecuta la inicializacion del formulario
init();

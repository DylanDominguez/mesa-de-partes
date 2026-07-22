//TODO: Funcion principal que inicializa los eventos del formulario
function init() {
    //TODO: Escucha el evento "submit" del formulario
    $("#mnt_form").on("submit", function(e){
        
        //TODO: Evita que se envíe automáticamente
        e.preventDefault();

        //TODO: Validar el formulario antes de enviarlo
        if (isFormValid()) {
            registrar(e);
        }else{
            displayValidationMessages();
        }
    });
}

function isFormValid() {
    //TODO: Usa Validator.js para validar cada campo del formulario
    return validateEmail() && validateText("usu_nomape") && validatePassword() && validatePasswordMatch();
}

function validateEmail() {
    var email = $("#usu_correo").val();
    var isValid = validator.isEmail(email);
    //TODO: Muestra un mensaje de error si la validacion no es exitosa
    displayErrorMessage("#usu_correo", isValid, "Ingrese Correo Electrónico");

    return isValid;
}

function validateText(fieldId) {
    var value = $("#" + fieldId).val();
    var isValid = validator.isLength(value,{min:1});
    displayErrorMessage("#" + fieldId, isValid, "Este campo es obligatorio");

    return isValid;
}

function validatePassword() {
    var password = $("#usu_pass").val();
    var isValid = validator.isLength(password,{min:8});
    displayErrorMessage("#usu_pass", isValid, "La contraseña debe tener al menos 8 caracteres");

    return isValid;
}

function validatePasswordMatch() {
    var password = $("#usu_pass").val();
    var confirmPassword = $("#usu_pass_confir").val();
    var isValid = validator.equals(password, confirmPassword);
    displayErrorMessage("#usu_pass_confir", isValid, "Las contraseñas no coinciden.");

    return isValid;
}

function displayErrorMessage(fieldSelector, isValid, message) {
    //TODO: Busca el elemento de mensaje de error y actualiza su contenido
    var errorField = $(fieldSelector).next(".validation-error");
    errorField.text(isValid ? "" : message);
    errorField.toggleClass("text-danger", !isValid);
}

function displayValidationMessages() {
    //TODO: Muestra los mensajes de error cerca de los campos del formulario
    validateEmail();
    validateText("usu_nomape");
    validatePassword();
    validatePasswordMatch();
}

//TODO: Funcion que envia los datos del formulario mediante AJAX
function registrar() {
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

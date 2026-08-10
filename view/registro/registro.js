//TODO: Se declara la variable global timerInterval para utilizarla en el Timer cuando se registre correctamente un usuario
var timerInterval;

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
    //TODO: Validar el input de correo electronico
    var email = $("#usu_correo").val();
    var isValid = validator.isEmail(email);
    //TODO: Muestra un mensaje de error si la validacion no es exitosa
    displayErrorMessage("#usu_correo", isValid, "Ingrese Correo Electrónico");

    return isValid;
}

function validateText(fieldId) {
    //TODO: Validar cualquier input pero como parametro se coloca el input de nombres y apellidos
    var value = $("#" + fieldId).val();
    var isValid = validator.isLength(value,{min:1});
    displayErrorMessage("#" + fieldId, isValid, "Este campo es obligatorio");

    return isValid;
}

function validatePassword() {
    //TODO: Validar el input de contraseña
    var password = $("#usu_pass").val();
    var isValid = validator.isLength(password,{min:8});
    displayErrorMessage("#usu_pass", isValid, "La contraseña debe tener al menos 8 caracteres");

    return isValid;
}

function validatePasswordMatch() {
    //TODO: Validar si el input de confirmar la contraseña coincide con la contraseña ingresada
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
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        //TODO: Se ejecuta cuando el servidor responde correctamente
        success: function (datos){
            //TODO: Muestra las ventanas emergentes cuando se registra una cuenta
            if (datos == 1) {
                Swal.fire({
                    title: "Registro",
                    text: "Se registró correctamente. Por favor iniciar sesión. Redireccionando en 5 segundos",
                    icon: "success",
                    confirmButtonColor: "#5156be",
                    timer: 5000,
                    timerProgressBar: true,
                    //TODO: Salta un temporizador despues del registro exitoso
                    didOpen: function() {
                        Swal.showLoading();

                        timerInterval = setInterval(function () {
                            var content = Swal.getHtmlContainer();
                            if (!content) return;
                            var countdownElement = content.querySelector("b");
                            if (countdownElement) {
                                countdownElement.textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
                            }
                        }, 100);
                    },
                    //TODO: Al terminar el temporizador nos regirige al login
                    didClose: function() {
                        clearInterval(timerInterval);
                        window.location.href = "../../index.php";
                    },
                }).then(function(result){
                    if (result.dismiss === Swal.DismissReason.timer) {
                       /* console.log(""); */ 
                    }
                });
            }else if (datos == 0) {
                Swal.fire({
                    title: "Registro",
                    text: "El correro electrónico ya existe.",
                    icon: "error",
                    confirmButtonColor: "#5156be",
                });
            }
            /* console.log(datos); */
        },
    });
}

//TODO: Ejecuta la inicializacion del formulario
init();

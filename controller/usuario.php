<?php
    //TODO: Incluye el archivo de configuracion de la conexion de la BD y la clase Usuario
    require_once("./config/conexion.php");
    require_once("./model/Usuario.php");

    //TODO: Crea una instancia de la clase Usuario
    $usuario = new Usuario();

    //TODO: utiliza una estructura switch para determinar la operacion a realizar segun el valor de $_GET["op"]
    switch ($_GET["op"]) {

        //TODO: si la operacion es registrar
        case "registrar":
            //TODO: Llama al metodo registrar_usuario de la instancia $usuario con los datos del formulario 
            $usuario->registrar_usuario($_POST["usu_nomape"], $_POST["usu_correo"], $_POST["usu_pass"]);
            break;

    }
?>
<?php
//TODO: incluir los archivos pertinentes
require '../include/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once("../config/conexion.php");
require_once("../model/Usuario.php");

class Email extends PHPMailer{
    protected $gCorreo = "dylandomperez1802@gmail.com";
    protected $gContrasenia = "emzfeavsqllguaew";

    //TODO: Para poder encriptar el id del usuario
    private $key = "MesaDePartesDylanDev";
    private $cipher = "aes-256-cbc";


    //TODO: funcion para que llegue un mensaje al correo ingresado en el formulario de registro
    public function registrar($usu_id){
        //TODO: se llama a la clase Conectar para usar su metodo ruta()
        $conexion = new Conectar();

        $usuario = new Usuario();
        $datos = $usuario -> get_usuario_id($usu_id);

        //TODO: Proceso de encriptado de id del usuario
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->cipher));
        $cifrado = openssl_encrypt($usu_id, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv);
        $textoCifrado = base64_encode($iv . $cifrado);

        $this->isSMTP();
        $this->Host = "smtp.gmail.com";
        $this->Port = 587;
        $this->SMTPAuth = true;
        $this->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        $this->Username = $this->gCorreo;
        $this->Password = $this->gContrasenia;
        $this->setFrom($this->gCorreo, "Registro en Mesa de Partes DylanDev");

        $this->CharSet = "UTF-8";
        $this->addAddress($datos[0]["usu_correo"]);
        $this->isHTML(true);
        $this->Subject = "Mesa de Partes";

        //TODO: Cuando se confirma el email, te redirige al sistema con el link concatenado al id cifrado del usuario
        $url = $conexion->ruta() . "view/confirmar_correo/?id=" . $textoCifrado;

        //TODO: El mensaje que va a llegar al correo es un archivo html
        $cuerpo = file_get_contents("../assets/email/registrar.html");
        //TODO: esa variable xlinkcorreourl viene del archivo: assets/email/registrar.html
        //TODO: Sirve para que redirija a la pantalla de correo confirmado
        $cuerpo = str_replace("xlinkcorreourl", $url, $cuerpo);

        $this->Body = $cuerpo;
        $this->AltBody = strip_tags("Confirmar Registro");

        try {
            $this->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
?>
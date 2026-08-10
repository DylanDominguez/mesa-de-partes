<?php
    //TODO: Creacion de la clase Usuario que hereda de Conectar
    class Usuario extends Conectar{
        private $key = "MesaDePartesDylanDev";
        private $cipher = "aes-256-cbc";
        //TODO: funcion para registrar un nuevo usuario en la BD
        public function registrar_usuario($usu_nomape, $usu_correo, $usu_pass){
            $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->cipher));
            $cifrado = openssl_encrypt($usu_pass, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv);
            $textoCifrado = base64_encode($iv . $cifrado);

            //TODO: devuelve la conexion a la BD utilizando la clase padre
            $conectar = parent::conexion();
            parent::set_names();
            $sql = "
            INSERT INTO `tm_usuario`(`usu_nomape`, `usu_correo`, `usu_pass`) 
            VALUES (?,?,?)
            ";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $usu_nomape);
            $sql->bindValue(2, $usu_correo);
            $sql->bindValue(3, $textoCifrado);

            //TODO: Ejecutar la consulta SQL
            $sql->execute();

            //TODO: Para que retorne el id del ultimo usuario en la BD
            $sql1 = "select last_insert_id() as 'usu_id'";
            $sql1 = $conectar->prepare($sql1);
            $sql1->execute();
            return $sql1->fetchAll();
        }

        public function get_usuario_correo($usu_correo){
            //TODO: devuelve la conexion a la BD utilizando la clase padre
            $conectar = parent::conexion();
            parent::set_names();
            $sql = "
            SELECT * FROM `tm_usuario` 
            WHERE usu_correo = ?
            ";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $usu_correo);

            //TODO: Ejecutar la consulta SQL
            $sql->execute();
            return $sql->fetchAll();
        }

        public function get_usuario_id($usu_id){
            //TODO: devuelve la conexion a la BD utilizando la clase padre
            $conectar = parent::conexion();
            parent::set_names();
            $sql = "
            SELECT * FROM `tm_usuario` 
            WHERE usu_id = ?
            ";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $usu_id);

            //TODO: Ejecutar la consulta SQL
            $sql->execute();
            return $sql->fetchAll();
        }

        public function activar_usuario($usu_id){
            $iv_dec = substr(base64_decode($usu_id), 0, openssl_cipher_iv_length($this->cipher));
            $cifradoSinIV = substr(base64_decode($usu_id), openssl_cipher_iv_length($this->cipher));
            $textoDecifrado = openssl_decrypt($cifradoSinIV, $this->cipher, $this->key, OPENSSL_RAW_DATA, $iv_dec);
            //TODO: devuelve la conexion a la BD utilizando la clase padre
            $conectar = parent::conexion();
            parent::set_names();
            $sql = "
            UPDATE `tm_usuario`
            SET 
                est=1,
                fech_acti = NOW()
            WHERE 
                usu_id = ?
            ";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $textoDecifrado);

            //TODO: Ejecutar la consulta SQL
            $sql->execute();
        }
    }
?>
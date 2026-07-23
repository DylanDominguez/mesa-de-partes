<?php
    //TODO: Creacion de la clase Usuario que hereda de Conectar
    class Usuario extends Conectar{
        //TODO: funcion para registrar un nuevo usuario en la BD
        public function registrar_usuario($usu_nomape, $usu_correo, $usu_pass){
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
            $sql->bindValue(3, $usu_pass);

            //TODO: Ejecutar la consulta SQL
            $sql->execute();
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
    }
?>
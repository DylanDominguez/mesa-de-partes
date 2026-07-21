<?php
    //TODO: Inicia la sesion(si no esta iniciada)
    session_start();
    
    //TODO: Definicion de la clase Conectar
    class Conectar{
        //TODO: Propiedad protegida para almacenar la conexion a la BD
        protected $dbh;
        //TODO: Metodo para establecer la conexion a la BD
        protected function conexion(){
            try {
                //TODO: Intenta establecer la conexion utilizando PDO
                $conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=mesadepartes","root","");
                return $conectar;
            } catch (Exception $e) {
                //TODO: En caso de Error imprime un mensaje y termina el script
                print "Error BD" . $e->getMessage() . "<br>";
                die();
            }
        }

        //TODO: Metodo para establecer el juego de caracteres a UTF-8
        public function set_names(){
            return $this->dbh->query("SET NAMES 'utf8' ");
        }

        //TODO: Metodo que devuelve la ruta base del proyecto
        public static function ruta() {
            return "http://localhost/Mesa_De_Partes/";
        }
    }
?>
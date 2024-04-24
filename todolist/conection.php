<?php

class Connection
{

    // Funcion para conectar la base de datos
    public function conectar()
    {

        $connectionInfo = array(
            "host" => 'host.docker.internal',
            "port" => '3306',
            "username" => 'root',
            "password" => 'muratayaL1',
            "database" => 'listas',
        );
  
        //imprimir las variables de entorno
        try {
            $conn = new PDO("mysql:host={$connectionInfo['host']};port={$connectionInfo['port']};dbname={$connectionInfo['database']}", $connectionInfo['username'], $connectionInfo['password']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }

}
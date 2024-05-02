<?php

class Connection
{
    private $conn;

    // Función para conectar a la base de datos
    public function conectar()
    {
        $connectionInfo = array(
            "host" => 'host.docker.internal',
            "port" => '3306',
            "username" => 'root',
            "password" => 'muratayaL1',
            "database" => 'listas',
        );

        try {
            $this->conn = new PDO("mysql:host={$connectionInfo['host']};port={$connectionInfo['port']};dbname={$connectionInfo['database']}", $connectionInfo['username'], $connectionInfo['password']);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return true; // La conexión fue exitosa
        } catch (PDOException $e) {
            // Error en la conexión
            // Puedes imprimir el mensaje de error para depuración
            // o manejarlo de alguna otra manera (por ejemplo, registrar el error)
            // echo $e->getMessage();
            return false;
        }
    }

    // Función para consultar datos de la tabla usuarios
    public function consultarUsuarios()
    {
        try {
            // Preparar la consulta
            $stmt = $this->conn->prepare("SELECT * FROM usuarios");
            // Ejecutar la consulta
            $stmt->execute();
            // Obtener y retornar los resultados
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            // Manejar errores en la consulta (si es necesario)
            // Por ejemplo, puedes imprimir el mensaje de error o registrar el error en un archivo de registro
            // echo $e->getMessage();
            return false;
        }
    }
}

// Uso de la clase Connection
$connection = new Connection();
if ($connection->conectar()) {
    // Si la conexión es exitosa, se puede consultar la tabla usuarios
    $usuarios = $connection->consultarUsuarios();
    if ($usuarios !== false) {
        // Imprimir los resultados (por ejemplo)
        foreach ($usuarios as $usuario) {
            echo "ID: " . $usuario['id'] . ", Correo: " . $usuario['correo'] . ", Contrasena: " . $usuario['contrasena'] . "<br>";
        }
    } else {
        echo "Error al consultar la tabla usuarios.";
    }
} else {
    echo "Error en la conexión.";
}

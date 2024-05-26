<?php
include ("conn.php");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    // Hashear la contraseña
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Preparar la consulta SQL para insertar el usuario
    $sql = $conn->prepare("INSERT INTO users (username, passwordHash) VALUES (?, ?)");
    $sql->bind_param("ss", $username, $passwordHash);

    // Ejecutar la consulta
    if ($sql->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $sql->error]);
    }

} 


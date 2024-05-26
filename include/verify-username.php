<?php 
include ("conn.php");

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->user)) {
    $user = $data->user;

    //preparar la consulta SQL para verificar el nombre de usuario 
    $sql = $conn->prepare("SELECT COUNT(*) as count FROM users WHERE username = ?");
    $sql->bind_param("s", $user);
    $sql->execute();
    $result = $sql->get_result();
    $row = $result->fetch_assoc();

    // verificar si el nombre de usuario está ocupado
    if ($row['count'] > 0) {
        $response = array('occupied' => true);
    } else {
        $response = array('occupied' => false);
    }

    // Devolver la respuesta en formato JSON
    echo json_encode($response);

} 

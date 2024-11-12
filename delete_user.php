
<?php
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id'])) {
    $user_id = intval($_POST['id']);
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $user_id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Utilizator șters cu succes.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Eroare la ștergerea utilizatorului.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Cerere invalidă.']);
}
?>
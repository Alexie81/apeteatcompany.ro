<?php
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id'])) {
    $product_id = intval($_POST['id']);
    $sql = "DELETE FROM products WHERE id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $product_id);

    if ($stmt->execute()) {
        echo "Produs șters cu succes!";
    } else {
        echo "Eroare la ștergerea produsului: " . $con->error;
    }
}
?>
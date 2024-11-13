<?php
// Verifică dacă cererea este de tip POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['date'])) {
        // Decodifică datele JSON
        $dates = json_decode($_POST['date'], true);

        if (is_array($dates)) {
            // Codifică datele ca parametri URL
            $dateParams = urlencode(implode(",", $dates));

            // Redirecționează către order.php cu datele în URL
            header("Location: order.php?dates=$dateParams");
            exit;
        } else {
            echo "Datele nu sunt un array valid.";
        }
    } else {
        echo "Data nu a fost transmisă corect!";
    }
} else {
    echo "Cererea nu este de tip POST!";
}
?>
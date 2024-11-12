<?php
require_once('config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $adresa = $_POST['adresa'];
    $observatii = $_POST['observatii'];

    // Pregătim interogarea pentru a adăuga un nou utilizator
    $sql = "INSERT INTO users (user, pass, adresa, observatii) VALUES (?, ?, ?, ?)";
    $stmt = $con->prepare($sql);
    
    // Leagă parametrii: primele două sunt stringuri (VARCHAR), iar următoarele două sunt de asemenea stringuri
    $stmt->bind_param("ssss", $user, $pass, $adresa, $observatii);

    // Executăm interogarea și verificăm dacă a fost reușită
    if ($stmt->execute()) {
        header('Location: admin.php');
    } else {
        echo "Eroare la adăugarea utilizatorului: " . $con->error;
    }
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Adăugare Utilizator</title>
</head>
<body>
    <h2>Adăugare Utilizator Nou</h2>
    <form method="POST" action="add_user.php">
        <label>Utilizator:</label>
        <input type="text" name="user" required><br>

        <label>Parolă:</label>
        <input type="text" name="pass" required><br>

        <label>Adresă:</label>
        <input type="text" name="adresa"><br>

        <label>Observații:</label>
        <input type="text" name="observatii"><br>

        <button type="submit">Adaugă Utilizator</button>
        <button type="button" onclick="window.location.href='admin.php'">Inapoi</button>
    </form>
    <script src="js/logged.js"></script>
<script>
    admin();
    </script>
</body>
</html>

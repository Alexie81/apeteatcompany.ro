<?php
require_once('config.php');

if (isset($_GET['id'])) {
    $user_id = intval($_GET['id']);
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
    } else {
        echo "Utilizatorul nu a fost găsit.";
        exit;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id'])) {
    $user_id = intval($_POST['id']);
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $adresa = $_POST['adresa'];
    $observatii = $_POST['observatii'];

    // Interogare actualizată pentru a include toate coloanele corect
    $sql = "UPDATE users SET user = ?, pass = ?, adresa = ?, observatii = ? WHERE id = ?";
    $stmt = $con->prepare($sql);

    // Leagă corect variabilele în funcție de tipurile lor (toate sunt stringuri, iar `id` este integer)
    $stmt->bind_param("ssssi", $user, $pass, $adresa, $observatii, $user_id);

    if ($stmt->execute()) {
        echo "Utilizator actualizat cu succes!";
        echo "<button onclick='window.location.href=`admin.php`;'>Inapoi la Users</button>";
    } else {
        echo "Eroare la actualizare: " . $con->error;
    }
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Editare Utilizator</title>
</head>
<body>
    <h2>Editare Utilizator</h2>
    <form method="POST" action="edit_user.php">
        <input type="hidden" name="id" value="<?php echo $user['id']; ?>">
        <label>Utilizator:</label>
        <input type="text" name="user" value="<?php echo htmlspecialchars($user['user']); ?>" required><br>

        <label>Parolă:</label>
        <input type="text" name="pass" value="<?php echo htmlspecialchars($user['pass']); ?>" required><br>

        <label>Adresă:</label>
        <input type="text" name="adresa" value="<?php echo htmlspecialchars($user['adresa']); ?>"><br>

        <label>Observații:</label>
        <input type="text" name="observatii" value="<?php echo htmlspecialchars($user['observatii']); ?>"><br>

        <button type="submit">Salvează modificările</button>
        <button type="button" onclick="window.location.href='admin.php'">Inapoi</button>
    </form>
    <script src="js/logged.js"></script>
<script>
    admin();
    </script>
</body>
</html>
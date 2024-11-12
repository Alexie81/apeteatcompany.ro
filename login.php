<?php
// Include config.php pentru a prelua conexiunea $con
require_once('config.php');
session_start(); // Inițializează sesiunea

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($con, $_POST['username']);
    $password = mysqli_real_escape_string($con, $_POST['password']);

    // Interogare baza de date pentru autentificare
    $sql = "SELECT * FROM users WHERE user = '$username' AND pass = '$password'";
    $result = mysqli_query($con, $sql);

    if (mysqli_num_rows($result) > 0) {
        // Autentificare reușită
        if($username !== "admin"){
            header("Location: home.html?logged=true");
        } else {
            header("Location: home.html?logged=true&isa=true");
        }
    } else {
        // Mesaj de eroare pentru autentificare eșuată
        header("Location: index.php?message=" . urlencode("Nume de utilizator sau parolă incorecte."));
    }
    exit();
}

// Închide conexiunea la baza de date
mysqli_close($con);
?>
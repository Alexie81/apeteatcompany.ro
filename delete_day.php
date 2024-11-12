<?php
require_once('config.php');

// Verifică dacă data este setată în URL
if (isset($_GET['date'])) {
    $date = $_GET['date'];

    // Verifică dacă utilizatorul a confirmat ștergerea
    if (isset($_POST['confirm_delete'])) {
        // Șterge înregistrarea din baza de date
        $stmt = $con->prepare("DELETE FROM product_calendar WHERE date = ?");
        $stmt->bind_param('s', $date);

        if ($stmt->execute()) {
            // Dacă ștergerea a fost efectuată cu succes, redirecționează la calendar
            header("Location: product_calendar.php");
            exit;
        } else {
            echo "A apărut o eroare la ștergerea înregistrării.";
        }
    }
} else {
    echo "Data nu a fost specificată!";
    exit;
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
    <title>Stergere Produs din Calendar - Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.js"></script>
    <script src="js/logged.js"></script>
    <script>
    admin();
    </script>
    <script>
        // Funcție pentru a confirma ștergerea
        function confirmDelete() {
            const confirmAction = confirm("Sunteți sigur că doriți să ștergeți această înregistrare?");
            if (confirmAction) {
                // Dacă utilizatorul confirmă, trimite formularul pentru ștergere
                document.getElementById('deleteForm').submit();
            } else {
                // Dacă nu confirmă, nu face nimic
                return false;
            }
        }
    </script>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ApetEatCompany.ro</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="admin.php">Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="products.php">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="product_calendar.php">Product Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="orders.php">Orders</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="container my-4">
    <h2>Confirmare Ștergere Produse pentru Ziua <?php echo $_GET['date']; ?></h2>
    <p>Sigur doriți să ștergeți înregistrarea pentru această zi?</p>
    
    <!-- Formularul pentru ștergere, care va fi trimis doar dacă utilizatorul confirmă -->
    <form id="deleteForm" method="POST">
        <button type="button" class="btn btn-danger" onclick="confirmDelete()">Șterge</button>
        <input type="hidden" name="confirm_delete" value="1">
        <a href="product_calendar.php" class="btn btn-secondary">Anulează</a>
    </form>
</div>
</body>
</html>
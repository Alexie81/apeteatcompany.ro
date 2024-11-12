<?php
require_once('config.php');
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Calendar Produse</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">
    <script src="js/logged.js"></script>
    <script>
    admin();
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
<main style="padding: 20px;">
    <h2>Product Calendar</h2><br /><br />
        <button class="btn btn-primary mb-3" onclick="window.location.href='add_day.php'">Adaugă Zi</button>
        <table id="calendarTable" class="table table-striped">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Mic Dejun</th>
                    <th>Prânz Felul 1</th>
                    <th>Prânz Felul 2</th>
                    <th>Cina</th>
                    <th>Acțiuni</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "SELECT DISTINCT date FROM product_calendar ORDER BY date";
                $result = $con->query($sql);

                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . $row['date'] . "</td>";

                        $categories = ["Mic Dejun", "Pranz Felul 1", "Pranz Felul 2", "Cina"];
                        foreach ($categories as $category) {
                            $sqlProducts = "SELECT name FROM products JOIN product_calendar ON products.id = product_calendar.product_id WHERE product_calendar.date = ? AND products.category = ?";
                            $stmt = $con->prepare($sqlProducts);
                            $stmt->bind_param("ss", $row['date'], $category);
                            $stmt->execute();
                            $resultProducts = $stmt->get_result();

                            echo "<td>";
                            if ($resultProducts->num_rows > 0) {
                                while ($product = $resultProducts->fetch_assoc()) {
                                    echo $product['name'] . "<br>";
                                }
                            } else {
                                echo "Niciun produs";
                            }
                            echo "</td>";
                        }

                        echo "<td>";
                        echo "<a href='edit_day.php?date=" . $row['date'] . "' class='btn btn-secondary btn-sm'>Editează</a> ";
                        echo "<a href='delete_day.php?date=" . $row['date'] . "' class='btn btn-danger btn-sm'>Șterge</a>";
                        echo "</td>";

                        echo "</tr>";
                    }
                }
                ?>
            </tbody>
        </table>
            </main>

    <script>
        $(document).ready(function() {
            $('#calendarTable').DataTable();
        });
    </script>
</body>
</html>
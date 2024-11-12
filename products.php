<?php
require_once('config.php');

// Funcția pentru ștergerea unui produs
if (isset($_GET['delete_id'])) {
    $product_id = intval($_GET['delete_id']);
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

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Produse - Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.datatables.net/2.1.8/js/dataTables.js"></script>
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
          <a class="nav-link active" href="products.php">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="product_calendar.php">Product Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="orders.php">Orders</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<main style="padding: 10px;">
    <h1>Products</h1>
    <button type="button" class="btn btn-primary" onclick="window.location.href='add_product.php'">Add Product</button>
    <table id="productTable" class="table table-success table-striped" style="width:100%">
    <thead>
                <tr>
                    <th>ID</th>
                    <th>Nume</th>
                    <th>Categorie</th>
                    <th>Ingrediente</th>
                    <th>Imagine</th>
                    <th>Acțiuni</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                require_once('config.php');
                $sql = "SELECT * FROM products";
                $result = $con->query($sql);
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>
                            <td>".$row['id']."</td>
                            <td>".$row['name']."</td>
                            <td>".$row['category']."</td>
                            <td>".$row['nutritional_info']."</td>
                            <td><img src='".$row['image_url']."' width='50' height='50'></td>
                            <td>
                                <a href='edit_product.php?id=".$row['id']."' class='btn btn-sm btn-warning'>Editare</a> 
                                <a href='#' onclick='deleteProduct(".$row['id'].")' class='btn btn-sm btn-danger'>Ștergere</a>
                            </td>
                        </tr>";
                    }
                }
                ?>
            </tbody>
    </table>
</main>

<script>
    new DataTable('#productTable');

    function deleteProduct(productId) {
        if (confirm("Ești sigur că vrei să ștergi acest produs?")) {
            fetch('delete_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'id=' + productId
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(error => console.error('Eroare:', error));
        }
    }
</script>

</body>
</html>
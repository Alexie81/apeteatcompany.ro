<?php
require_once('config.php');

if (isset($_GET['id'])) {
    $product_id = intval($_GET['id']);
    $sql = "SELECT * FROM products WHERE id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['name'];
        $category = $_POST['category'];
        $nutritional_info = $_POST['nutritional_info'];
        $calories = $_POST['calories'];
        $carbs = $_POST['carbs'];
        $proteins = $_POST['proteins'];
        $fats = $_POST['fats'];
        $fibers = $_POST['fibers'];
        $salt = $_POST['salt'];
        $allergens = $_POST['allergens'];

        $image_url = $product['image_url'];
        if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
            $image_path = 'uploads/' . basename($_FILES['image']['name']);
            if (move_uploaded_file($_FILES['image']['tmp_name'], $image_path)) {
                $image_url = $image_path;
            }
        }

        $stmt = $con->prepare("UPDATE products SET name=?, category=?, image_url=?, nutritional_info=?, calories=?, carbs=?, proteins=?, fats=?, fibers=?, salt=?, allergens=? WHERE id=?");
        $stmt->bind_param("sssssssssssi", $name, $category, $image_url, $nutritional_info, $calories, $carbs, $proteins, $fats, $fibers, $salt, $allergens, $product_id);

        if ($stmt->execute()) {
            echo "<script>alert('Produsul a fost actualizat!'); window.location.href='products.php';</script>";
        } else {
            echo "Eroare la actualizare: " . $con->error;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Editare Produs</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="js/logged.js"></script>
<script>
    admin();
    </script>
</head>
<body>
    <div class="container">
        <h2>Editare Produs</h2>
        <form method="POST" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="name" class="form-label">Denumire Produs</label>
                <input type="text" class="form-control" name="name" value="<?= htmlspecialchars($product['name']) ?>" required>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">Categorie</label>
                <select class="form-select" name="category" required>
                    <option value="Mic Dejun" <?= ($product['category'] == 'Mic Dejun') ? 'selected' : '' ?>>Mic Dejun</option>
                    <option value="Pranz Felul 1" <?= ($product['category'] == 'Pranz Felul 1') ? 'selected' : '' ?>>Pranz Felul 1</option>
                    <option value="Pranz Felul 2" <?= ($product['category'] == 'Pranz Felul 2') ? 'selected' : '' ?>>Pranz Felul 2</option>
                    <option value="Cina" <?= ($product['category'] == 'Cina') ? 'selected' : '' ?>>Cina</option>
                    <option value="Extra" <?= ($product['category'] == 'Extra') ? 'selected' : '' ?>>Extra</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="nutritional_info" class="form-label">Informații Nutriționale</label>
                <textarea class="form-control" name="nutritional_info" rows="4"><?= htmlspecialchars($product['nutritional_info']) ?></textarea>
            </div>
            <div class="mb-3">
                <label for="calories" class="form-label">Calorii</label>
                <input type="text" class="form-control" name="calories" value="<?= htmlspecialchars($product['calories']) ?>">
            </div>
            <div class="mb-3">
                <label for="carbs" class="form-label">Carbohidrați</label>
                <input type="text" class="form-control" name="carbs" value="<?= htmlspecialchars($product['carbs']) ?>">
            </div>
            <div class="mb-3">
                <label for="proteins" class="form-label">Proteine</label>
                <input type="text" class="form-control" name="proteins" value="<?= htmlspecialchars($product['proteins']) ?>">
            </div>
            <div class="mb-3">
                <label for="fats" class="form-label">Grăsimi</label>
                <input type="text" class="form-control" name="fats" value="<?= htmlspecialchars($product['fats']) ?>">
            </div>
            <div class="mb-3">
                <label for="fibers" class="form-label">Fibre</label>
                <input type="text" class="form-control" name="fibers" value="<?= htmlspecialchars($product['fibers']) ?>">
            </div>
            <div class="mb-3">
                <label for="salt" class="form-label">Sare</label>
                <input type="text" class="form-control" name="salt" value="<?= htmlspecialchars($product['salt']) ?>">
            </div>
            <div class="mb-3">
                <label for="allergens" class="form-label">Alergeni</label>
                <textarea class="form-control" name="allergens" rows="2"><?= htmlspecialchars($product['allergens']) ?></textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Imagine Produs</label>
                <input type="file" class="form-control" name="image">
                <img src="<?= htmlspecialchars($product['image_url']) ?>" alt="Product Image" style="width: 100px; margin-top: 10px;">
            </div>
            <button type="submit" class="btn btn-primary">Salvează Produsul</button>
        </form>
    </div>
</body>
</html>
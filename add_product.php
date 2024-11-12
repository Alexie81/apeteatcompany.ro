<?php
require_once('config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $nutritional_info = $_POST['nutritional_info'];
    $category = $_POST['category'];
    $calories = $_POST['calories'];
    $carbs = $_POST['carbs'];
    $proteins = $_POST['proteins'];
    $fats = $_POST['fats'];
    $fibers = $_POST['fibers'];
    $salt = $_POST['salt'];
    $allergens = $_POST['allergens'];
    
    // Salvare imagine
    $image_url = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
        $image_path = 'uploads/' . basename($_FILES['image']['name']);
        if (move_uploaded_file($_FILES['image']['tmp_name'], $image_path)) {
            $image_url = $image_path;
        } else {
            echo "Eroare la încărcarea imaginii.";
        }
    }

    $stmt = $con->prepare("INSERT INTO products (name, category, image_url, nutritional_info, calories, carbs, proteins, fats, fibers, salt, allergens) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssss", $name, $category, $image_url, $nutritional_info, $calories, $carbs, $proteins, $fats, $fibers, $salt, $allergens);

    if ($stmt->execute()) {
        echo "Produs adăugat cu succes!";
        header("Location: products.php");
    } else {
        echo "Eroare la adăugarea produsului: " . $con->error;
    }
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Adaugă Produs</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="js/logged.js"></script>
<script>
    admin();
    </script>
</head>
<body>
    <div class="container">
        <h2>Adaugă un produs nou</h2>
        <form method="POST" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="name" class="form-label">Denumire Produs</label>
                <input type="text" class="form-control" name="name" required>
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">Categorie</label>
                <select class="form-select" name="category" required>
                    <option value="Mic Dejun">Mic Dejun</option>
                    <option value="Pranz Felul 1">Pranz Felul 1</option>
                    <option value="Pranz Felul 2">Pranz Felul 2</option>
                    <option value="Cina">Cina</option>
                    <option value="Extra">Extra</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="nutritional_info" class="form-label">Ingrediente</label>
                <textarea class="form-control" name="nutritional_info" rows="4" required></textarea>
            </div>
            <div class="mb-3">
                <label for="calories" class="form-label">Energie</label>
                <input type="text" class="form-control" name="calories" required>
            </div>
            <div class="mb-3">
                <label for="carbs" class="form-label">Carbohidrați / Zaharuri</label>
                <input type="text" class="form-control" name="carbs" required>
            </div>
            <div class="mb-3">
                <label for="proteins" class="form-label">Proteine</label>
                <input type="text" class="form-control" name="proteins" required>
            </div>
            <div class="mb-3">
                <label for="fats" class="form-label">Grăsimi/Grăsimi Saturate</label>
                <input type="text" class="form-control" name="fats" required>
            </div>
            <div class="mb-3">
                <label for="fibers" class="form-label">Fibre</label>
                <input type="text" class="form-control" name="fibers" required>
            </div>
            <div class="mb-3">
                <label for="salt" class="form-label">Sare</label>
                <input type="text" class="form-control" name="salt" required>
            </div>
            <div class="mb-3">
                <label for="allergens" class="form-label">Alergeni</label>
                <textarea class="form-control" name="allergens" rows="2" required></textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Imagine Produs</label>
                <input type="file" class="form-control" name="image" required>
            </div>
            <button type="submit" class="btn btn-primary" >Salvează Produsul</button>
        </form>
    </div>
</body>
</html>
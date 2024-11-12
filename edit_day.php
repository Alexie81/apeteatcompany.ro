<?php
require_once('config.php');

// Funcția pentru a obține produsele pe categorie
function getProductsByCategory($category) {
    global $con;
    $query = "SELECT id, name FROM products WHERE category = ? ORDER BY name ASC";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $category);
    $stmt->execute();
    return $stmt->get_result();
}

// Funcția pentru a obține produsele deja selectate pentru o anumită zi
function getSelectedProductsForDay($date, $category) {
    global $con;
    $query = "SELECT product_id FROM product_calendar WHERE date = ? AND category = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("ss", $date, $category);
    $stmt->execute();
    return $stmt->get_result();
}

// Obține data din URL
$date = $_GET['date'] ?? null;
if (!$date) {
    die("Data nu este specificată!");
}

// Actualizare produse pentru o anumită zi
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['save_changes'])) {
    $date = $_POST['date'] ?? null;
    if ($date) {
        // Curățăm produsele deja existente pentru ziua respectivă
        $stmt_delete = $con->prepare("DELETE FROM product_calendar WHERE date = ?");
        $stmt_delete->bind_param("s", $date);
        $stmt_delete->execute();

        // Pregătim declarația pentru inserare în product_calendar
        $stmt_insert_calendar = $con->prepare("INSERT INTO product_calendar (date, category, product_id) VALUES (?, ?, ?)");

        foreach ($_POST['products'] as $category => $product_ids) {
            foreach ($product_ids as $product_id) {
                // Inserăm produsul în product_calendar
                $stmt_insert_calendar->bind_param("ssi", $date, $category, $product_id);
                $stmt_insert_calendar->execute();
            }
        }

        echo "Toate produsele au fost salvate cu succes pentru data selectată!";
        header("Location: product_calendar.php");
    } else {
        echo "Eroare: Data este obligatorie!";
    }
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Editare Produse pentru Ziua <?php echo $date; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script>
        // Funcția pentru adăugarea unui select pentru produse
        function addProductSelect(category) {
            const container = document.getElementById(`product_${category}_container`);
            if (!container) return;

            const selectGroup = document.createElement('div');
            selectGroup.className = 'mb-2';

            const originalSelect = container.querySelector('select').cloneNode(true);
            originalSelect.name = `products[${category}][]`;
            originalSelect.selectedIndex = 0;

            selectGroup.appendChild(originalSelect);
            container.appendChild(selectGroup);
        }
    </script>
</head>
<body>
<div class="container my-4">
    <h2>Editare Produse pentru Ziua <?php echo $date; ?></h2>
    <form method="POST" id="calendarForm">
        <div class="mb-3">
            <label for="date" class="form-label">Data</label>
            <input type="date" class="form-control" name="date" id="date" value="<?php echo $date; ?>" required>
        </div>

        <!-- Selectare produse pe categorii -->
        <?php
        $categories = ["Mic Dejun", "Pranz Felul 1", "Pranz Felul 2", "Cina"];
        foreach ($categories as $category) :
            // Obținem produsele deja selectate pentru acea zi
            $selectedProducts = getSelectedProductsForDay($date, $category);
            $selectedProductIds = [];
            while ($row = $selectedProducts->fetch_assoc()) {
                $selectedProductIds[] = $row['product_id'];
            }
        ?>
            <h4><?php echo $category; ?></h4>
            <div id="product_<?php echo $category; ?>_container" class="mb-3">
                <label class="form-label">Selectați produsele pentru <?php echo $category; ?></label>
                <?php
                // Afișează un select pentru fiecare produs deja selectat
                foreach ($selectedProductIds as $product_id) :
                    // Preluăm produsul
                    $productQuery = "SELECT id, name FROM products WHERE id = ?";
                    $stmt = $con->prepare($productQuery);
                    $stmt->bind_param("i", $product_id);
                    $stmt->execute();
                    $productResult = $stmt->get_result();
                    $product = $productResult->fetch_assoc();
                ?>
                    <div class="mb-2">
                        <select class="form-select" name="products[<?php echo $category; ?>][]">
                            <option value="<?php echo $product['id']; ?>" selected><?php echo $product['name']; ?></option>
                        </select>
                    </div>
                <?php endforeach; ?>

                <button type="button" class="btn btn-secondary mb-3" onclick="addProductSelect('<?php echo $category; ?>')">Adaugă alt produs</button>
            </div>
        <?php endforeach; ?>
                    <br />
        <!-- Buton pentru salvarea modificărilor -->
        <button type="submit" name="save_changes" class="btn btn-primary mt-4">Salvează modificările</button>
        <button type="button" class="btn btn-secondary mt-4" onclick="window.location.href='product_calendar.php'">Anulează si mergi inapoi</button>
    </form>
</div>
</body>
</html>
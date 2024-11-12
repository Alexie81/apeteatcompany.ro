<?php
require_once('config.php');

// Funcția pentru a obține produsele pe categorie, fără a exclude produse
function getProductsByCategory($category) {
    global $con;
    $query = "SELECT id, name FROM products WHERE category = ? ORDER BY name ASC";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $category);
    $stmt->execute();
    return $stmt->get_result();
}

// Adăugare produse selectate în baza de date
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['save_changes'])) {
    $date = $_POST['date'] ?? null;
    if ($date) {
        // Pregătim declarația pentru verificarea existenței unui produs
        $stmt_check_product = $con->prepare("SELECT COUNT(*) FROM products WHERE id = ?");
        
        // Pregătim declarația pentru inserare în product_calendar
        $stmt_insert_calendar = $con->prepare("INSERT INTO product_calendar (date, category, product_id) VALUES (?, ?, ?)");

        foreach ($_POST['products'] as $category => $product_ids) {
            foreach ($product_ids as $product_id) {
                // Verifică dacă produsul există în tabelul `products`
                $stmt_check_product->bind_param("i", $product_id);
                $stmt_check_product->execute();
                
                // Așteaptă și obține rezultatele pentru COUNT
                $stmt_check_product->store_result(); // Stochează rezultatul
                $stmt_check_product->bind_result($product_count); // Legăm rezultatul
                $stmt_check_product->fetch(); // Extragem rezultatul

                if ($product_count > 0) {
                    // Dacă produsul există, inserează-l în `product_calendar`
                    $stmt_insert_calendar->bind_param("ssi", $date, $category, $product_id);
                    $stmt_insert_calendar->execute();
                } else {
                    // Dacă produsul nu există, afișează un mesaj de eroare
                    echo "Produsul cu ID-ul $product_id nu există în baza de date!";
                }

                // După fiecare interogare, închide rezultatul pentru a evita eroarea de "commands out of sync"
                $stmt_check_product->free_result(); 
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
    <title>Calendar Produse</title>
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
    <h2>Adăugare Produse pentru Zile</h2>
    <form method="POST" id="calendarForm">
        <div class="mb-3">
            <label for="date" class="form-label">Data</label>
            <input type="date" class="form-control" name="date" id="date" required>
        </div>

        <!-- Selectare produse pe categorii -->
        <?php
        $categories = ["Mic Dejun", "Pranz Felul 1", "Pranz Felul 2", "Cina"];
        foreach ($categories as $category) :
        ?>
            <h4><?php echo $category; ?></h4>
            <div id="product_<?php echo $category; ?>_container" class="mb-3">
                <label class="form-label">Selectați produsul pentru <?php echo $category; ?></label>
                <div class="mb-2">
                    <select class="form-select" name="products[<?php echo $category; ?>][]" id="product_<?php echo $category; ?>" required>
                        <option value="">Alegeți produsul</option>
                        <?php
                        $products = getProductsByCategory($category);
                        while ($product = $products->fetch_assoc()) {
                            echo "<option value='{$product['id']}'>{$product['name']}</option>";
                        }
                        ?>
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-secondary mb-3" onclick="addProductSelect('<?php echo $category; ?>')">Adaugă alt produs</button>
        <?php endforeach; ?>
                        <br />
        <!-- Buton pentru salvarea modificărilor -->
        <button type="submit" name="save_changes" class="btn btn-primary mt-4">Salvează modificările</button>
        <button type="button" class="btn btn-secondary mt-4" onclick="window.location.href='product_calendar.php'">Anulează si mergi inapoi</button>
    </form>
</div>
</body>
</html>

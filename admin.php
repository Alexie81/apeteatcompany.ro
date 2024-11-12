<!DOCTYPE html>
<html>
    <head>
        <title>Admin - ApetEatCompany.ro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
  <script src="https://cdn.datatables.net/2.1.8/js/dataTables.js"></script>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ApetEatCompany.ro</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Product Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Orders</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </head>
        <body>







        <main style="padding: 10px;">
            <h1>Users</h1> <br />
            <button type="button" class="btn btn-primary" onclick="window.location.href='add_user.php'">Add User</button>
        <table id="example" class="table table-success table-striped" style="width:100%">
        <thead>
            <tr>
                <th>Id</th>
                <th>User</th>
                <th>Parola</th>
                <th>Adresa</th>
                <th>Observatii</th>
                <th>Actiuni</th>
            </tr>
        </thead>
        <tbody>
    <?php 
    require_once('config.php');
    $sql = "SELECT * FROM `users`";
    $result = $con->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "
            <tr id='user-row-".$row['id']."'>
                <td>".$row['id']."</td>
                <td>".$row['user']."</td>
                <td>".$row['pass']."</td>
                <td>".$row['adresa']."</td>
                <td>".$row['observatii']."</td>
                <td>
                    <a href='edit_user.php?id=".$row['id']."'>Edit</a> | 
                    <a href='#' onclick='deleteUser(".$row['id'].")'>Delete</a>
                </td>
            </tr>";
        }
    }
    ?>
</tbody>
    </table>
    </main>

    <script>
        new DataTable('#example');
    </script>
    <script>
// Functia pentru a cere confirmarea si a sterge utilizatorul
function deleteUser(userId) {
    if(userId === 1) {
        alert("Nu poti sterge acest utilizator!");
        return false; // Anulează actiunea de ��tergere a utilizatorului cu id-ul 1
    }
    if (confirm("Ești sigur că vrei să ștergi acest utilizator?")) {
        // Facem cererea AJAX pentru ștergere
        fetch('delete_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + userId
        })
        .then(window.location.href = "admin.php")
        .catch(error => console.error('Eroare:', error));
    }
}
</script>
</body>
    </html>
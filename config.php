<?php

require("./util/console_debug.php");

// $host = "89.41.38.171";
// $username = "jaderela_site";
// $pass = "jaderelax2@24";
// $con = mysqli_connect($host, $username, $pass, "jaderela_produse");

// if (!$con) {
//     die("Connection failed: ". mysqli_connect_error());
    
// } else {
//     debug_to_console("Database connection is stable!");
// }

$host = "localhost";
$username = "root";
$pass = "root";
$con = mysqli_connect($host, $username, $pass, "apeteatcompany");

if (!$con) {
    die("Connection failed: ". mysqli_connect_error());
    
} else {
    debug_to_console("Database connection is stable!");
}

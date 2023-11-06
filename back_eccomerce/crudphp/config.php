<?php

$db_name = 'crudphp';
$db_host = '172.17.0.2:3306';
$db_user = 'root';
$db_password = 'admin';


// try {
    $pdo = new PDO("mysql:dbname=" . $db_name . ";host=" . $db_host, $db_user, $db_password);




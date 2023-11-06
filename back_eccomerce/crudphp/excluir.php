<?php 
require 'config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$idSneaker = filter_input(INPUT_GET, 'idSneaker');

if ($idSneaker) { 
    $sql = $pdo->prepare("DELETE FROM produtos WHERE idSneaker = :idSneaker");
    $sql->bindValue(':idSneaker', $idSneaker);
    $sql->execute();
}

echo 'Produto excluído!! ';
?>

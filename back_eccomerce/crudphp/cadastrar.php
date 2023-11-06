<?php
require 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = file_get_contents('php://input');
        $jsonData = json_decode($data);

        if ($jsonData !== null && isset($jsonData->idSneaker) && isset($jsonData->urlSneaker)) {
            $idSneaker = $jsonData->idSneaker;
            $urlSneaker = $jsonData->urlSneaker;

            $sql = $pdo->prepare("INSERT INTO produtos (idSneaker, urlSneaker) VALUES (:idSneaker, :urlSneaker)");
            $sql->bindValue(":idSneaker", $idSneaker);
            $sql->bindValue(":urlSneaker", $urlSneaker);
            $sql->execute();

            if ($sql->rowCount() > 0) {
                echo "ID do Sneaker inserido com sucesso: $idSneaker";
            } else {
                echo "Erro: Não foi possível inserir o ID do Sneaker.";
            }
        } else {
            echo "Erro: Dados inválidos ou ausentes no formato JSON.";
        }
    } catch (PDOException $e) {
        echo "Erro ao inserir o ID do Sneaker: " . $e->getMessage();
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $sql = $pdo->prepare("SELECT * FROM produtos");
        $sql->execute();
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Erro ao buscar dados: " . $e->getMessage();
    }
}
?>

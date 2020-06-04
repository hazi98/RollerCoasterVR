<?php
session_start();
// Check if the user is already logged in, if yes then redirect him to welcome page
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === false) {
    echo 0;
    exit;
}
// Include config file
require_once "config.php";


//prepare our query
try {
    $sql = 'SELECT id, username, email FROM users WHERE username = :name';
    if ($stmt = $pdo->prepare($sql)) {
        //let PDO bind the email into the query, and prevent any SQL injection attempts.
        $stmt->bindParam(':name', $_SESSION["username"]);
        //execute the query
        if ($stmt->execute()) {
            $result =  $stmt->fetch();
            if ($result) {
                echo json_encode($result);
            } else {
                echo 0;
            }
        }
        // Close statement
        unset($stmt);
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}

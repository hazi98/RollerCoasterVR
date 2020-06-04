<?php
// Initialize the session
session_start();

// Include config file
require_once "config.php";
 
//prepare our query
try {
    $sql = 'SELECT email FROM password_resets WHERE token = :name LIMIT 1';
    if($stmt = $pdo->prepare($sql)){
        //let PDO bind the email into the query, and prevent any SQL injection attempts.
        $stmt->bindParam(':name', $_POST['token']);
        //execute the query
        if($stmt->execute()){
            $result =  $stmt->fetch();
            if($result){
                echo 1;
            }
            else{
                echo 0;
            }
        }
        // Close statement
        unset($stmt);
    }
} catch (PDOException $e){
    echo $e->getMessage();
}

<?php
// Include config file
require_once "config.php";
 
//prepare our query
try {
    $sql = 'SELECT * FROM users WHERE username = :name';
    if($stmt = $pdo->prepare($sql)){
        //let PDO bind the username into the query, and prevent any SQL injection attempts.
        $stmt->bindParam(':name', $_POST['username']);
        //execute the query
        if($stmt->execute()){
            $result =  $stmt->fetchAll();
            if(!$result){
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
?>
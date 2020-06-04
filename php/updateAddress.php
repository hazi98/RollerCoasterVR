<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    echo 0;
    exit;
}

// Include config file
require_once "config.php";

//prepare our query
try {
    $sql = 'SELECT id FROM users WHERE username = :name';
    if ($stmt = $pdo->prepare($sql)) {
        $stmt->bindParam(':name', $_SESSION["username"]);
        if ($stmt->execute()) {
            $result =  $stmt->fetch();
            if ($result) {
                $userid = $result["id"];
                unset($stmt);
                // $sql = 'INSERT INTO address(address1, address2, country, city, state, zip, fk_users) VALUES (\':address1\', \':address2\', \':country\', \':city\', \':state\', \':zip\', :userid) ON DUPLICATE KEY UPDATE address1=VALUES(address1), address2=VALUES(address2), country=VALUES(country),city=VALUES(city),state=VALUES(state),zip=VALUES(zip)';
                $sql = 'INSERT INTO address(address1, address2, country, city, state, zip, fk_users) VALUES (:address1, :address2, :country, :city, :state, :zip, :userid) ON DUPLICATE KEY UPDATE address1=VALUES(address1), address2=VALUES(address2), country=VALUES(country),city=VALUES(city),state=VALUES(state),zip=VALUES(zip)';
                if ($stmt = $pdo->prepare($sql)) {
                    $stmt->bindParam(':address1', $_POST["address1"], PDO::PARAM_STR);
                    $stmt->bindParam(':address2', $_POST["address2"], PDO::PARAM_STR);
                    $stmt->bindParam(':country', $_POST["country"], PDO::PARAM_STR);
                    $stmt->bindParam(':city', $_POST["city"], PDO::PARAM_STR);
                    $stmt->bindParam(':state', $_POST["state"], PDO::PARAM_STR);
                    $stmt->bindParam(':zip', $_POST["zip"], PDO::PARAM_STR);
                    $stmt->bindParam(':userid', $userid, PDO::PARAM_INT);

                    if ($stmt->execute()) {
                        echo 1;
                    } else {
                        echo 0;
                    }
                    // Close statement
                    unset($stmt);
                }
            } else {
                echo 0;
            }
        }
        // Close statement
        unset($stmt);
    }
    // Close connection
    unset($pdo);
} catch (PDOException $e) {
    echo $e->getMessage();
}

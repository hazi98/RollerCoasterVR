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
                $sql = 'INSERT INTO `personal-info`(`first-name`, `middle-name`, `last-name`, `age`, `gender`, `phone`, `email`, `foreign-key`) VALUES (:firstname, :middlename, :lastname, :age, :gender, :phone, :email, :userid) ON DUPLICATE KEY UPDATE `first-name`=VALUES(`first-name`), `middle-name`=VALUES(`middle-name`), `last-name`=VALUES(`last-name`), `age`=VALUES(`age`), `gender`=VALUES(`gender`), `phone`=VALUES(`phone`), `email`=VALUES(`email`)';
                if ($stmt = $pdo->prepare($sql)) {
                    $stmt->bindParam(':firstname', $_POST["first-name"], PDO::PARAM_STR);
                    $stmt->bindParam(':middlename', $_POST["middle-name"], PDO::PARAM_STR);
                    $stmt->bindParam(':lastname', $_POST["last-name"], PDO::PARAM_STR);
                    $stmt->bindParam(':age', $_POST["age"], PDO::PARAM_INT);
                    $stmt->bindParam(':gender', $_POST["gender"], PDO::PARAM_STR);
                    $stmt->bindParam(':phone', $_POST["phone"], PDO::PARAM_STR);
                    $stmt->bindParam(':email', $_POST["email"], PDO::PARAM_STR);
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

<?php
session_start();
// Include config file
require_once "config.php";

require_once "authCookieSessionValidate.php";
$username_err = "";
$password_err = "";
$confirm_password_err = "";

if (count($_POST) > 0) {
    $sql = "SELECT * from users WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":id", $_SESSION["id"], PDO::PARAM_INT);
    $stmt->execute();
    if ($stmt->rowCount() == 1) {
        if ($row = $stmt->fetch()) {
            if (password_verify($_POST["current-password"], $row["password"])) {
                // Close statement
                unset($stmt);

                // Validate password
                if (empty(trim($_POST["new-password"]))) {
                    $password_err = "Please enter a password.";
                } elseif (strlen(trim($_POST["new-password"])) < 6) {
                    $password_err = "Password must have atleast 6 characters.";
                } else {
                    $password = trim($_POST["new-password"]);
                }

                // Validate confirm password
                if (empty(trim($_POST["confirm-password"]))) {
                    $confirm_password_err = "Please confirm password.";
                } else {
                    $confirm_password = trim($_POST["confirm-password"]);
                    if (empty($password_err) && ($password != $confirm_password)) {
                        $confirm_password_err = "Passwords do not match.";
                    }
                }
                // Check input errors before inserting in database
                if (empty($username_err) && empty($password_err) && empty($confirm_password_err)) {
                    // Prepare an insert statement
                    $sql = "UPDATE users SET password = :password WHERE id = :id";

                    if ($stmt = $pdo->prepare($sql)) {
                        $stmt->bindParam(":password", $param_password, PDO::PARAM_STR);
                        $stmt->bindParam(":id", $_SESSION["id"], PDO::PARAM_INT);
                        $param_password = password_hash($password, PASSWORD_DEFAULT);
                        if ($stmt->execute()) {
                            echo 1;
                        }
                    }
                } else {
                    echo $username_err;
                    echo $password_err;
                    echo $confirm_password_err;
                }
                unset($stmt);
            } else {
                $password_err = "Current Password is not correct";
                echo $password_err;
            }
        }
    } else {
        echo 0;
    }
    // Close connection
    unset($pdo);
}

<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: ../login.html");
//     exit;
// }
 
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$new_password = $confirm_password = "";
$new_password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Validate new password
    if(empty(trim($_POST["new-password"]))){
        $new_password_err = "Please enter the new password.";     
    } elseif(strlen(trim($_POST["new-password"])) < 6){
        $new_password_err = "Password must have atleast 6 characters.";
    } else{
        $new_password = trim($_POST["new-password"]);
    }
    
    // Validate confirm password
    if(empty(trim($_POST["confirm-password"]))){
        $confirm_password_err = "Please confirm the password.";
    } else{
        $confirm_password = trim($_POST["confirm-password"]);
        if(empty($new_password_err) && ($new_password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }
        
    // Check input errors before updating the database
    if(empty($new_password_err) && empty($confirm_password_err)){
        $sql = "SELECT `email` FROM `password_resets` WHERE `token` = :token";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":token", $param_token, PDO::PARAM_STR);
        $param_token = $_POST["token"];
        $stmt->execute();
        if($stmt->rowCount() == 1){
            if($row = $stmt->fetch()){
                $param_email = $row["email"];
                // Close statement
                unset($stmt);
            }
        }

        // Get id
        $sql = "SELECT `id` FROM `users` WHERE `email` = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
        $stmt->execute();
        if($stmt->rowCount() == 1){
            if($row = $stmt->fetch()){
                $param_id = $row["id"];
                // Close statement
                unset($stmt);
            }
        }

        // Prepare an update statement
        $sql = "UPDATE `users` SET `password` = :password WHERE `id` = :id";
        
        if($stmt = $pdo->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(":password", $param_password, PDO::PARAM_STR);
            $stmt->bindParam(":id", $param_id, PDO::PARAM_INT);
            
            // Set parameters
            $param_password = password_hash($new_password, PASSWORD_DEFAULT);
            
            // Attempt to execute the prepared statement
            if($stmt->execute()){
                unset($stmt);
                // Delete token from table
                $sql = "DELETE FROM `password_resets` WHERE `token` = :token";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(":token", $param_token, PDO::PARAM_STR);
                $stmt->execute();
                
                // Password updated successfully. Destroy the session, and redirect to login page
                session_destroy();
                // header("location: ../login.html");
                echo 1;
                exit();
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            unset($stmt);
        }
    }
    
    // Close connection
    unset($pdo);
}

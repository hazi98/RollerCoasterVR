<?php
// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: welcome.php");
    exit;
}
 
// Include config file
require_once "config.php";
require_once "Auth.php";
require_once "Util.php";

$auth = new Auth();
$db_handle = new DBController();
$util = new Util();

require_once "authCookieSessionValidate.php";

if ($isLoggedIn) {
    $util->redirect("welcome.php");
}

// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
$err = "";
$error = false;
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
        $err = "Please enter your password.";
        $error = true;
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($username_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT id, username, password FROM users WHERE username = :username";
        
        if($stmt = $pdo->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(":username", $param_username, PDO::PARAM_STR);
            
            // Set parameters
            $param_username = trim($_POST["username"]);
            
            // Attempt to execute the prepared statement
            if($stmt->execute()){
                // Check if username exists, if yes then verify password
                if($stmt->rowCount() == 1){
                    if($row = $stmt->fetch()){
                        $id = $row["id"];
                        $username = $row["username"];
                        $hashed_password = $row["password"];
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            // session_start();
                            // Set Auth Cookies if 'Remember Me' checked
                            if (! empty($_POST["remember"])) {
                                setcookie("member_login", $username, $cookie_expiration_time);
                                
                                $random_password = $util->getToken(16);
                                setcookie("random_password", $random_password, $cookie_expiration_time);
                                
                                $random_selector = $util->getToken(32);
                                setcookie("random_selector", $random_selector, $cookie_expiration_time);
                                
                                $random_password_hash = password_hash($random_password, PASSWORD_DEFAULT);
                                $random_selector_hash = password_hash($random_selector, PASSWORD_DEFAULT);
                                
                                $expiry_date = date("Y-m-d H:i:s", $cookie_expiration_time);
                                
                                // mark existing token as expired
                                $userToken = $auth->getTokenByUsername($username, 0);
                                if (! empty($userToken[0]["id"])) {
                                    $auth->markAsExpired($userToken[0]["id"]);
                                }
                                // Insert new token
                                $auth->insertToken($username, $random_password_hash, $random_selector_hash, $expiry_date);
                            } else {
                                $util->clearAuthCookie();
                            }

                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            
                            
                            // Redirect user to welcome page
                            // header("location: welcome.php");
                            echo 1;
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "The password you entered was not valid.";
                            $err = "The password you entered was not valid.";
                            $error = true;
                        }
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "No account found with that username.";
                    $err = "No account found with that username.";
                    $error = true;
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }

            // Close statement
            unset($stmt);
        }
    }
    if(!empty($err)){
        echo $err;
    }
    // Close connection
    unset($pdo);
}
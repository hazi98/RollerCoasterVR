<?php
session_start();
// Check if the user is already logged in, if yes then redirect him to welcome page
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === false) {
    echo 0;
    exit;
}
// Include config file
require_once "config.php";
// Include API file
require_once "apiUtils.php";

$transactionid = $_GET["transactionid"];
$transaction = 'purchases';
$getresult =  delete_from_api_id($transactionid, $transaction);

header('Location: index.html');
exit;

<?php
session_start();
// Check if the user is already logged in, if yes then redirect him to welcome page
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === false) {
    echo 0;
    exit;
}
// Include config file
require_once "config.php";

// API BASE URL
$url = "http://127.0.0.1:3000/";
// Get transaction type
$transaction = $_POST["transaction"];
// Remove transaction data from POST
unset($_POST["transaction"]);

// Convert strings to numbers
$_POST["adults"] = (int) $_POST["adults"];
$_POST["children"] = (int) $_POST["children"];
$_POST["fk_users"] = (int) $_POST["fk_users"];

// Switch transaction types
switch ($transaction) {
    case 'parks':
        $url .= 'parks';
        break;
    case 'tours':
        $url .= 'tours';
        break;
    case 'transport':
        $url .= 'transports';
        break;
    case 'attractions':
        $url .= 'attractions';
        break;
    case 'shows':
        $url .= 'shows';
        break;
    default:
        echo 'Invalid transaction type.';
        exit;
}

// Convert to JSON
$content = json_encode($_POST);

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt(
    $curl,
    CURLOPT_HTTPHEADER,
    array("Content-type: application/json")
);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

$json_response = curl_exec($curl);

$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($status != 200) {
    die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
} else {
    // Close current curl
    curl_close($curl);

    // Decode JSON response
    $json_response = json_decode($json_response);

    // Create purchase transaction historic
    $purchasedata = array(
        'fk_users' => $_POST["fk_users"],
        'name' => $transaction,
        'transaction_id' => $json_response->id,
    );

    $curl = curl_init('http://127.0.0.1:3000/purchases');
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt(
        $curl,
        CURLOPT_HTTPHEADER,
        array("Content-type: application/json")
    );
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($purchasedata));

    $json_response = curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if ($status != 200) {
        die("Error: call to Purchases failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    } else {
        echo 1;
    }
}

curl_close($curl);

$response = json_decode($json_response, true);

<?php
$url = 'http://127.0.0.1:3000/transports/1';
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt(
    $curl,
    CURLOPT_HTTPHEADER,
    array("Content-type: application/json")
);

$json_response = curl_exec($curl);

$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($status != 200) {
    die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
} else {
    // Close current curl
    curl_close($curl);

    // Decode JSON response
    $json_response = json_decode($json_response);
    echo $json_response;
}

// Close current curl
curl_close($curl);

<?php
function checkIsAValidDate($datestring)
{
    if (($timestamp = strtotime($datestring)) == true) {
        $dateparse = date_parse($datestring);
        if ($dateparse["year"] == false && $dateparse["month"] == false && $dateparse["day"] == false) {
            // Return only time
            // return date('Y-m-d H:i:s', $timestamp);
            return gmdate('H:i:s', $timestamp);
        } else if ($dateparse["hour"] == 0 && $dateparse["minute"] == 0 && $dateparse["second"] == 0) {
            // Return only date
            return gmdate('Y-m-d', $timestamp);
        } else {
            return gmdate('Y-m-d H:i:s', $timestamp);
        }
    } else {
        return $datestring;
    }
}

function get_from_api_user($userid, $route)
{
    $url = 'http://127.0.0.1:3000/users/' . $userid . '/' . $route;
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
        // Decode JSON response
        $json_response = json_decode($json_response);
        return $json_response;
    }
    // Close current curl
    curl_close($curl);
}

function get_from_api_id($id, $route)
{
    $url = 'http://127.0.0.1:3000/' . $route . '/' . $id;
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
        // Decode JSON response
        $json_response = json_decode($json_response);
        return $json_response;
    }
    // Close current curl
    curl_close($curl);
}

function delete_from_api_id($id, $route)
{
    $url = 'http://127.0.0.1:3000/' . $route . '/' . $id;
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $json_response = curl_exec($curl);

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($status != 204) {
        die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
    } else {
        // Decode JSON response
        $json_response = json_decode($json_response);
        return $json_response;
    }
    // Close current curl
    curl_close($curl);
}

<?php
// Initialize the session
session_start();

// Include config file
require_once "config.php";
//:3
$errors = [];

if (isset($_POST['forgot'])) {
    // $email = mysqli_real_escape_string($db, $_POST['email']);
    // ensure that the user exists on our system
    $sql = "SELECT email FROM users WHERE email = :email";
    // $results = mysqli_query($db, $sql);
    if ($stmt = $pdo->prepare($sql)) {
        // Bind variables to the prepared statement as parameters
        $stmt->bindParam(":email", $email, PDO::PARAM_STR);
        // Set parameters
        $email = trim($_POST["email"]);
        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            $result =  $stmt->fetchAll();
            if (empty($email)) {
                array_push($errors, "Your email is required");
            }
            if (!$result) {
                array_push($errors, "Sorry, no user exists on our system with that email");
            }
        }
        // Close statement
        unset($stmt);

        // generate a unique random token of length 100
        $token = bin2hex(random_bytes(50));

        if (count($errors) == 0) {
            // store token in the password-reset database table against the user's email
            // $sql = "INSERT INTO password_reset(email, token) VALUES ('$email', '$token')";
            $sql = "INSERT INTO password_resets (email, token) VALUES (:email, :token)";
            // $results = mysqli_query($db, $sql);
            if ($stmt = $pdo->prepare($sql)) {
                // Bind variables to the prepared statement as parameters
                $stmt->bindParam(":email", $email, PDO::PARAM_STR);
                $stmt->bindParam(":token", $token, PDO::PARAM_STR);
                // Attempt to execute the prepared statement
                if ($stmt->execute()) {
                    // Send email to user with the token in a link they can click on
                    $to = $email;
                    $subject = "Magic Sans - Password Reset";
                    $msg = "Hi there, click on this http://localhost/RollerCoasterVR/reset.html?token=" . $token . " link to reset your password on our site";
                    $msg = wordwrap($msg, 70);
                    $headers = "From: contact@ochrefox.net";
                    $success = mail($to, $subject, $msg, $headers);
                    if ($success) {
                        // header('location: pending.php?email=' . $email);
                        echo 1;
                    }
                }
            }
        }
    }
    if (count($errors) > 0) { ?>
        <div class="msg">
            <?php foreach ($errors as $error) : ?>
                <span><?php echo $error ?></span>
            <?php endforeach ?>
        </div> <?php
            }
            // Close connection
            unset($pdo);
        }

                ?>
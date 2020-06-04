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

$userid = $_GET["userid"];
$transactions = array('attractions', 'parks', 'shows', 'tours', 'transports');
foreach ($transactions as &$transaction) {
?>
    <div class="card mt-4">
        <div class="card-body">
            <h2><?php echo $transaction ?></h2>
            <hr>
            <?php
            $getresult =  get_from_api_user($userid, $transaction);
            foreach ($getresult as $idx => $res) {
            ?>
                <h3 class="card-title mt-4">#<?php echo $idx ?></h3>
                <h6 class="card-subtitle mb-2 text-muted"><?php echo $transaction ?></h6>
                <?php
                foreach ($res as $name => $value) {
                ?>
                    <span class="card-text font-weight-bold"><?php echo $name ?>:</span>
                    <span class="card-text"><?php echo checkIsAValidDate($value) ?></span>
                    <br>
                <?php
                }
                ?>
            <?php
            }
            ?>
        </div>
    </div>
<?php
}

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
$transaction = 'purchases';
$getresult =  get_from_api_user($userid, $transaction);


foreach ($getresult as $idx => $res) {
?>
    <div class="card mt-4" style="width: 18rem;">
        <div class="card-body">
            <h3 class="card-title">#<?php echo $idx ?></h3>
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
            <a id="delete_btn_<?php echo $idx ?>" data-target="php/deletePurchase.php?userid=<?php echo $userid ?>&transactionid=<?php echo $res->id ?>" class="btn btn-outline-danger mt-2">Delete entry</a>
        </div>
    </div>
<?php
}

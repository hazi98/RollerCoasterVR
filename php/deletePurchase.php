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
$getresult =  get_from_api_id($transactionid, $transaction);

?>
<div class="card mt-4" style="width: 18rem;">
    <div class="card-body">
        <h3 class="card-title">Confirm delete</h3>
        <?php
        foreach ($getresult as $name => $value) {
        ?>
            <span class="card-text font-weight-bold"><?php echo $name ?>:</span>
            <span class="card-text"><?php echo checkIsAValidDate($value) ?></span>
            <br>
        <?php
        }
        ?>
        <a id="delete_btn_confirm" href="php/deletePurchaseConfirm.php?transactionid=<?php echo $transactionid ?>" class="btn btn-danger mt-2">Delete</a>
    </div>
</div>
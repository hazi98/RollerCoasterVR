<?php
$connect = mysqli_connect("localhost","usuario","admin","magicsans");
if(isset($_POST["insert"]))
{
    $file = addslashes(file_get_contents($_FILES["images"]["tmp_name"]));
    $query = "INSERT INTO attractions(images) VALUES ('$file')";
    if(mysqli_query($connect, $query))
    {
        echo '<script>alert("image inserted into database")</script>';
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form method="post" enctype="multipart/form-data" action="">
        <input type="file" name="image" id="image">
        <br>
        <input type="submit" name="insert" id="insert" value="Insert">
    </form>
    <br>
    <br>
    <table class="table table-bordered">
        <tr>
            <th>Image</th>
        </tr>
        <?php
        $query = "SELECT images FROM attractions ORDER BY id DESC";
        $result = mysqli_query($connect, $query);
        while($row = mysqli_fetch_array($result))
        {
            echo '
                <tr>
                    <td>
                        <img src="data:image/jpeg;base64,'.base64_encode($row['name']).'">
                    </td>
                </tr>
            ';
        }
        ?>
    </table>
</body>

</html>

<script>
    $(document).ready(function () {
        $('#insert').click(function () {
            var image_name = $('#image').val();
            if (image_name == '') {
                alert("Please select image");
                return false;
            } else {
                var extension = $('image').val().split('.').pop().toLowerCase();
                if (jQuery.inArray(extension, ['gif', 'png', 'jpg', 'jpeg']) == 1) {
                    alert("invalid type of image");
                    $('#image').val('');
                    return false;
                }
            }
        });
    });
</script>
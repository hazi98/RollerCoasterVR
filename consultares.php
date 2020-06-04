        <?php
        $servername = "localhost";
        $username = "usuario";
        $password = "admin";
        $dbname = "magicsans";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        $stmt = $conn->prepare("SELECT `Type`, `Name`, `Amount`,`Date`, id FROM `reservations` WHERE id=? ");
        $stmt->bind_param("i", $id);
        $id = $_POST["id"];
        $stmt->execute();
        $result = $stmt->get_result();
        //!empty($result) && $result->num_rows > 0

        if ($result->num_rows > 0) {
            echo '<table class="table table-hover table-responsive">';
            echo "<tr><th>Tipo</th><th>Nombre</th><th>Cantidad</th></tr>";
            while ($row = $result->fetch_assoc()) {
                echo "<tr><td>" . $row["Type"] . "</td><td>" . $row["Name"] . "</td><td> " . $row["Amount"] . "</td><td> " . $row["Date"] . "</td><td> " . $row["id"] . "</td></tr>";
            }
            echo '</table>';
        } //if
        else {
            echo 'No hay registros';
        } //else
        $stmt->close();
        $conn->close();

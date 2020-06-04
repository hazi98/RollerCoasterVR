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

                $stmt = $conn->prepare("SELECT `Type`, `Name`, `Amount`,id FROM `purchases` WHERE `user-key`=? ");
                $stmt->bind_param("i", $userkey);
                $userkey = $_POST["user-key"];
                //$stmt->execute();
                //o espera, creo que podemos combinar los dos en uno
                // de momento no lo hagas, a ver si se puede poner junto
                //ok

                $result = $stmt->get_result();


                if ($result->num_rows > 0) {
                    echo '<table class="table table-hover table-responsive">';
                    echo "<tr><th>Tipo</th><th>Nombre</th><th>Cantidad</th></tr>";
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr><td>" . $row["Type"] . "</td><td>" . $row["Name"] . "</td><td> " . $row["Amount"] . "</td><td> " . $row["id"] . "</td></tr>";
                    }
                    echo '</table>';
                } //if
                else {
                    echo 'No hay registros';
                } //else
                $stmt->close();
                $conn->close();

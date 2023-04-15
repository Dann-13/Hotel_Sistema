<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="../../public/img/Tumaco/logo1-removebg-preview.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/admin.css">
    <script src="https://kit.fontawesome.com/b049437614.js" crossorigin="anonymous"></script>

    <title>Administrador</title>

</head>

<body>
    <header>
        <div class="encabezado">
            <div class="imgClass">
                <img src="../../public/img/Tumaco/logo1-removebg-preview.png" alt="">
            </div>
            <a href="#" class="btn__User">Usuarios</a>
            <a href="admin_reservas.php" class="btn__reserva">Reservas</a>
        </div>
    </header>
    <main>
        <h2>Bienvenido! Administrador1</h2>
        <div class="contenido">
            <div class="imgClass">
                <img src="../../public/img/admin.svg" alt="" srcset="">
            </div>
            <div class="tabla">
                <table>
                    <thead>
                        <caption>Lista de Usuarios Registrados</caption>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo electrónico</th>
                            <th>Contraseña</th>
                            <th colspan="2">Opciones</th> <!-- Columna unida que contiene dos columnas más -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>john.doe@example.com</td>
                            <td>********</td>
                            <td><button class="btn__edit">Editar</button></td>
                            <td><button class="btn__delete">Eliminar</button></td>
                        </tr>
                        <!-- Más filas de datos -->
                    </tbody>
                </table>

            </div>
        </div>
    </main>
    <footer>
        <div class="contenido__footer">
            <p>Desarrollado por: equipo 1 Aunar xd</p>
            <div class="redes">
                <a href="https://github.com/Dann-13/Hotel_Sistema_php"><i class="fa-brands fa-github"></i></a>
                <a href=""><i class="fa-brands fa-facebook"></i></a>
            </div>
        </div>
    </footer>
</body>

</html>
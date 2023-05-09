<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/admin.css">
    <link rel="stylesheet" href="../../public/css/editar.css">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet">

    <title>Editar Producto</title>
</head>

<body>
    <header>
        <div class="encabezado">
            <div class="imgClass">
                <img src="../../public/img/Tumaco/logo1-removebg-preview.png" alt="">
            </div>
            <a href="admin_usuarios.php" class="btn__reserva">Volver</a>
            <a href="../../public/index.php" class="btn__reserva">Salir</a>
        </div>
    </header>
    <main class="container">
        <section class="card cadastro">
            <div class="signupFrm">
                <form action="#" class="form" id="update-product-form" data-form>
                    <h1 class="title">Editar Usuario</h1>

                    <div class="inputContainer">
                        <input type="text" class="input" placeholder="a" name="url" data-url>
                        <label for="" class="label">Nombre</label>
                    </div>

                    <div class="inputContainer">
                        <input type="text" class="input" placeholder="a" name="name" data-nombre>
                        <label for="" class="label">Correo</label>
                    </div>

                    <div class="inputContainer">
                        <input type="text" class="input" placeholder="a" name="price" data-precio>
                        <label for="" class="label">Contraseña</label>
                    </div>

                    <div class="inputContainerButton">
                        <input type="submit" class="submitBtn" value="Actualizar">

                    </div>
                </form>
            </div>
        </section>
    </main>
    <script type="Module" src="/controllers/editar-controller.js"></script>
</body>

</html>
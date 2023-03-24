<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/login_register.css">
    <title>Bienvenidos</title>
</head>

<body>
    <div class="container__Principal">
        <div class="imagen__fondo">
            <img src="../../public/img/fondo.png" alt="fondo" srcset="">
        </div>
        <section class="left">

            <section class="lado-login">
                <p class="title">¿No Tienes una Cuenta?</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque quod doloribus, similique illo
                    aliquam
                    recusandae quisquam reiciendis dignissimos laborum non quidem, voluptatibus fuga repudiandae
                    deserunt
                    porro
                    inventore neque saepe exercitationem!</p>
                <button class="btn__registro">Registro</button>
                <img src="../../public/img/recepcion.png" alt="recepcion">
            </section>
            <section class="main-register">
                <div class="container">
                    <h1>Register</h1>
                    <form action="">
                        <div class="form-control">
                            <input type="text" placeholder="Usuario">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="form-control">
                            <input type="password" placeholder="Contraseña">
                            <i class="fas fa-unlock"></i>
                        </div>
                        <button type="submit">Registro</button>
                    </form>
                </div>
            </section>
        </section>
        <section class="right">
            <section class="lado-registro">
                <p class="title">¿Ya estas Registrado?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure vitae dolores maxime voluptas tenetur
                    ex, aliquam nam dignissimos in possimus non obcaecati quo officia rem corrupti et, quisquam, id
                    fugit!</p>
                <button btn="btn__login">Login</button>
                <img src="../../public/img/login.png" alt="" srcset="">
            </section>
            <section class="main-login">
                <div class="Container">
                    <h1>Login</h1>
                    <form action="">
                        <div class="form-control">
                            <input type="text" placeholder="Usuario">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="form-control">
                            <input type="password" placeholder="Contraseña">
                            <i class="fas fa-unlock"></i>
                        </div>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </section>
        </section>

    </div>
    <script src="../../public/js/login_register.js"></script>
</body>

</html>
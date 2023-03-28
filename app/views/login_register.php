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
                <p>Puedes registrate dando click al siguiente boton!</p>
                <button class="btn__registro">Registro</button>
                <div class="imgSecciones">
                    <img src="../../public/img/recepcion.png" alt="recepcion">
                </div>

            </section>
            <section class="main-register">
                <div class="container">
                    <h1>Register</h1>
                    <form action="">
                        <div class="form-control">
                            <input type="email" placeholder="Correo">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="form-control">
                            <input type="password" placeholder="Contraseña">
                            <i class="fas fa-unlock"></i>
                        </div>
                        <div class="form-control">
                            <input type="text" placeholder="Nombre">
                            <i class="fa-solid fa-signature"></i>
                        </div>
                        <div class="form-control">
                            <input type="text" placeholder="Apellido">
                            <i class="fa-solid fa-signature"></i>
                        </div>
                        <button type="submit">Registro</button>
                    </form>
                </div>
            </section>
        </section>
        <section class="right">
            <section class="lado-registro">
                <p class="title">¿Ya estas Registrado?</p>
                <p>Regresa e inicia secion con tu usuario y conteaseña</p>
                <button class="btn__login">Login</button>
                <div class="imgSecciones">
                    <img src="../../public/img/login.png" alt="" srcset="">
                </div>
            </section>
            <section class="main-login">
                <div class="container">
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
    <script src="https://kit.fontawesome.com/b049437614.js" crossorigin="anonymous"></script>
</body>

</html>
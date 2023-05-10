<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Reservas usuario    </title>
  <link rel="stylesheet" href="../../public/css/admin.css">
  <link rel="stylesheet" href="../../public/css/estilos_usuarios.css">
  <link rel="shortcut icon" href="../../public/img/Tumaco/logo1-removebg-preview.png" type="image/x-icon">
  <script src="https://kit.fontawesome.com/b049437614.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
    crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  <script>
    $(function () {
      $("#datepicker").datepicker();
    });
  </script>
</head>

<body>

  <header>
    <div class="encabezado">
      <div class="imgClass">
        <img src="../../public/img/Tumaco/logo1-removebg-preview.png" alt="">
      </div>
      <a href="../views/reserva.php" class="btn__User">Reservar</a>
      <a href="../views/listado_reserva.php" class="btn__reserva">Mirar mis reservas</a>
    </div>
  </header>

  <div class="container text-center">
    <div class="row align-items-start">
      <div class="row align-items-start">
        <div class="container text-center">
          <img
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29uYXxlbnwwfHwwfHw%3D&w=1000&q=80"
            width="100" height="100">
          <div>
            <label for="" style="margin-top: 20px;">Mark Suqenver</label>
            <select class="form-select" aria-label="Default select example"
              style="margin-top: 20px; width: 400px;margin-left: auto; margin-right: auto;">
              <option selected>Tipo de reserva</option>
              <option value="1">Estandar</option>
              <option value="2">Estandar plus</option>
              <option value="3">Suite</option>
            </select>
          </div>
        </div>
        <div class="col" style="margin-top: 20px;">
          <p>Fecha inicio: <input type="text" id="datepicker">
          <p>Fecha salida: <input type="text" id="datepicker">
        </div>
      </div>
      <div><p>280.000</p></div>
      <div><button style="margin-top: 10px; background-color: #776cd4; color:white; border-radius: 10px; ">Confirmar</button></div>
    </div>


    <footer>
      <div class="contenido__footer">
        <p>Desarrollado por: equipo 1 Aunar xd</p>
        <div class="redes">
          <a href="https://github.com/Dann-13/Hotel_Sistema_php"><i class="fa-brands fa-github"></i></a>
          <a href=""><i class="fa-brands fa-facebook"></i></a>
        </div>
      </div>
    </footer>


</html>
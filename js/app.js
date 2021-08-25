window.onload = function () {
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal = document.getElementById("principal");
    redactar = document.getElementById("redactar");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnIngresar = document.getElementById("btnIngresar");
    txtCorreoI = document.getElementById("correoI");
    txtContrasenaI = document.getElementById("contrasenaI");
    nombreP = document.getElementById("nombreP");

   
    btnEnviar = document.getElementById("btnEnviarMensaje");
    txtpara = document.getElementById("correoM");
    txtmensaje = document.getElementById("mensajeM");

    photo = document.getElementById("photo");
    camara = document.getElementById("camara");
    camera = document.getElementById("camera");
    mensajes = document.getElementById("mensajes");




    if(localStorage.getItem("login") !== "1"){
      ingreso.style.display ="block";
      principal.style.display = "none";
      redactar.style.display = "none";
      document.getElementById("camara").style.display = "none";
    }
    else{
      ingreso.style.display = "none";
      principal.style.display = "block";
      redactar.style.display = "block";
      nombre = localStorage.getItem("nombre");
      correo = localStorage.getItem("correo");
      document.getElementById("nombreP").innerHTML = nombre;
      leerM();
    }

}



    btnRegistrar.addEventListener("click", function () {
    document.getElementById("ingreso").style.display = "none";
    document.getElementById("registro").style.display = "block";
    });


    btnRegistro.addEventListener("click", function () {

        if(txtCorreo.value=="") {
            alert("Debe escribir el correo");
            txtCorreo.classList.add("errorCampo");
            return false;
        }
        else {
            txtCorreo.classList.remove("errorCampo");
        }

        if(txtNombre.value=="") {
            alert("Debe escribir el nombre");
            txtNombre.classList.add("errorCampo");
            return false;
        }
        else {
            txtNombre.classList.remove("errorCampo");
        }

        if(txtContrasena.value=="") {
            alert("Debe escrbir la contraseña");
            txtContrasena.classList.add("errorCampo");
            return false;
        }
        else
        {
            txtContrasena.classList.remove("errorCampo");
        }

        if(txtConfirmacion.value=="")
        {
            alert("Debe confirmar la contraseña");
            txtConfirmacion.classList.add("errorCampo");
            return false;
        }
        else
        {
            txtConfirmacion.classList.remove("errorCampo");
        }

        if(txtContrasena.value !== txtConfirmacion.value)
        {
            alert("La contraseña no es la misma");
            txtConfirmacion.classList.add("errorCampo");
            return false;
        }
        else
        {
            txtConfirmacion.classList.remove("errorCampo");
        }

        if(txtFecha.value=="")
        {
            alert("Debe escribir la fecha");
            txtFecha.classList.add("errorCampo");
            return false;
        }
        else
        {
            txtFecha.classList.remove("errorCampo");
        }

        let datos = new FormData();
        datos.append("correoR", txtCorreo.value);
        datos.append("nombreR", txtNombre.value);
        datos.append("contrasenaR", txtContrasena.value);
        datos.append("fechaR", txtFecha.value);

        fetch("http://tpaeavm.orgfree.com/registro.php",{
            method: 'POST', // *GET, POST, PUT, DELETE, ETC...
            body:datos
        })
        .then(function(response){
            if(response.ok){
                alert("Usuario registrado");
            }
            else{
                alert("Ocurrió un error al registrar");
                console.log(response);
            }
        })
        .catch(function(err){
            alert("Ocurrió un error inesperado");
            console.log(err);
        })

    });


    btnIngresar.addEventListener("click", function () {
        if(txtCorreoI.value == "") {
            alert("Debe escribir el correo");
            txtCorreoI.classList.add("errorCampo");
            return false;
        }
        else {
            txtCorreoI.classList.remove("errorCampo");
        }

        if(txtContrasenaI.value== "") {
            alert("Debe escribir la contraseña");
            //txtContrasenaI.classList.add("errorCampo");
            return false;
        }
        else {
            txtContrasenaI.classList.remove("errorCampo");
        }

        //let declara datos
        let datosI = new FormData();
        datosI.append("correoI", txtCorreoI.value);     
        datosI.append("contrasenaI", txtContrasenaI.value);
        

        fetch("http://tpaeavm.orgfree.com/ingreso.php", {
            method: 'POST', // *GET, POST, PUT, DELETE, ETC...
            body: datosI
        })

        .then(function(response){
           return response.json();
        })

        .then(function(data){
            if (data.fallo == "contrasena") { //contrasena
                alert("Debe escribir la contraseña correcta");
            }
            else if(data.fallo == "usuario") {
                alert("El corrreo no esta registrado");
            }
            else {
                nombre = data.nombre;
                correo = data.correo;
                ingreso.style.display = "none";
                principal.style.display = "block";
                nombreP.innerHTML = nombre;
                localStorage.setItem("login", 1);
                localStorage.setItem("nombre", nombre);
                localStorage.setItem("correo", correo);

                leerM()
            }
        })

        .catch(function(err){
            alert("Ocurrió un error inesperado");
            console.log(err);
        });

    });



    btnEnviar.addEventListener("click", function () {
        if(txtpara.value == "") {
            alert("Debe escribir el correo a quien se le mandará el mensaje");
            txtpara.classList.add("errorCampo");
            return false;
        }
        else {
            txtpara.classList.remove("errorCampo");
        }

        if(txtmensaje.value== "") {
            alert("Debe escribir el mensaje que quiere enviar");
            txtmensaje.classList.add("errorCampo");
            return false;
        }
        else {
            txtmensaje.classList.remove("errorCampo");
        }

        //let declara datos
        let datosE = new FormData();
        datosE.append("correoM", txtpara.value);     
        datosE.append("mensajeM", txtmensaje.value);
        
        fetch("http://tpaeavm.orgfree.com/registrarMensaje.php", {
            method: 'POST', // *GET, POST, PUT, DELETE, ETC...
            body: datosE
        })
        
        .then(function(response){
            if(response.ok){
                alert("Su mensaje ha sido enviado");
            }
            else{
                alert("Error al enviar su mensaje");
                console.log(response);
            }
        })
        .catch(function(err){
            alert("Ocurrio un error inesperado");
            console.log(err);
        })
    })
    


    function abrirBarra()
  {
    document.getElementById("barraMenu").style.width = "250px";
  }
  
    function cerrarBarra()
  {
    document.getElementById("barraMenu").style.width = "0";
  }



  function leerM(){
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
  
    fetch("http://tpaeavm.orgfree.com/LeerMensajes.php",{
      method: 'POST', 
      body:datosLM
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      for(let x = 0; x < data.length; x++) {
        document.getElementById("mensajes").innerHTML = document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" + data[x].fechaHora + "<br>";
      }
    })
    .catch(function(err){
      alert("Ocurrio un error inesperado");
      console.log(err);
    });
  }

  function obtenerSO(){
      let so = null;
      let platform = window.navigator.platform,iosPlatforms = ['iPhone', 'iPad', 'iPod'];
      if (iosPlatforms.includes(platform)) {
          so = 'iOS';
      }
      return so;
  }
  
  function tomarFoto(){
    redactar.style.display = "none";
    mensajes.style.display = "none";
    //document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "block";
    cerrarBarra();
  }
  
  document.getElementById("open").addEventListener("click", function() {
    camera.click();
  });

  //document.getElementById("camara").addEventListener("click", function() {
    //document.getElementById("camara").innerHTML = camara;
    camera.addEventListener("change", function(e) {
    ruta = URL.createObjectURL(e.target.files[0]);
    //photo.src = URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src = ruta;
    if (obtenerSO() == "iOS") {
    let link = document.createElement('a');
    link.download = "test.png";
    //link.href = photo.toDataURL("image/png").replace("image/png", "image/octect-stream");
    link.href = ruta;
    link.click();
    alert("Foto Capturada");
    }
  });

  mapa.addEventListener('click', function() {
      window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon" + coordenadas.lon + "&zoom=20");
  });

  function obtenerLugar() {
      coordenadas = {lat: 0, lon: 0};
      navigator.geolocation.getCurrentPosition(function(position) {
          coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
        .then(response => response.json())
        .then(data => {
            document.getElementById("lugar").value = data.address.country + " " + data.address.state;
        })
        .catch(error => 
            console.log(err));
            coordenadas = {lat: 0, lon: 0};
      });
  }

  function cerrarSesion(){
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    redactar.style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";
  }
  
  function msj() {
    redactar.style.display = "block";
    document.getElementById("mensajes").style.display = "block";
    document.getElementById("camara").style.display = "none";
    cerrarBarra();
  }


  
  
  
  
  
  
  
  
  
  
  


  


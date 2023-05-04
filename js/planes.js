let listaPlanesInternet = [
    { precio: 200, datos: "5GB" },
    { precio: 400, datos: "10GB" },
    { precio: 600, datos: "15GB" },
    { precio: 800, datos: "20GB" },
    { precio: 1000, datos: "30GB" },
    { precio: 1200, datos: "45GB" },
    { precio: 1400, datos: "65GB" },
    { precio: 1600, datos: "80GB" },
    { precio: 1800, datos: "100GB" },
  ];


let listaPlanesCable = [
    {
        "nombre": "Plan Básico",
        "descripcion": "Accede a canales nacionales y algunos internacionales.",
        "precio_mensual": 100,
        "canales": "80 canales",
        "calidad_video": "Calidad de imagen SD",
        "internet_incluido": "No incluye internet"
    },
    {
        "nombre": "Plan Intermedio",
        "descripcion": "Accede a canales nacionales, internacionales y algunos deportivos.",
        "precio_mensual": 150,
        "canales": "100 canales",
        "calidad_video": "Calidad de imagen HD",
        "internet_incluido": "Más 4 MB de internet"
    },
    {
        "nombre": "Plan Avanzado",
        "descripcion": "Accede a canales nacionales, internacionales, deportivos y de películas.",
        "precio_mensual": 200,
        "canales": "120 canales",
        "calidad_video": "Calidad de imagen Full HD",
        "internet_incluido": "Más 8 MB de internet"
    },
    {
        "nombre": "Plan Premium",
        "descripcion": "Accede a canales nacionales, internacionales, deportivos y de películas.",
        "precio_mensual": 500,
        "canales": "120 canales",
        "calidad_video": "Calidad de imagen 4K",
        "internet_incluido": "Más 35 MB de internet"
    }

]

$(function () {
   $("#Planes").change(function () { 
    $("#PanelPlanes").html(null);
    let plan = $("#Planes").val()
    
    switch (plan) {
        case '1':
            drawPlanesCable();
        break;
        case '2':
            drawPlanesInternet();
        break;
        case '3':
            
        break;
    
        default:
            break;
    }
    
   });

});

const drawPlanesCable = () => {
    $("#PanelPlanes").html(null);
    let contador = 0;
    for (const plan of listaPlanesCable) {
        contador++;
        
        let html = `                
        <div class="card col-md-auto mx-3 p-4 mt-3" style="width: 18rem;">
            <div class="bg-danger rounded-top">
                <center><h6 class="text-light">${plan.nombre}</h6></center>
            </div>
            <div class="card-body bg-light-opac rounded">
                <h6 class="card-title text-danger"><b><center> Q${plan.precio_mensual}</center><small><center><p>al mes</p></center></small></b></h6>
                <hr>
                <span><center>${plan.internet_incluido}</center></span>
                <hr>
            </div>
            <div class="card-body">
                <button class="btn btn-rounded red ">Comprar</button>
                <button class="btn btn-rounded "type="button" data-toggle="collapse" data-target="#collapseExample${contador}" aria-expanded="false" aria-controls="collapseExample${contador}">Ver detalles</button>
                <div class="collapse" id="collapseExample${contador}">
                    <div class="card card-body">
                        <hr>
                        <span>${plan.descripcion}</span>
                        <hr>
                        <span>
                        ${plan.canales}
                        </span>
                        <hr>
                        <span>
                        ${plan.calidad_video}
                        </span>
                        <hr>
                        <span>
                        ${plan.internet_incluido}
                        </span>
                        <hr>
                    </div>
            
                </div>
            </div>
        </div>`
    $("#PanelPlanes").append(html);
    }


}

const drawPlanesInternet = () => {

    $("#PanelPlanes").html(null);
    let contador = 0;
    for (const plan of listaPlanesInternet) {
        contador++;
        let html = `                
        <div class="card col-md-auto mx-3 p-4 mt-3" style="width: 18rem;">
        <div class="bg-danger rounded-top">
            <center><h6 class="text-light">postpago</h6></center>
        </div>
        <div class="card-body bg-light-opac rounded">
          <h6 class="card-title text-danger"><b><center> Q${plan.precio}</center><small><center><strong>${plan.datos} de internet</strong><p>al mes</p></center></small></b></h6>
          <hr>
          <span><center>Todo incluido</center></span>
          <hr>
        </div>
        <ul class="list-group list-group-flush text-center" >
          <li class="list-group-item green text-white rounded">Spotify</li>
          <li class="list-group-item blue text-white rounded">Facebook</li>
          <li class="list-group-item bg-dark text-white rounded">TikTok</li>
        </ul>
        <div class="card-body">
          <button class="btn btn-rounded red ">Comprar</button>
          <button class="btn btn-rounded "type="button" data-toggle="collapse" data-target="#collapseExample${contador}" aria-expanded="false" aria-controls="collapseExample${contador}">Ver detalles</button>
          <div class="collapse" id="collapseExample${contador}">
            <div class="card card-body">
            <hr>
                <p>Redes ilimitadas 
                    <span>
                        <i class="fab fa-facebook"></i>
                        <i class="fab fa-facebook-messenger"></i>
                        <i class="fab fa-whatsapp"></i>
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-snapchat"></i>
                    </span>
                </p>
                <hr>
                <small>
                    <i class="far fa-clock"> minutos ilimitados</i>
                    <br> 
                    para todos los operadores en Guatemala y CentroAmerica
                </small>
                <hr>
                <small>
                    <i class="far fa-comment-alt"> SMS</i>
                     <br>
                     ilimitados para todos los operadores
                </small>
                <hr>
            </div>
            
          </div>
        </div>
    </div>`
    $("#PanelPlanes").append(html);
    }

    

}
let listaPaginas = [
  {
    idMenu: 1,
    icono: "supervisor_account",
    menu: "Supervisor",
    path: "supervisor.html",
    pagina: "Supervisores"
  },
  {
    idMenu: 1,
    icono: "supervisor_account",
    menu: "Supervisor",
    path: "listaOrdenesTrabajo.html",
    pagina: "Ordenes de Trabajo"
  },
  {
    idMenu: 2,
    icono: "build",
    menu: "Instalador",
    path: "cliente.html",
    pagina: "Clientes"
  },
  {
    idMenu: 3,
    icono: "store",
    menu: "Vendedor",
    path: "vendedor.html",
    pagina: "Vendedores"
  },
  {
    idMenu: 4,
    icono: "person",
    menu: "Cliente",
    path: "menuCliente.html",
    pagina: "Consulte compre y pague"
  },  
  {
    idMenu: 4,
    icono: "person",
    menu: "Cliente",
    path: "menuPagar.html",
    pagina: "Pagar"
  },
  {
    idMenu: 4,
    icono: "person",
    menu: "Cliente",
    path: "menuConsultar.html",
    pagina: "Facturas planes y consumos"
  },
  {
    idMenu: 4,
    icono: "person",
    menu: "Cliente",
    path: "planes.html",
    pagina: "Planes"
  },
];


const user = "Dani";
var url = window.location;
const Apiurl = "https://localhost:7283/api/";

$(function () {
    
    if(user == ""){
        window.location = ".../login.html";
    }

-
    $("#left-menu").click(function () { 
        $("body").toggleClass('sidebar-left-close');
        
    });

    getPermisos();

    setTimeout(function () { $(".loader-logo").fadeOut()}, 3000);

    //$('#txtName').text(localStorage.NameUser);
    //$("#namePlanta").text(localStorage.NamePlanta);

    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let date = new Date();

    const hora = (parseInt(date.getHours()) < 10  ? "0" + date.getHours() : date.getHours()) + ":" + ( (parseInt(date.getMinutes()) < 10  ? "0" + date.getMinutes() : date.getMinutes()));

    $('#DaySystem').text(date.getDate());
    $('#MonthSystem').text(meses[ date.getMonth()]);
    $('#YearSystem').text(date.getFullYear());
    $('#TimeSystem').text(hora);
  
    $("body").on("click", "#menuAccess .menuOpc", async function (e) {
  
      e.preventDefault();
      const hst = e.target.closest(".idmenu");
      const id = hst.dataset.id;
      mostrarm(id)
    });
  
    $("#btnCerrarSesion").click(function () {
      //localStorage.User = "";
      //localStorage.NameUser = "";
      //window.location = "../login.html";
    });

});





const getPermisos = () => {
  
            let menu = 0;
            let html = '';
            //let existePermiso = false; 
            //existePermiso = pathname == "dashboard.html" || pathname == "cambiarclave.html" ? true : false;
            listaPaginas.forEach(element => {
          
                  if (menu != element.menu) {
          
                    if (menu != 0) {
                      html += `</ul>
                          </li>`;
                    }
          
          
                    html += `<li class="nav-item">
                                <a href="javascript:void(0);" class="menuOpc ${element.idMenu}  nav-link dropdwown-toggle"><i class="material-icons icon">${element.icono}</i> <span class="idmenu" data-id="${element.idMenu}">${element.menu}</span><i class="material-icons icon arrow">expand_more</i></a>
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a href="${element.path}" class="nav-link pink-gradient-active"><i class="material-icons icon"></i> <span>${element.pagina}</span></a>
                                    </li>`;
          
          
                    menu = element.menu;
          
                  } else {
                    html += `<li class="nav-item">
                                      <a href="${element.path}" class="nav-link pink-gradient-active"><i class="material-icons icon"></i> <span>${element.pagina}</span></a>
                                  </li>`
                  }
                
            });

            html += `</ul>
            </li>`;
            $('#menuAccess').html(html);
            menuitems();
            /*if(existePermiso){
                $('#menuAccess').html(html);
            menuitems();
            }else{
                alert('Lo Siento, No posees permiso para acceder a este formulario');
                //window.location = "dashboard.html";
  
            }*/

}


function menuitems() {
    $('.sidebar .nav .nav-item a').filter(
        function () {
            return this.href == url;
        }
        ).addClass('active').parent("li").addClass('active').closest('.nav').slideDown().addClass('in').prev().addClass('active').parent().addClass('show').closest('.nav').slideDown().addClass('in').parent().addClass('show');

}

//muestra el menu
function mostrarm(id) {
    if ($('.' + id).hasClass('active') != true) {
      $('.sidebar .nav .nav-item .dropdwown-toggle').removeClass('active').next().slideUp();
      $('.' + id).addClass('active').next().slideDown();
    } else {
      $('.' + id).removeClass('active').next().slideUp();
    }
  }
  
  $(window).on("load", function () {
    /* hide loader  */
    $(".loader").hide();
    $(".animatejack").addClass("jackInTheBox");
  });
  
  $(window).on("resize", function () {
    /* sidebar hide below 1100px resolution  */
    if ($(window).width() <= 1100) {
      $('body').addClass('sidebar-left-close');
    } else {
      if ($('body').hasClass('boxed-page') === true) {
        $('body').addClass('sidebar-left-close');
      } else {
        $('body').removeClass('sidebar-left-close');
      }
  
    }
  });
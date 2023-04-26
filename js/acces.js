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

    //getPermisos();

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
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      

      fetch(Apiurl+"AsignarPermisos/GetPermiososUsuario/"+user, requestOptions)
        .then(response => response.json())
        .then(result => {
            
            let menu = 0;
            let html = '';
            //let existePermiso = false; 
            //existePermiso = pathname == "dashboard.html" || pathname == "cambiarclave.html" ? true : false;
            result.forEach(element => {

                /*if(element.path == pathname){
                    existePermiso = true;
                  }*/
          
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


        })
        .catch(error => console.log('error', error));


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
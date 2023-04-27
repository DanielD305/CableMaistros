let ListaInstaladores = [];
$(function () {

   

    $('#BtnNew').click(function () {
      $('#mdNuevo').modal('show')
      $("#btnInsert").attr("disabled", false); // habilita
  
    });
  
  
    //Metodo para guardar los datos
    $("#formNuevo").submit(function () {
      $('#btnInsert').attr('disabled', true); //deshabilita
  
      AddInstaladores();
      return false;
  
    });
  
    //Metodo para Actualizar los datos
    $("#formUpdate").submit(function () {
      $('#btnUpdate').attr('disabled', true);
  
      updateInstaladores();
  
      return false;
    });
  
    //Metodo para confirmar la eliminacion
    $("#btnDelete").click(function () {
      $("#btnDelete").attr("disabled", true); //deshabilita
      deleteInstaladores();
    })
  
  
    GetInstaladores();
  });




const GetInstaladores = () => {

    if ($.fn.DataTable.isDataTable("#tableInstaladores")) {
        $("#tableInstaladores").DataTable().destroy();
      }

      ListaInstaladores = localStorage.getItem('ListaInstaladores') != null ? JSON.parse(localStorage.getItem('ListaInstaladores')) : [];

    $("#listInstaladores").html(null);
    let contador = 1;

    
    ListaInstaladores.forEach(element => {
      var tr = `<tr class="odd">
                      <td>${contador}</td>
                      <td>${element.nombre}</td>
                      <td>${element.telPersonal}</td>
                      <td>${element.email}</td>
                      <td class = "center">
                          <span class="btn btn-outline-success btn-sm edit d-grid gap-2 col-5 mx-auto" onclick="openEdit(${element.id})">Editar</span> 
                          <span class="btn btn-outline-danger btn-sm delete d-grid gap-2 col-5 mx-auto" onclick="openDelete(${element.id})" >Eliminar</span>
                      </td>
                      </tr>`;
      $("#listInstaladores").append(tr);
      contador++;
    });

    $("#tableInstaladores").DataTable({
      order: [[0, "asc"]],
      destroy: true,
      language: { "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json" },
    });

}
 
const AddInstaladores = () => {
    try {
        ListaInstaladores.push( {
            id: ListaInstaladores.length + 1,
            nombre: $("#newNombre").val(),
            email: $("#newEmail").val(),
            telPersonal: $("#newTelPer").val()
          });
    
          localStorage.setItem('ListaInstaladores', JSON.stringify(ListaInstaladores));  
    
    
          $.toast({
            heading: "EXITO",
            text: "Instalador agregado con exito",
            showHideTransition: "slide",
            icon: "success",
            position: "bottom-right",
    
          });
    } catch (error) {
        $.toast({
            heading: "ERROR",
            text: error,
            showHideTransition: "slide",
            icon: "error",
            position: "bottom-right",
    
          });
    }
   
    LimpiarForm();
    $("#mdNuevo").modal("hide");

    GetInstaladores();
}

const openEdit = (id) => {

    ListaInstaladores.forEach( element => {

    if(element.id == id){

      $("#idEdit").val(element.id);
      $("#editEmail").val(element.email)
      $("#editNombre").val(element.nombre);
      $("#editTelper").val(element.telPersonal);
    }
  });
  $("#mdEdit").modal("show");
}


const updateInstaladores = () => {

  try 
  {

    let idInstalador = $("#idEdit").val()

    ListaInstaladores.forEach( element => {

      if(element.id == idInstalador){

        element.email = $("#editEmail").val();
        element.nombre = $("#editNombre").val();
        element.telPersonal = $("#editTelper").val();
      }

    });

    let NewList = JSON.stringify(ListaInstaladores);
    localStorage.setItem('ListaInstaladores',NewList);

    $.toast({
      heading: "EXITO",
      text: "Instalador actualizado con exito",
      showHideTransition: "slide",
      icon: "success",
      position: "bottom-right",

    });
  } catch (error) 
  {
    $.toast({
      heading: "ERROR",
      text: error,
      showHideTransition: "slide",
      icon: "error",
      position: "bottom-right",

    });
  }

  LimpiarForm();
  $("#mdEdit").modal("hide");
  GetInstaladores();
}



const openDelete = (id) => {

  $("#mdDelete").modal("show");
  $("#idDelete").val(id);
}

const deleteInstaladores = () => {

  try 
  {
    let id = $("#idDelete").val();
    let NuevaLista = [];

    

    ListaInstaladores.forEach( element => {

      if(element.id != id){
        
        NuevaLista.push(element);
      }

    });

    let NewList = JSON.stringify(NuevaLista);
    localStorage.setItem('ListaInstaladores',NewList);

    $.toast({
      heading: "EXITO",
      text: "Instalador eliminado con exito",
      showHideTransition: "slide",
      icon: "success",
      position: "bottom-right",

    });

    LimpiarForm();
    $("#mdDelete").modal("hide");
    GetInstaladores();

  } catch (error) 
  {
    $.toast({
      heading: "ERROR",
      text: error,
      showHideTransition: "slide",
      icon: "error",
      position: "bottom-right",

    });
    
  }
}


const LimpiarForm = () => {
    $("#formNuevo")[0].reset();
    $("#formUpdate")[0].reset();
    $('button').attr('disabled', false)
  }
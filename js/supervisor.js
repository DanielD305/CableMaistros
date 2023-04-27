let ListaSupervisores = [];
$(function () {

   

    $('#BtnNew').click(function () {
      $('#mdNuevo').modal('show')
      $("#btnInsert").attr("disabled", false); // habilita
  
    });
  
  
    //Metodo para guardar los datos
    $("#formNuevo").submit(function () {
      $('#btnInsert').attr('disabled', true); //deshabilita
  
      AddSupervisores();
      return false;
  
    });
  
    //Metodo para Actualizar los datos
    $("#formUpdate").submit(function () {
      $('#btnUpdate').attr('disabled', true);
  
      updateSupervisores();
  
      return false;
    });
  
    //Metodo para confirmar la eliminacion
    $("#btnDelete").click(function () {
      $("#btnDelete").attr("disabled", true); //deshabilita
      deleteSupervisores();
    })
  
  
    GetSupervisores();
  });




const GetSupervisores = () => {

    if ($.fn.DataTable.isDataTable("#tablesupervisores")) {
        $("#tablesupervisores").DataTable().destroy();
      }

    ListaSupervisores = localStorage.getItem('ListaSupervisores') != null ? JSON.parse(localStorage.getItem('ListaSupervisores')) : [];

    $("#listSupervisores").html(null);
    let contador = 1;

    
    ListaSupervisores.forEach(element => {
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
      $("#listSupervisores").append(tr);
      contador++;
    });

    $("#tablesupervisores").DataTable({
      order: [[0, "asc"]],
      destroy: true,
      language: { "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json" },
    });

}
 
const AddSupervisores = () => {
    try {
        ListaSupervisores.push( {
            id: ListaSupervisores.length + 1,
            nombre: $("#newNombre").val(),
            email: $("#newEmail").val(),
            telPersonal: $("#newTelPer").val()
          });
    
          localStorage.setItem('ListaSupervisores', JSON.stringify(ListaSupervisores));  
    
    
          $.toast({
            heading: "EXITO",
            text: "Supervisor agregado con exito",
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

    GetSupervisores();
}

const openEdit = (id) => {

    ListaSupervisores.forEach( element => {

    if(element.id == id){

      $("#idEdit").val(element.id);
      $("#editEmail").val(element.email)
      $("#editNombre").val(element.nombre);
      $("#editTelper").val(element.telPersonal);
    }
  });
  $("#mdEdit").modal("show");
}


const updateSupervisores = () => {

  try 
  {

    let idSupervisor = $("#idEdit").val()

    ListaSupervisores.forEach( element => {

      if(element.id == idSupervisor){

        element.email = $("#editEmail").val();
        element.nombre = $("#editNombre").val();
        element.telPersonal = $("#editTelper").val();
      }

    });

    let NewList = JSON.stringify(ListaSupervisores);
    localStorage.setItem('ListaSupervisores',NewList);

    $.toast({
      heading: "EXITO",
      text: "Supervisor actualizado con exito",
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
  GetSupervisores();
}



const openDelete = (id) => {

  $("#mdDelete").modal("show");
  $("#idDelete").val(id);
}

const deleteSupervisores = () => {

  try 
  {
    let id = $("#idDelete").val();
    let NuevaLista = [];

    

    ListaSupervisores.forEach( element => {

      if(element.id != id){
        
        NuevaLista.push(element);
      }

    });

    let NewList = JSON.stringify(NuevaLista);
    localStorage.setItem('ListaSupervisores',NewList);

    $.toast({
      heading: "EXITO",
      text: "Supervisor eliminado con exito",
      showHideTransition: "slide",
      icon: "success",
      position: "bottom-right",

    });

    LimpiarForm();
    $("#mdDelete").modal("hide");
    GetSupervisores();

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
let ListaVendedores = [];
$(function () {

   

    $('#BtnNew').click(function () {
      $('#mdNuevo').modal('show')
      $("#btnInsert").attr("disabled", false); // habilita
  
    });
  
  
    //Metodo para guardar los datos
    $("#formNuevo").submit(function () {
      $('#btnInsert').attr('disabled', true); //deshabilita
  
      AddVendedores();
      return false;
  
    });
  
    //Metodo para Actualizar los datos
    $("#formUpdate").submit(function () {
      $('#btnUpdate').attr('disabled', true);
  
      updateVendedores();
  
      return false;
    });
  
    //Metodo para confirmar la eliminacion
    $("#btnDelete").click(function () {
      $("#btnDelete").attr("disabled", true); //deshabilita
      deleteVendedores();
    })
  
  
    GetVendedores();
  });




const GetVendedores = () => {

    if ($.fn.DataTable.isDataTable("#tableVendedores")) {
        $("#tableVendedores").DataTable().destroy();
      }

      ListaVendedores = localStorage.getItem('ListaVendedores') != null ? JSON.parse(localStorage.getItem('ListaVendedores')) : [];

    $("#listVendedores").html(null);
    let contador = 1;

    
    ListaVendedores.forEach(element => {
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
      $("#listVendedores").append(tr);
      contador++;
    });

    $("#tableVendedores").DataTable({
      order: [[0, "asc"]],
      destroy: true,
      language: { "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json" },
    });

}
 
const AddVendedores = () => {
    try {
        ListaVendedores.push( {
            id: ListaVendedores.length + 1,
            nombre: $("#newNombre").val(),
            email: $("#newEmail").val(),
            telPersonal: $("#newTelPer").val()
          });
    
          localStorage.setItem('ListaVendedores', JSON.stringify(ListaVendedores));  
    
    
          $.toast({
            heading: "EXITO",
            text: "Vendedor agregado con exito",
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

    GetVendedores();
}

const openEdit = (id) => {

    ListaVendedores.forEach( element => {

    if(element.id == id){

      $("#idEdit").val(element.id);
      $("#editEmail").val(element.email)
      $("#editNombre").val(element.nombre);
      $("#editTelper").val(element.telPersonal);
    }
  });
  $("#mdEdit").modal("show");
}


const updateVendedores = () => {

  try 
  {

    let idVendedor = $("#idEdit").val()

    ListaVendedores.forEach( element => {

      if(element.id == idVendedor){

        element.email = $("#editEmail").val();
        element.nombre = $("#editNombre").val();
        element.telPersonal = $("#editTelper").val();
      }

    });

    let NewList = JSON.stringify(ListaVendedores);
    localStorage.setItem('ListaVendedores',NewList);

    $.toast({
      heading: "EXITO",
      text: "Vendedor actualizado con exito",
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
  GetVendedores();
}



const openDelete = (id) => {

  $("#mdDelete").modal("show");
  $("#idDelete").val(id);
}

const deleteVendedores = () => {

  try 
  {
    let id = $("#idDelete").val();
    let NuevaLista = [];

    

    ListaVendedores.forEach( element => {

      if(element.id != id){
        
        NuevaLista.push(element);
      }

    });

    let NewList = JSON.stringify(NuevaLista);
    localStorage.setItem('ListaVendedores',NewList);

    $.toast({
      heading: "EXITO",
      text: "Vendedor eliminado con exito",
      showHideTransition: "slide",
      icon: "success",
      position: "bottom-right",

    });

    LimpiarForm();
    $("#mdDelete").modal("hide");
    GetVendedores();

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
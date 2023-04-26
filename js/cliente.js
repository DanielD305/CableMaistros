let ListaClientes = [];
$(function () {

   

    $('#BtnNew').click(function () {
      $('#mdNuevo').modal('show')
      $("#btnInsert").attr("disabled", false); // habilita
  
    });
  
  
    //Metodo para guardar los datos
    $("#formNuevo").submit(function () {
      $('#btnInsert').attr('disabled', true); //deshabilita
  
      AddClientes();
      return false;
  
    });
  
    //Metodo para Actualizar los datos
    $("#formUpdate").submit(function () {
      $('#btnUpdate').attr('disabled', true);
  
      //updateClientes();
  
      return false;
    });
  
    //Metodo para confirmar la eliminacion
    $("#btnDelete").click(function () {
      $("#btnDelete").attr("disabled", true); //deshabilita
      //deleteCliente();
    })
  
  
    GetClientes();
  });




const GetClientes = () => {

    if ($.fn.DataTable.isDataTable("#tableclientes")) {
        $("#tableclientes").DataTable().destroy();
      }

    ListaClientes = localStorage.getItem('ListaClientes') != null ? JSON.parse(localStorage.getItem('ListaClientes')) : [];

    $("#listClientes").html(null);
    let contador = 1;

    
    ListaClientes.forEach(element => {
      var tr = `<tr class="odd">
                      <td>${contador}</td>
                      <td>${element.id}</td>
                      <td>${element.nit}</td>
                      <td>${element.nombre}</td>
                      <td>${element.telPersonal}</td>
                      <td class = "center">
                          <span class="btn btn-outline-success btn-sm edit d-grid gap-2 col-5 mx-auto" onclick="openEdit(${element.id})">Editar</span> 
                          <span class="btn btn-outline-danger btn-sm delete d-grid gap-2 col-5 mx-auto" onclick="openDelete(${element.id})" >Eliminar</span>
                      </td>
                      </tr>`;
      $("#listClientes").append(tr);
      contador++;
    });

    $("#tableclientes").DataTable({
      order: [[0, "asc"]],
      destroy: true,
      language: { "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json" },
    });

}
 
const AddClientes = () => {
    try {
        ListaClientes.push( {
            id: ListaClientes.length + 1,
            nombre: $("#newNombre").val(),
            nit: $("#newNit").val(),
            telPersonal: $("#newTelPer").val()
          });
    
          localStorage.setItem('ListaClientes', JSON.stringify(ListaClientes));  
    
    
          $.toast({
            heading: "EXITO",
            text: "Cliente agregado con exito",
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

    GetClientes();
}



const LimpiarForm = () => {
    $("#formNuevo")[0].reset();
    $("#formUpdate")[0].reset();
    $('button').attr('disabled', false)
  }
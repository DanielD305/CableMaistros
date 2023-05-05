let ListaInstaladores = [];
const listOT = localStorage.getItem('ListOT') != null ? JSON.parse(localStorage.getItem('ListOT')) : [];

$(function () {

  InstaladoresDefault();

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

const InstaladoresDefault = () => { 
  ListaInstaladores = [
    { id: 1, nombre: "Juan Donis", telPersonal: "555-5555", email: "juan@example.com", meta: 35,  },
    { id: 2, nombre: "Pedro Donis", telPersonal: "555-6666", email: "pedro@example.com", meta: 25 },
    { id: 3, nombre: "María Donis", telPersonal: "555-7777", email: "maria@example.com", meta: 40 },
    { id: 4, nombre: "Carlos Gómez", telPersonal: "555-9012", email: "carlos.gomez@gmail.com", meta: 40 },
    { id: 5, nombre: "Marlon Sanchez", telPersonal: "555-7895", email: "marlon.sanchez@gmail.com", meta: 40 }
  ];

  localStorage.setItem('ListaInstaladores', JSON.stringify(ListaInstaladores));
}




const GetInstaladores = () => {

  if ($.fn.DataTable.isDataTable("#tableInstaladores")) {
    $("#tableInstaladores").DataTable().destroy();
  }

  ListaInstaladores = localStorage.getItem('ListaInstaladores') != null ? JSON.parse(localStorage.getItem('ListaInstaladores')) : [];

  $("#listInstaladores").html(null);
  let contador = 1;
  console.log(listOT)

  ListaInstaladores.forEach(element => {
    const data  = listOT.filter(x => x.instalador.trim() === element.nombre && x.estado == 1);
    const porcentaje  = (parseInt(data.length) * 100 / parseInt(element.meta))
    var tr = `<tr class="odd">
                      <td>${contador}</td>
                      <td>${element.nombre}</td>
                      <td>${element.telPersonal}</td>
                      <td>${element.email}</td>
                      <td>${element.meta}</td>
                      <td>${porcentaje.toFixed(2)}%</td>
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
    ListaInstaladores.push({
      id: ListaInstaladores.length + 1,
      nombre: $("#newNombre").val(),
      email: $("#newEmail").val(),
      telPersonal: $("#newTelPer").val(),
      meta: $("#newMeta").val()
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

  ListaInstaladores.forEach(element => {

    if (element.id == id) {

      $("#idEdit").val(element.id);
      $("#editEmail").val(element.email)
      $("#editNombre").val(element.nombre);
      $("#editTelper").val(element.telPersonal);
      $("#editMeta").val(element.meta);
    }
  });
  $("#mdEdit").modal("show");
}


const updateInstaladores = () => {

  try {

    let idInstalador = $("#idEdit").val()

    ListaInstaladores.forEach(element => {

      if (element.id == idInstalador) {

        element.email = $("#editEmail").val();
        element.nombre = $("#editNombre").val();
        element.telPersonal = $("#editTelper").val();
        element.meta = $("#editMeta").val();
      }

    });

    let NewList = JSON.stringify(ListaInstaladores);
    localStorage.setItem('ListaInstaladores', NewList);

    $.toast({
      heading: "EXITO",
      text: "Instalador actualizado con exito",
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
  $("#mdEdit").modal("hide");
  GetInstaladores();
}



const openDelete = (id) => {

  $("#mdDelete").modal("show");
  $("#idDelete").val(id);
}

const deleteInstaladores = () => {

  try {
    let id = $("#idDelete").val();
    let NuevaLista = [];



    ListaInstaladores.forEach(element => {

      if (element.id != id) {

        NuevaLista.push(element);
      }

    });

    let NewList = JSON.stringify(NuevaLista);
    localStorage.setItem('ListaInstaladores', NewList);

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

  } catch (error) {
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
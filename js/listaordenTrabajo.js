let listOT = [];

$(function () {

    DrawClientes();
    DrawInstaladores();
    DrawOrdenTrabajo();


    $("#Guardar").click(function () {

        Toast('success', "EXITO", "Se asigno la orden de trabajo con exito");
        SaveOT();
    });

});


const DrawClientes = () => {


    let ListaClientes = [
        {
            id: 1,
            nit: "12345678-9",
            nombre: "Juan Perez",
            telPersonal: "555-1234"
        },
        {
            id: 2,
            nit: "98765432-1",
            nombre: "Maria Garcia",
            telPersonal: "555-5678"
        },
        {
            id: 3,
            nit: "24681012-3",
            nombre: "Pedro Gomez",
            telPersonal: "555-2468"
        },
        {
            id: 4,
            nit: "13579246-8",
            nombre: "Ana Rodriguez",
            telPersonal: "555-1357"
        },
        {
            id: 5,
            nit: "86420918-2",
            nombre: "Luisa Martinez",
            telPersonal: "555-8642"
        }
    ]

    var optionDf = `<option value="0" selected> Seleccione un Cliente </option>`;
    $('#Clientes').html(optionDf);

    ListaClientes.forEach(element => {
        var option = `<option value="${element.id}"> ${element.nombre} (${element.nit})   </option>`;

        $('#Clientes').append(option)
    });


}

const DrawInstaladores = () => {


    let ListaInstaladores = [
        { id: 1, nombre: "Juan Donis", telPersonal: "555-5555", email: "juan@example.com" },
        { id: 2, nombre: "Pedro Donis", telPersonal: "555-6666", email: "pedro@example.com" },
        { id: 3, nombre: "María Donis", telPersonal: "555-7777", email: "maria@example.com" },
        { id: 4, nombre: "Carlos Gómez", telPersonal: "555-9012", email: "carlos.gomez@gmail.com" },
        { id: 5, nombre: "Marlon Sanchez", telPersonal: "555-7895", email: "marlon.sanchez@gmail.com" }
    ];

    var optionDf = `<option value="0" selected> Seleccione un Instalador </option>`;
    $('#instalador').html(optionDf);

    ListaInstaladores.forEach(element => {
        var option = `<option value="${element.id}"> ${element.nombre}   </option>`;

        $('#instalador').append(option)
    });


}




const SaveOT = () => {
    const cliente = $('#Clientes option:selected').text();
    const instalador = $('#instalador option:selected').text();
    const detalle = $('#descripcion').val();
    listOT.push({ cliente, instalador, detalle, estado : 0 })
    localStorage.setItem('ListOT', JSON.stringify(listOT))
    DrawOrdenTrabajo();
}

const DrawOrdenTrabajo = () => {
    $('#tbody').html(null)
    listOT = localStorage.getItem('ListOT') != null ? JSON.parse(localStorage.getItem('ListOT')) : [];
    
    listOT.forEach((element, index) => {
        var html = `<tr>
            <td>${index + 1}</td>
            <td>${element.cliente}</td>
            <td>${element.instalador}</td>
            <td>${element.detalle}</td>
            <td>${element.estado == 0 ? 'PROCESO' : 'FINALIZADA' }</td>
            <td><span class='btn btn-outline-success' onclick='cambiarEstado(${index})'>Finalizar</span></td>
        </tr>`
        $('#tbody').append(html)
    });

}

const cambiarEstado = (index) => {

    listOT[index].estado = 1;
    console.log(listOT)

    let NewList = JSON.stringify(listOT);
    localStorage.setItem('ListOT', NewList);
    DrawOrdenTrabajo();
    $.toast({
      heading: "EXITO",
      text: "Se dio por finalizado el trabajo",
      showHideTransition: "slide",
      icon: "success",
      position: "bottom-right",
    });

}


//alertas
const Toast = (estado, title, descripcion) => {
    $.toast({
        heading: title,
        text: descripcion,
        showHideTransition: "slide",
        icon: estado,
        position: "bottom-right",

    })
}
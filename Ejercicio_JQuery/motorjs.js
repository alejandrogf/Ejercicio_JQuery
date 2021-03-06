﻿var url = "https://alumnoscurso.azure-mobile.net/Tables/curso";

function cargarListado() {
    //$.get(url, crearTabla(data));
    $.getJSON(url, null, crearTabla);
};

function obtenerObjeto() {
    var objeto = {
        nombre: document.getElementById("txtNombre").value,
        duracion: parseInt(document.getElementById("txtDuracion").value)
    };

    return objeto;
};


function crearTabla(data) {
    var salida = "";

    salida += "<table>";
    salida += "<tr>";
    salida += "<th>" + "Nombre Curso" + "</th>";
    salida += "<th>" + "Duracion (horas)" + "</th>" + "</tr>";

    for (var i = 0; i < data.length; i++) {
        salida += "<tr>";
        salida += "<td>" + data[i].nombre + "</td>";
        salida += "<td>" + data[i].duracion + "</td>";
        salida += "<td>" + '<button type="button" id="btnBorrar" onclick="borrarRegistro(\"' + data[i].id + '\")">Borrar</button></td>';
        salida += "</tr>";
    };
    salida += "</table>";

    //Se inserta la tabla creada en la capa del html

    $("#listado").html(salida);
};




function mostrarCapaNuevoReg() {
    $("#derecha").show();
}

function aceptarBuscar() {
    var u = url;
    if ($("txtBuscar").val != "") {
        u += "?$filter=nombre eq '" + $("#txtBuscar").val() + "'";
    };
    $.getJSON(u, null, crearTabla);
}

function grabarRegistro() {
    var registro = {
        nombre: $("#txtNombre").val(),
        duracion: $("#txtDuracion").val()
    };

    if (registro.nombre != undefined && registro.duracion != undefined) {
        $.ajax({
            method: "post",
            url: url,
            success: function (res) {
                console.log(res);
            },
            error: function (err) {
                console.log(err);
            },
            data: JSON.stringify(registro),
            dataType: "json",
            headers: {
                "Content-Type": "application/json"
            }
        });

        $("#txtNombre").val("");
        $("#txtDuracion").val("");
    };

    $("#derecha").hide();
    cargarListado();
}

function borrarRegistro() {

    $.ajax({
        method: "delete",
        url: url + id,
        success: function () {
            cargarListado();
        },
        error: function (err) {
            console.log(err);
        }
        //Estos no son necesarios porque el DELETE no pasa ningún dato.
        //Por tanto no hace falta especificar formato de dato, etc
        //data: JSON.stringify(registro),
        //dataType: "json",
        //headers: {
        //    "Content-Type": "application/json"

    });
}



$(document).ready(function () {
    $("#derecha").hide();
    cargarListado();

    $("#btnAceptar").click(aceptarBuscar);
    $("#btnRecargar").click(cargarListado);
    $("#btnNuevo").click(mostrarCapaNuevoReg);
    $("#btnGuardar").click(grabarRegistro);

});
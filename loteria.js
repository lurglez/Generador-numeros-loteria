window.addEventListener("load", actuar, false);

//Inicializamos
function actuar() {
    var seleccionJuego = document.getElementById('menu')
    var botonBorrar =document.getElementById('borrar')

    //añadimos los eventos
    seleccionJuego.addEventListener("click", lanzarCombi, false)
    botonBorrar.addEventListener("click", borrarJuegos, false)
}

function lanzarCombi() {
    var numJuegos = document.getElementById('combi').value
    var seleccionJuego = document.getElementById('menu').selectedOptions[0].value

    if (numJuegos==0){
        //Si no se ha selecionado el número de jugadas, informamos por pantalla
        alert("Debe seleccionar el número de combinaciones.")
    }else{
        var solucion=document.getElementById('solucion')
        var h2=document.createElement('h2')
        h2.textContent="Combinación obtenida de: " +document.getElementById('menu').selectedOptions[0].textContent
        solucion.appendChild(h2)

        switch (seleccionJuego) {
            case "1":
                //imprimimos la combinación tantas veces como indique el cliente
                for(var i=0;i<numJuegos;i++){
                var numerosSeleccionados = generarCombinacion(1, 49, 6);
                var reintegro=generarReintegro(1, 0, 9)
                agregarInfoaHTML(numerosSeleccionados, reintegro)
                }
                break;
            case "2":
                for(var i=0;i<numJuegos;i++){
                var numerosSeleccionados = generarCombinacion(1, 54, 5);
                var reintegro=generarReintegro(1, 0, 9)
                agregarInfoaHTML(numerosSeleccionados,reintegro)
                }
                break;
                
            case "3":
                for(var i=0;i<numJuegos;i++){
                var numerosSeleccionados = generarCombinacion(1, 50, 5);
                var reintegro=generarReintegro(2, 1, 12)
                agregarInfoaHTML(numerosSeleccionados,reintegro)
                }
                break;
            case "4":
                for(var i=0;i<numJuegos;i++){
                var numerosSeleccionados = generarCombinacion(1, 49, 6);
                agregarInfoaHTML(numerosSeleccionados, 0)
                }
                break;

        }
    }
}
/** 
* Generamos las distintas combinaciones dependiendo del juego seleccionado
* Para ello introducimos el valor mínimo y máximo posible
* También el número de jugadas
*/
function generarCombinacion(min, max, sel) {
    var seleccion = [];
    for (var i = 0; i < sel; i++) {
        var opcion = Math.floor((Math.random() * (max - min + 1)) + min)
        if (!seleccion.includes(opcion)) {
            seleccion[i] = opcion;
        } else{i--} //si el número está repetido volvemos atrás
    }
    seleccion = ordenarNumeros(seleccion);
    return seleccion;
}

/**
 * Hacemos lo mismo con el reintegro
 */
function generarReintegro(sel, max, min){
    var seleccion = [];
    for (var i = 0; i < sel; i++) {
        var opcion = Math.floor((Math.random() * (max - min + 1)) + min)
        if (!seleccion.includes(opcion)) {
            seleccion[i] = opcion;
        } 
    }
    seleccion = ordenarNumeros(seleccion);
    return seleccion;
}

/**
 * Ordenamos los número de menor a mayor
 * Para ello, debemos pasar el array creado por parámetro
 */
function ordenarNumeros(arr) {
    var comodin;
    for (i = 0; i <= arr.length; i++) {
        for (o = i + 1; o <= arr.length; o++) {
            if (arr[i] > arr[o]) {
                comodin = arr[o];
                arr[o] = arr[i];
                arr[i] = comodin;
            }
        }
    }
    return arr;
}

/**
 * Función para agregar las combinaciones obtenidas a HTML
 * Agregamos por separado los números y el reintegro
 */
function agregarInfoaHTML(num,reint){
    var solucion=document.getElementById('solucion')
    var imprimir=num.length
    var tabla= document.createElement('table')
    var tr=document.createElement('tr')
    for(var i=0; i<imprimir;i++){
        var td=document.createElement('td')
        td.id="final"
        td.textContent=num[i]
        tr.appendChild(td)
    }

    var numreintegro=reint.length
    if(numreintegro!=0){
    for(var i=0; i<numreintegro;i++){
        var td=document.createElement('td')
        td.id="reintegro"
        td.textContent=reint[i]
        tr.appendChild(td)
        }
    }
    tabla.appendChild(tr)
    solucion.appendChild(tabla)
}

/**
 * Función para limpiar la pantalla
 */
function borrarJuegos(){
    var solucion=document.getElementById('solucion')
    if(!solucion.firstChild || solucion.firstChild==""){alert("No hay números jugados.")}else if
      (confirm("Va a borrar los números jugados, ¿desea continuar?")){
        solucion.innerHTML=""
    }
}
// Función que aplica cifrado César basado en ASCII.
// Recibe texto y desplazamiento definido por usuario.


// ALFABETOS BASE
const ALFABETOS = {
    es: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789",
    mayus: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    minus: "abcdefghijklmnopqrstuvwxyz",
    num: "0123456789"
};

let ALFABETO_ACTUAL = ALFABETOS.es;



//CARGAR ALFABETO
function cargarAlfabeto(){

    const tipo = document.getElementById("tipoAlfabeto").value;

    if(tipo === "custom"){
        ALFABETO_ACTUAL =
            document.getElementById("alfabetoCustom").value;
    }else{
        ALFABETO_ACTUAL = ALFABETOS[tipo];
    }
}


//MOSTRAR MODULO SOLO CESAR
function toggleModulo(){
    const metodo =
        document.getElementById("metodo").value;

    document.getElementById("moduloDiv").style.display =
        metodo === "cesar" ? "block" : "none";
}



//ASCII VISUALIZACION
function asciiInfo(texto){
    let salida = "CARACTER | ASCII\n";
    salida += "-----------------\n";

    for(let c of texto){
        salida += `${c.padEnd(9)}| ${c.charCodeAt(0)}\n`;
    }
    return salida;
}


//CIFRADO CESAR
function cesar(texto, modulo){

    let res="";

    for(let c of texto){

        let i = ALFABETO_ACTUAL.indexOf(c);

        if(i === -1){
            res+=c;
            continue;
        }

        let nuevo =
            (i + modulo + ALFABETO_ACTUAL.length)
            % ALFABETO_ACTUAL.length;

        res += ALFABETO_ACTUAL[nuevo];
    }

    return res;
}

//ATBASH
function atbash(texto){

    let res="";

    for(let c of texto){

        let i = ALFABETO_ACTUAL.indexOf(c);

        if(i === -1){
            res+=c;
            continue;
        }

        let nuevo =
            ALFABETO_ACTUAL.length - 1 - i;

        res += ALFABETO_ACTUAL[nuevo];
    }

    return res;
}


//PROCESO GENERAL
function procesar(){

    cargarAlfabeto();

    const metodo =
        document.getElementById("metodo").value;

    const accion =
        document.getElementById("accion").value;

    const texto =
        document.getElementById("entrada").value;

    const modulo =
        parseInt(document.getElementById("modulo").value)||0;

    let resultado="";

    if(metodo==="cesar"){
        resultado =
            accion==="cifrar"
            ? cesar(texto,modulo)
            : cesar(texto,-modulo);
    }
    else{
        resultado = atbash(texto);
    }

    document.getElementById("salida").value = resultado;
    document.getElementById("ascii").value = "ENTRADA:\n" + asciiInfo(texto) + "\nRESULTADO:\n" + asciiInfo(resultado);
    document.getElementById("infoMetodo").innerText = `Método: ${metodo.toUpperCase()} | Módulo: ${modulo}`;
}   

function limpiar(){
    entrada.value="";
    salida.value="";
    ascii.value="";
}
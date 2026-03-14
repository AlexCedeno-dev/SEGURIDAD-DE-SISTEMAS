// ALFABETOS BASE
const ALFABETOS = {
    es: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789",
    mayus: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    minus: "abcdefghijklmnopqrstuvwxyz",
    num: "QWERTYUIOPASDFGHJKLZXCVBNM"
};

let ALFABETO_ACTUAL = [];


// CARGAR ALFABETO
function cargarAlfabeto() {
    const tipo = document.getElementById("tipoAlfabeto").value;
    let textoAlfabeto = "";

    if (tipo === "custom") {
        textoAlfabeto = document.getElementById("alfabetoCustom").value.trim();
    } else {
        textoAlfabeto = ALFABETOS[tipo];
    }

    // Convierte a arreglo para soportar mejor caracteres especiales
    ALFABETO_ACTUAL = Array.from(textoAlfabeto.normalize("NFC"));

    if (ALFABETO_ACTUAL.length === 0) {
        alert("El alfabeto está vacío.");
        return false;
    }

    // Validar caracteres repetidos
    const repetidos = ALFABETO_ACTUAL.filter((c, i) => ALFABETO_ACTUAL.indexOf(c) !== i);
    if (repetidos.length > 0) {
        alert("Tu alfabeto tiene caracteres repetidos. Eso puede hacer que el descifrado falle.\n\nRepetidos: " + [...new Set(repetidos)].join(" "));
    }

    return true;
}


// MOSTRAR MODULO SOLO EN CESAR
function toggleModulo() {
    const metodo = document.getElementById("metodo").value;

    document.getElementById("moduloDiv").style.display =
        metodo === "cesar" ? "block" : "none";
}


// ASCII / UNICODE VISUALIZACION
function asciiInfo(texto) {
    let salida = "CARACTER | CÓDIGO\n";
    salida += "-------------------\n";

    for (let c of Array.from(texto.normalize("NFC"))) {
        salida += `${c.padEnd(9)}| ${c.codePointAt(0)}\n`;
    }

    return salida;
}


// CIFRADO CESAR
function cesar(texto, modulo) {
    texto = texto.normalize("NFC");

    let res = "";
    const chars = Array.from(texto);
    const n = ALFABETO_ACTUAL.length;

    for (let c of chars) {
        let i = ALFABETO_ACTUAL.indexOf(c);

        if (i === -1) {
            res += c;
            continue;
        }

        let nuevo = ((i + modulo) % n + n) % n;
        res += ALFABETO_ACTUAL[nuevo];
    }

    return res;
}


// ATAQUE FUERZA BRUTA CESAR
function fuerzaBrutaCesar(texto) {
    texto = texto.normalize("NFC");

    let resultados = "";

    for (let m = 0; m < ALFABETO_ACTUAL.length; m++) {
        let intento = cesar(texto, -m);
        resultados += `Módulo ${m} -> ${intento}\n`;
    }

    return resultados;
}


// ATBASH
function atbash(texto) {
    texto = texto.normalize("NFC");

    let res = "";
    const chars = Array.from(texto);
    const n = ALFABETO_ACTUAL.length;

    for (let c of chars) {
        let i = ALFABETO_ACTUAL.indexOf(c);

        if (i === -1) {
            res += c;
            continue;
        }

        let nuevo = n - 1 - i;
        res += ALFABETO_ACTUAL[nuevo];
    }

    return res;
}


// PROCESO GENERAL
function procesar() {
    const ok = cargarAlfabeto();
    if (!ok) return;

    const metodo = document.getElementById("metodo").value;
    const accion = document.getElementById("accion").value;
    const texto = document.getElementById("entrada").value.normalize("NFC");
    const modulo = parseInt(document.getElementById("modulo").value) || 0;

    let resultado = "";

    if (metodo === "cesar") {
        if (accion === "cifrar") {
            resultado = cesar(texto, modulo);
        } else {
            // DESCIFRAR: muestra resultado exacto + listado de módulos
            const descifrado = cesar(texto, -modulo);
            const listado = fuerzaBrutaCesar(texto);

            resultado =
                `Resultado con módulo ${modulo}:\n${descifrado}\n\n` +
                `Listado completo:\n${listado}`;
        }
    } else {
        // ATBASH
        resultado = atbash(texto);
    }

    document.getElementById("salida").value = resultado;
    document.getElementById("ascii").value =
        "ENTRADA:\n" + asciiInfo(texto) +
        "\nRESULTADO:\n" + asciiInfo(resultado);

    document.getElementById("infoMetodo").innerText =
        `Método: ${metodo.toUpperCase()} | Módulo: ${modulo}`;
}


// LIMPIAR
function limpiar() {
    document.getElementById("entrada").value = "";
    document.getElementById("salida").value = "";
    document.getElementById("ascii").value = "";
    document.getElementById("infoMetodo").innerText = "";
}
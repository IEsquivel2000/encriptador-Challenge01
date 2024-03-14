const encrypter = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
};
const lookup = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };
const textInput = document.getElementById('text-input');
const textOutput = document.getElementById('text-output');
const btnEncriptar = document.getElementById('btn-encriptar');
const btnDesencriptar = document.getElementById('btn-desencriptar');
const btnCopiar = document.getElementById('btn-copiar');

btnEncriptar.onclick = encriptar;
btnDesencriptar.addEventListener('click',desencriptar);
copiar();

//Permite negar las vocales, mayusculas y cualquier caracter
function minuscula_check() {
    let text = textInput.value.toLowerCase();
    let regexAcentos = /[áéíóú]/g;
    let vocales = [['á', 'a'], ['é', 'e'], ['í', 'i'], ['ó', 'o'], ['ú', 'u']];
    let regecSimbolos = /[^a-z\s]/g;
    text = text.replace(regexAcentos, function (valor) {
        for (let i = 0; i < vocales.length; i++) {
            if (valor === vocales[i][0]) {
                return vocales[i][1];
            }
        }
    })
    text = text.replace(regecSimbolos, "");
    textInput.value = text;
    
}

//limpia el textarea luego de ejecutarse la funcion
function clearText(elemento) {
    let valorTexto = elemento.value = "";
};

function habilitarBotones() {
    btnCopiar.removeAttribute("disabled");
    cover();
    coverTablet();
  }

//funcion encriptador
function encriptar() {
    let text = textInput.value.trim().replace(/[eiaou]/gi, (match) => encrypter[match]);;
    // Use replace with a callback function for direct replacement
  
    if (text!="") {
      textOutput.value = text;
      habilitarBotones();
    }
  
    clearText(textInput);
}
  
//funcion desencriptador
function desencriptar() {
    let text = textInput.value.trim().replace(/enter|imes|ai|ober|ufat/gi, (match) => lookup[match]);

    if (text!="") {
        textOutput.value = text;
        habilitarBotones();
    }

    clearText(textInput);
}

//Utilizacion del metodo Clipboard(documentacion de mozilla en ingles)
function copiar() {
    btnCopiar.setAttribute('disabled', 'true');
    btnCopiar.addEventListener("click", writeClipboardText);
    async function writeClipboardText() {
        try {
            let text = textOutput.value;
            await navigator.clipboard.writeText(text);
            clearText(textOutput)
            btnCopiar.setAttribute('disabled', 'true');            
        } catch (error) {
            console.error(error.message);
        }
    }

}
//funcion para quitar el contenedor cover, que oculta la salida del encriptador
function cover(){
    let cover = document.getElementById('cover');
    
    if(cover.style.display != 'none'){
        cover.style.display = 'none';
    }
}
function coverTablet() {
    let coverTablet = document.querySelector('.output-encriptador');
    let style = window.getComputedStyle(coverTablet);
    let altura = style.getPropertyValue('height');
    if (altura == '150px'){
        coverTablet.style.height='auto';
    }
}

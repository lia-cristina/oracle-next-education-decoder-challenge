/* ---------------------------------------------------------------------------------------
    VERIFICAÇÕES 
--------------------------------------------------------------------------------------- */ 
function isEmpty (text) {
    if (text.length > 0) {
        return false;
    } else {
        return true;
    }
}
function isValidateInput(text) {
    for (i = 0; i < text.length; i++) {
        charCurrentCode = text[i].charCodeAt();
        if (charCurrentCode == 32 || /* space */
            charCurrentCode == 44 || /* , */
            charCurrentCode == 46 || /* . */
            charCurrentCode == 231 || /* ç */
            charCurrentCode >= 97 && charCurrentCode <= 122 /* [a-z] */
        ) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}
function isEncryptOption() {
    if (document.getElementById("input-encrypt").disabled) {
        return true;
    } else {
        return false;
    }
}
/* ---------------------------------------------------------------------------------------
    AÇÕES SECUNDÁRIAS
--------------------------------------------------------------------------------------- */ 
function toChangeDecoderOption() {
    document.getElementById("input-encrypt").toggleAttribute("disabled");
    document.getElementById("input-decrypt").toggleAttribute("disabled");
}
function toClearError (text, inputTextarea) {
    inputTextarea.value = text.substring(0, text.length - 1);
    window.alert("Apenas letras minúsculas e sem acento!");
}
/* ---------------------------------------------------------------------------------------
    VISIBILIDADE
--------------------------------------------------------------------------------------- */
function toChangeOutputVisibility (visibilityOption) {
    let outputMessage = document.getElementById("output-content-message");
    let outputImage = document.getElementById("character");
    let outputContent = document.getElementById("output-content");
    let outputContentDiv = document.getElementById("output-content-textarea");

    if (visibilityOption) {
        outputMessage.style.display = "none";
        outputImage.style.display = "none";
        outputContent.style.display = "flex";
        outputContentDiv.style.display = "flex";
    } else {
        outputMessage.style.display = "block";
        outputImage.style.display = "block";
        outputContent.style.display = "none";
        outputContentDiv.style.display = "none";
    }
}
function toPrintOutput(outputTextarea, text) {
    outputTextarea.innerText = text;
}
/* ---------------------------------------------------------------------------------------
    (DES)CRIPTOGRAFIA
--------------------------------------------------------------------------------------- */ 
function toEncrypt(text, decoderKeys) {
    let textOutput = '';
    for (i = 0; i < text.length; i++) {
        textOutput += text[i]
        for (y = 0; y < decoderKeys.length; y++) {
            if (text[i] == decoderKeys[y]["strReal"]) {
                textOutput = textOutput.substring(0, textOutput.length - 1);
                textOutput += decoderKeys[y]["strFalse"];
                break;
            }
        }
    }
    return textOutput;
}
function toDecrypt(text, decoderKeys) {
    let textOutput = text;
    for (i = 0; i < decoderKeys.length; i++) {
        textOutput = textOutput.replaceAll(decoderKeys[i]["strFalse"], decoderKeys[i]["strReal"]);
    }
    return textOutput;
}
/* ---------------------------------------------------------------------------------------
    FUNÇÃO PRINCIPAL
--------------------------------------------------------------------------------------- */ 
function toActiveDecoder() {
    let inputTextarea = document.getElementById("input-content-textarea");
    let text = inputTextarea.value;
    let outputTextarea = document.getElementById("output-content-textarea");

    const decoderKeys = [
        {'strReal': 'a', 'strFalse': 'ai'},
        {'strReal': 'e', 'strFalse': 'enter'},
        {'strReal': 'i', 'strFalse': 'imes'},
        {'strReal': 'o', 'strFalse': 'ober'},
        {'strReal': 'u', 'strFalse': 'ufat'}
    ];

    if (isEmpty(text)) {
        toChangeOutputVisibility(false);
    } else {
        if (isValidateInput(text)) {
            toChangeOutputVisibility(true);
            if (isEncryptOption()) {
                toPrintOutput(outputTextarea, toEncrypt(text, decoderKeys));
            } else {
                toPrintOutput(outputTextarea, toDecrypt(text, decoderKeys));
            }
        } else {
            toClearError(text, inputTextarea);
        }
    }
}
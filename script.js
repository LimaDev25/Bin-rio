function toDecimal(numStr, fromBase) {
    return parseInt(numStr, fromBase);
}

function fromDecimal(dec, toBase) {
    if (toBase === 10) return dec.toString();
    if (toBase === 2) return dec.toString(2);
    if (toBase === 8) return dec.toString(8);
    if (toBase === 6) {
        if (dec === 0) return '0';
        let result = '';
        let temp = dec;
        while (temp > 0) {
            result = (temp % 6) + result;
            temp = Math.floor(temp / 6);
        }
        return result;
    }
    return 'Erro';
}

function isValid(numStr, base) {
    const maxDigit = base - 1;
    return /^[0-9]+$/.test(numStr) && 
           numStr.split('').every(d => parseInt(d) <= maxDigit);
}

function converter() {
    const numStr = document.getElementById('numero').value.trim();
    const origem = parseInt(document.getElementById('origem').value);
    const destino = parseInt(document.getElementById('destino').value);
    const resultado = document.getElementById('resultado');

    if (!numStr) {
        resultado.innerHTML = '<div class="error">❌ Digite um número!</div>';
        return;
    }

    if (!isValid(numStr, origem)) {
        resultado.innerHTML = `<div class="error">❌ Inválido! Use apenas 0-${origem-1} na base ${origem}</div>`;
        return;
    }

    const decimal = toDecimal(numStr, origem);
    const convertido = fromDecimal(decimal, destino);

    resultado.innerHTML = `
        <div class="result">
            🎉 ${numStr} <span style="color: #f1c40f;">(base ${origem})</span> = 
            <span style="color: #f1c40f;">${convertido}</span> (base ${destino})<br>
            <small>📊 Decimal intermediário: ${decimal.toLocaleString()}</small>
        </div>
    `;
}

function setExemplo(exemplo) {
    if (exemplo === '27→2') {
        document.getElementById('origem').value = '10';
        document.getElementById('numero').value = '27';
        document.getElementById('destino').value = '2';
    } else if (exemplo === '1010→10') {
        document.getElementById('origem').value = '2';
        document.getElementById('numero').value = '1010';
        document.getElementById('destino').value = '10';
    } else if (exemplo === '15→6') {
        document.getElementById('origem').value = '10';
        document.getElementById('numero').value = '15';
        document.getElementById('destino').value = '6';
    }
    converter();
}

// Eventos
document.getElementById('numero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') converter();
});

document.getElementById('origem').addEventListener('change', converter);
document.getElementById('destino').addEventListener('change', converter);

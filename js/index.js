const keys = document.querySelector('.keys'),
    display = document.querySelector('.display'),
    result = document.querySelector('.display input');

let firstValue = '',
    secondValue = '',
    operator = '',
    memory = '';

window.addEventListener('keypress', (e) => {
    if (e.charCode === 13 || (e.charCode > 41 && e.charCode < 58) || e.charCode === 61) {
        if (e.charCode === 13 || e.charCode === 47) {
            e.preventDefault();
        }
        let symbol = String.fromCharCode(e.charCode)
        if (symbol === '/' || symbol === '*' || symbol === '-' || symbol === '+') {
            if (secondValue) {
                count(firstValue, secondValue, operator)
            }
            operator = symbol
        } else if (symbol === '=' || symbol === "\r") {
            count(firstValue, secondValue, operator)
        } else {
            if (operator === '') {
                firstValue += symbol
                result.value = firstValue
            } else {
                secondValue += symbol
                result.value = secondValue
            }
        }
    } else return
});

keys.addEventListener('click', (e) => {
    let symbol = e.target;
    if (symbol.classList.contains('pink')) {
        if (secondValue) {
            count(firstValue, secondValue, operator)
        }
        operator = symbol.value
    }
    if (symbol.classList.contains('gray')) {
        if (symbol.value === 'm+') {
            if (!memory) {
                const memoryIcon = document.createElement('span')
                memoryIcon.innerHTML = 'm';
                display.appendChild(memoryIcon);
                memory = result.value
            }
        } else if (symbol.value === 'm-') {
            if (memory) {
                display.removeChild(display.lastChild);
                memory = '';
            }
        } else {
            if (memory && result.value === memory) {
                display.removeChild(display.lastChild);
                memory = '';
                return result.value
            }
            if (memory) {
                result.value = memory;
                if (!firstValue) firstValue = memory
                else secondValue = memory
            } else return
        }
    }
    if (symbol.classList.contains('black')) {
        if (operator === '') {
            firstValue += symbol.value
            result.value = firstValue
        } else {
            secondValue += symbol.value
            result.value = secondValue
        }
        if (symbol.value === 'C') {
            firstValue = '', secondValue = '', operator = '';
            result.value = 0;
        }
    }
    if (symbol.classList.contains('orange')) {
        count(firstValue, secondValue, operator)
    }
});

function count(a, b, operator) {
    if (operator === '') {
        result.value = a;
        return;
    }
    else if (b === '') {
        return;
    }
    switch (operator) {
        case '+': result.value = parseFloat(a) + parseFloat(b)
            break;
    }
    if (result.value === 'Infinity') {
        result.value = 0
    }
    firstValue = result.value
    secondValue = ''
    return result.value
}
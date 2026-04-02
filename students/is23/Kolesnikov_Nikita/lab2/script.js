window.onload = function(){ 
    let a = '' 
    let b = '' 
    let expressionResult = '' 
    let selectedOperation = null  

    const outputElement = document.getElementById("result")

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() { handleOperator('x') }
    document.getElementById("btn_op_plus").onclick = function() { handleOperator('+') }
    document.getElementById("btn_op_minus").onclick = function() { handleOperator('-') }
    document.getElementById("btn_op_div").onclick = function() { handleOperator('/') }

    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_op_equal").onclick = function() { 
        computePending();
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation){
            a = a * -1
            outputElement.innerHTML = a
        }
        else{
            b = b * -1
            outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            a = a / 100
            outputElement.innerHTML = a
        }
        else{
            b = b / 100
            outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_bsp").onclick = function() {
        if (!selectedOperation) {
            if(a.length > 0){
                a = a.slice(0, -1)
                outputElement.innerHTML = a
                if(a === '' || a === '-'){
                    a = ''
                    outputElement.innerHTML = 0
                }
                else{
                    outputElement.innerHTML = a
                }
            }
            else{
                outputElement.innerHTML = 0
            }
        }
        else{
            if(b.length > 0){
                b = b.slice(0, -1)
                outputElement.innerHTML = b
                if(b === '' || b === '-'){
                    b = ''
                    outputElement.innerHTML = 0
                }
                else{
                    outputElement.innerHTML = b
                }
            }
            else{
                outputElement.innerHTML = 0
            }
        }
    }

    let isBackgroundDark = true;
    document.getElementById("btn_change_theme").onclick = function() {
        if (isBackgroundDark){
            document.body.style.backgroundColor = "rgb(200, 200, 200)"
            isBackgroundDark = false
        }
        else {
            document.body.style.backgroundColor = "rgb(63, 60, 60)"
            isBackgroundDark = true
        }
    }

    document.getElementById("btn_sqrt").onclick = function() {
        if (!selectedOperation) {
            if (a > 0){
                a = Math.sqrt(a) 
                outputElement.innerHTML = a
            }
            else{
                outputElement.innerHTML = "Ошибка"
                a = ''
                return
            }
        }
        else{
            if (b > 0){
                b = Math.sqrt(b)
                outputElement.innerHTML = b
            }
            else{
                outputElement.innerHTML = "Ошибка"
                b = ''
                return
            }
        }
    }

    document.getElementById("btn_square").onclick = function() {
        if (!selectedOperation) {
            a = a * a
            outputElement.innerHTML = a
        }
        else{
            b = b * b
            outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_fact").onclick = function() {
        if (!selectedOperation){
            let n = Number(a)
            if (n < 0 || !Number.isInteger(n)){
                outputElement.innerHTML = "Ошибка"
                a = ''
                return
            }
        let result = 1

        for(let i = 1; i <=n; i++){
            result *= i
        }
        a = result
        outputElement.innerHTML = a
        }
        else{
            let n = Number(b)
            if (n < 0 || !Number.isInteger(n)){
                outputElement.innerHTML = "Ошибка"
                b = ''
                return
            }
            let result = 1

            for(let i = 1; i <=n; i++){
                result *= i
            }
            b = result
            outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_zeros").onclick = function(){
        if (!selectedOperation){
            if(a != 0) {
                a = a + "000"
                outputElement.innerHTML = a
            }
        }
        else{
            if(b != 0){
                b = b + "000"
                outputElement.innerHTML = b
            }
        }
    }

    let isResultDark = true
    document.getElementById("btn_result_change_theme").onclick = function(){
        if (isResultDark){
            result.style.backgroundColor = "rgb(200, 200, 200)"
            isResultDark = false
        }
        else{
            result.style.backgroundColor = "rgb(63, 60, 60)"
            isResultDark = true
        }
    }

    document.getElementById("btn_cube").onclick = function(){
        if (!selectedOperation) {
            a = a * a * a
            outputElement.innerHTML = a
        }
        else{
            b = b * b * b
            outputElement.innerHTML = b
        }
    }

    function computePending() {
        if (a === '' || b === '' || !selectedOperation) return false;

        let numA = Number(a);
        let numB = Number(b);
        let res;

        switch(selectedOperation) {
            case 'x': res = numA * numB; break;
            case '+': res = numA + numB; break;
            case '-': res = numA - numB; break;
            case '/':
                if (numB === 0) {
                    outputElement.innerHTML = "Ошибка";
                    a = ''; b = ''; selectedOperation = null;
                    return true;
                }
                res = numA / numB;
                break;
            default: return false;
        }

        expressionResult = res;
        a = expressionResult.toString();
        b = '';
        outputElement.innerHTML = a;
        selectedOperation = null;
        return true;
    }

    function handleOperator(opSymbol) {
        if (a === '') return;

        if (selectedOperation && b !== '') {
            const hadError = computePending();
            if (hadError) return;
        }
        selectedOperation = opSymbol;
    }
};
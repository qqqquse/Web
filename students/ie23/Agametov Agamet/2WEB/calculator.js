"use strict";

var Operation;
(function (Operation) {
    Operation["Add"] = "+";
    Operation["Subtract"] = "-";
    Operation["Multiply"] = "x";
    Operation["Divide"] = "/";
    Operation["Percent"] = "%";
    Operation["SquareRoot"] = "\u221A";
    Operation["Square"] = "x\u00B2";
    Operation["Factorial"] = "x!";
    Operation["None"] = "none";
})(Operation || (Operation = {}));
class Calculator {
    constructor(displayId) {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = Operation.None;
        this.memory = 0;
        this.history = [];
        this.MAX_INPUT_LENGTH = 16;
        this.MAX_HISTORY = 5;
        this.displayColors = ['#222', '#fff', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
        this.currentDisplayColorIndex = 0;
        this.display = document.getElementById(displayId);
        this.initializeButtons();
        this.initializeKeyboard();
    }
    initializeButtons() {
        const buttons = document.querySelectorAll('.my-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => { var _a; return this.handleButtonClick(((_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ''); });
        });
    }
    initializeKeyboard() {
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if (!isNaN(parseInt(key))) {
                this.appendNumber(key);
            }
            else if (key === '000') {
                this.appendTripleZero();
            }
            else {
                switch (key) {
                    case 'Escape':
                        this.clear();
                        break;
                    case 'Backspace':
                        this.backspace();
                        break;
                    case '.':
                        this.addDecimal();
                        break;
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '%':
                        this.setOperation(this.mapKeyToOperation(key));
                        break;
                    case 'Enter':
                        this.calculate();
                        break;
                }
            }
            this.updateDisplay();
        });
    }
    mapKeyToOperation(key) {
        switch (key) {
            case '+': return Operation.Add;
            case '-': return Operation.Subtract;
            case '*': return Operation.Multiply;
            case '/': return Operation.Divide;
            case '%': return Operation.Percent;
            default: return Operation.None;
        }
    }
    handleButtonClick(value) {
        if (!isNaN(parseInt(value)) && value.length === 1) {
            this.appendNumber(value);
        }
        else if (value === '000') {
            this.appendTripleZero();
        }
        else {
            switch (value) {
                case 'C':
                    this.clear();
                    break;
                case '+/-':
                    this.toggleSign();
                    break;
                case '%':
                    this.setOperation(Operation.Percent);
                    break;
                case '/':
                    this.setOperation(Operation.Divide);
                    break;
                case 'x':
                    this.setOperation(Operation.Multiply);
                    break;
                case '-':
                    this.setOperation(Operation.Subtract);
                    break;
                case '+':
                    this.setOperation(Operation.Add);
                    break;
                case '=':
                    this.calculate();
                    break;
                case '.':
                    this.addDecimal();
                    break;
                case '←':
                    this.backspace();
                    break;
                case '√':
                    this.applyUnaryOperation(Operation.SquareRoot);
                    break;
                case 'x²':
                    this.applyUnaryOperation(Operation.Square);
                    break;
                case 'x!':
                    this.applyUnaryOperation(Operation.Factorial);
                    break;
                case 'M+':
                    this.memoryAdd();
                    break;
                case 'M-':
                    this.memorySubtract();
                    break;
                case 'MR':
                    this.memoryRecall();
                    break;
                case 'Color':
                    this.cycleDisplayColor();
                    break;
                case 'My Op':
                    this.customOperation();
                    break;
                case 'History':
                    this.showHistory();
                    break;
                default:
                    return;
            }
        }
        this.updateDisplay();
    }
    appendNumber(number) {
        if (this.currentInput === '0' || this.currentInput === '-0') {
            this.currentInput = this.currentInput.startsWith('-') ? `-${number}` : number;
        }
        else if (this.currentInput.length < this.MAX_INPUT_LENGTH) {
            this.currentInput += number;
        }
        else {
            this.showLimitWarning();
        }
        this.normalizeInput();
    }
    appendTripleZero() {
        if (this.currentInput === '0' || this.currentInput === '-0') {
            this.currentInput = this.currentInput.startsWith('-') ? '-000' : '000';
        }
        else if (this.currentInput.length + 3 <= this.MAX_INPUT_LENGTH) {
            this.currentInput += '000';
        }
        else {
            this.showLimitWarning();
        }
        this.normalizeInput();
    }
    normalizeInput() {
        if (this.currentInput !== '0' && this.currentInput !== '-0') {
            this.currentInput = this.currentInput.replace(/^(-)?0+/, '$1');
            if (this.currentInput === '' || this.currentInput === '-') {
                this.currentInput = this.currentInput + '0';
            }
        }
    }
    showLimitWarning() {
        const originalText = this.display.textContent || '';
        const originalColor = this.display.style.color;
        this.display.textContent = 'LIMIT';
        this.display.style.color = '#ff4444';
        setTimeout(() => {
            this.display.textContent = originalText;
            this.display.style.color = originalColor;
        }, 500);
    }
    addDecimal() {
        if (this.currentInput.length >= this.MAX_INPUT_LENGTH) {
            this.showLimitWarning();
            return;
        }
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
    }
    setOperation(op) {
        if (this.operation !== Operation.None && this.previousInput !== '') {
            this.calculate(); 
        }
        this.operation = op;
        this.previousInput = this.currentInput;
        this.currentInput = '0';
    }
    calculate() {
        if (this.operation === Operation.None || this.previousInput === '')
            return;
        const prev = parseFloat(this.previousInput);
        const curr = parseFloat(this.currentInput);
        if (isNaN(prev) || isNaN(curr)) {
            this.handleError('Invalid Input');
            return;
        }
        let result = 0;
        switch (this.operation) {
            case Operation.Add:
                result = this.add(prev, curr);
                break;
            case Operation.Subtract:
                result = this.subtract(prev, curr);
                break;
            case Operation.Multiply:
                result = this.multiply(prev, curr);
                break;
            case Operation.Divide:
                result = this.divide(prev, curr);
                break;
            case Operation.Percent:
                result = this.percent(prev, curr);
                break;
        }
        if (isNaN(result) || !isFinite(result)) {
            this.handleError('Calculation Error');
            return;
        }
        this.currentInput = this.formatResult(result);
        this.addToHistory(`${this.previousInput} ${this.operation} ${this.currentInput} = ${result}`);
        this.operation = Operation.None;
        this.previousInput = '';
    }
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) {
        if (b === 0) {
            this.handleError('Division by Zero');
            throw new Error('Division by Zero');
        }
        return a / b;
    }
    percent(a, b) { return a * (b / 100); }
    applyUnaryOperation(op) {
        const num = parseFloat(this.currentInput);
        if (isNaN(num)) {
            this.handleError('Invalid Input');
            return;
        }
        let result;
        switch (op) {
            case Operation.SquareRoot:
                if (num < 0) {
                    this.handleError('Negative Square Root');
                    return;
                }
                result = Math.sqrt(num);
                break;
            case Operation.Square:
                result = num * num;
                break;
            case Operation.Factorial:
                if (!Number.isInteger(num) || num < 0 || num > 170) {
                    this.handleError('Invalid Factorial');
                    return;
                }
                result = this.computeFactorial(num);
                break;
            default:
                return;
        }
        this.currentInput = this.formatResult(result);
        this.addToHistory(`${op}(${this.currentInput}) = ${result}`);
    }
    computeFactorial(n) {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    formatResult(result) {
        if (isNaN(result) || !isFinite(result)) {
            return 'Error';
        }
        let str = result.toString();
        if (str.length > this.MAX_INPUT_LENGTH) {
            str = result.toExponential(this.MAX_INPUT_LENGTH - 5);
        }
        else if (!Number.isInteger(result)) {
            str = parseFloat(result.toFixed(10)).toString().replace(/\.?0+$/, '');
        }
        return str;
    }
    addToHistory(entry) {
        this.history.push(entry);
        if (this.history.length > this.MAX_HISTORY) {
            this.history.shift();
        }
    }
    showHistory() {
        console.log('History:', this.history);
        alert('Check console for history');
    }
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = Operation.None;
        this.display.style.color = '#00ffd5';
    }
    toggleSign() {
        if (this.currentInput === '0') {
            this.currentInput = '-0';
        }
        else if (this.currentInput === '-0') {
            this.currentInput = '0';
        }
        else {
            this.currentInput = this.currentInput.startsWith('-')
                ? this.currentInput.substring(1)
                : '-' + this.currentInput;
        }
    }
    backspace() {
        if (this.currentInput.length > 1 && this.currentInput !== '-0') {
            this.currentInput = this.currentInput.slice(0, -1);
            if (this.currentInput === '-') {
                this.currentInput = '-0';
            }
        }
        else {
            this.currentInput = '0';
        }
    }
    memoryAdd() {
        const num = parseFloat(this.currentInput || '0');
        if (!isNaN(num)) {
            this.memory += num;
        }
    }
    memorySubtract() {
        const num = parseFloat(this.currentInput || '0');
        if (!isNaN(num)) {
            this.memory -= num;
        }
    }
    memoryRecall() {
        this.currentInput = this.formatResult(this.memory);
    }
    cycleDisplayColor() {
        this.currentDisplayColorIndex = (this.currentDisplayColorIndex + 1) % this.displayColors.length;
        this.display.style.backgroundColor = this.displayColors[this.currentDisplayColorIndex];
    }
    customOperation() {
        const num = parseFloat(this.currentInput);
        if (isNaN(num)) {
            this.handleError('Invalid Input');
            return;
        }
        const result = num * num * num;
        this.currentInput = this.formatResult(result);
        this.addToHistory(`Custom(${num}) = ${result}`);
    }
    handleError(message) {
        this.currentInput = 'Error';
        this.display.style.color = '#ff4444';
        console.error(message);
        setTimeout(() => {
            this.display.style.color = '#00ffd5';
            this.clear();
        }, 1000);
    }
    updateDisplay() {
        const length = this.currentInput.length;
        if (length > 12) {
            this.display.style.fontSize = '1.6rem';
        }
        else if (length > 8) {
            this.display.style.fontSize = '1.8rem';
        }
        else {
            this.display.style.fontSize = '2rem';
        }
        this.display.textContent = this.currentInput || '0';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Calculator('result');
});

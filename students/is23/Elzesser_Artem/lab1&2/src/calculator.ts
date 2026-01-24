interface CalculatorState {
    firstNumber: string;
    operator: string;
    shouldResetScreen: boolean;
    accumulatedResult: number;
    lastOperation: string;
    displayColors: string[];
    currentDisplayColor: number;
    backgroundColors: string[];
    currentBackgroundColor: number;
    isAccumulating: boolean;
}

class Calculator {
    private display: HTMLElement;
    private buttons: NodeListOf<HTMLButtonElement>;
    private themeSelector: HTMLSelectElement;
    
    private state: CalculatorState;

    constructor() {
        this.display = document.getElementById("display") as HTMLElement;
        this.buttons = document.querySelectorAll("button");
        this.themeSelector = document.getElementById("theme") as HTMLSelectElement;
        
        this.state = {
            firstNumber: "",
            operator: "",
            shouldResetScreen: false,
            accumulatedResult: 0,
            lastOperation: "",
            displayColors: ["#0d1b2a", "#2a1b0d", "#1b2a1d", "#2a1b2a", "#1b1b2a"],
            currentDisplayColor: 0,
            backgroundColors: ["#1a1a2e", "#2e1a1a", "#1a2e1a", "#2e2e1a", "#1a2e2e"],
            currentBackgroundColor: 0,
            isAccumulating: false
        };
        
        this.initialize();
    }

    private initialize(): void {
        this.themeSelector.addEventListener("change", () => {
            const isLightTheme = this.themeSelector.value === "light";
            document.body.classList.toggle("light-theme", isLightTheme);
        });

        this.buttons.forEach((button: HTMLButtonElement) => {
            button.addEventListener("click", () => {
                const action = button.getAttribute("data-action");
                
                if (action === "number") {
                    const number = button.getAttribute("data-number") || "";
                    this.handleNumber(number);
                } 
                else if (action === "operator") {
                    const operator = button.getAttribute("data-operator") || "";
                    this.chooseOperator(operator);
                }
                else if (action) {
                    this.handleAction(action);
                }
            });
        });

        this.state.accumulatedResult = 0;
    }

    private handleNumber(number: string): void {
        if (this.display.textContent === "0" || this.state.shouldResetScreen) {
            this.resetScreen();
            if (number === "0") {
                this.display.textContent = "0";
                return;
            }
        }
        this.display.textContent += number;
    }

    private handleAction(action: string): void {
        switch (action) {
            case "clear":
                this.clear();
                break;
            case "clearEntry":
                this.clearEntry();
                break;
            case "decimal":
                this.appendDecimal();
                break;
            case "plusMinus":
                this.toggleSign();
                break;
            case "percent":
                this.percentage();
                break;
            case "equals":
                this.calculate();
                break;
            case "backspace":
                this.backspace();
                break;
            case "sqrt":
                this.squareRoot();
                break;
            case "square":
                this.square();
                break;
            case "factorial":
                this.factorial();
                break;
            case "tripleZero":
                this.appendTripleZero();
                break;
            case "changeBgColor":
                this.changeBackgroundColor();
                break;
            case "changeDisplayColor":
                this.changeDisplayColor();
                break;
            case "customOp":
                this.customOperation();
                break;
        }
    }

    private resetScreen(): void {
        this.display.textContent = "";
        this.state.shouldResetScreen = false;
    }

    private clear(): void {
        this.display.textContent = "0";
        this.state = {
            ...this.state,
            firstNumber: "",
            operator: "",
            shouldResetScreen: false,
            accumulatedResult: 0,
            lastOperation: "",
            isAccumulating: false
        };
    }

    private clearEntry(): void {
        this.display.textContent = "0";
        this.state.shouldResetScreen = false;
    }

    private appendDecimal(): void {
        const currentDisplay = this.display.textContent || "";
        if (!currentDisplay.includes(".")) {
            this.display.textContent = currentDisplay + ".";
        }
    }

    private toggleSign(): void {
        const currentDisplay = this.display.textContent || "0";
        const currentValue = parseFloat(currentDisplay);
        if (!isNaN(currentValue)) {
            const newValue = -currentValue;
            this.display.textContent = this.roundResult(newValue);
        }
    }

    private percentage(): void {
        const currentDisplay = this.display.textContent || "0";
        const currentValue = parseFloat(currentDisplay);
        if (!isNaN(currentValue)) {
            const result = currentValue / 100;
            this.display.textContent = this.roundResult(result);
        }
    }

    private backspace(): void {
        let currentDisplay = this.display.textContent || "0";
        if (currentDisplay.length > 1 && currentDisplay !== "0") {
            currentDisplay = currentDisplay.slice(0, -1);
            if (currentDisplay === "" || currentDisplay === "-") {
                currentDisplay = "0";
            }
        } else {
            currentDisplay = "0";
        }
        this.display.textContent = currentDisplay;
    }

    private squareRoot(): void {
        const currentDisplay = this.display.textContent || "0";
        const currentValue = parseFloat(currentDisplay);
        if (!isNaN(currentValue) && currentValue >= 0) {
            const result = Math.sqrt(currentValue);
            this.display.textContent = this.roundResult(result);
            this.state.shouldResetScreen = true;
        } else if (currentValue < 0) {
            this.showError("Ошибка");
        }
    }

    private square(): void {
        const currentDisplay = this.display.textContent || "0";
        const currentValue = parseFloat(currentDisplay);
        if (!isNaN(currentValue)) {
            const result = currentValue * currentValue;
            this.display.textContent = this.roundResult(result);
            this.state.shouldResetScreen = true;
        }
    }

    private factorial(): void {
        const currentDisplay = this.display.textContent || "0";
        const currentValue = Math.floor(parseFloat(currentDisplay));
        
        if (!isNaN(currentValue) && currentValue >= 0 && currentValue <= 20) {
            let result = 1;
            for (let i = 2; i <= currentValue; i++) {
                result *= i;
            }
            this.display.textContent = result.toString();
            this.state.shouldResetScreen = true;
        } else if (currentValue > 20) {
            this.showError("Слишком большое");
        } else {
            this.showError("Ошибка");
        }
    }

    private showError(message: string): void {
        const original = this.display.textContent;
        this.display.textContent = message;
        setTimeout(() => {
            this.display.textContent = original || "0";
        }, 1000);
    }

    private appendTripleZero(): void {
        if (this.display.textContent === "0" || this.state.shouldResetScreen) {
            this.resetScreen();
            this.display.textContent = "000";
        } else {
            this.display.textContent += "000";
        }
    }

    private calculate(): void {
        if (!this.state.operator || !this.display.textContent) return;
        
        const secondNumber = this.display.textContent;
        let result: number;

        const firstNum = parseFloat(this.state.firstNumber);
        const secondNum = parseFloat(secondNumber);

        if (isNaN(firstNum) || isNaN(secondNum)) return;

        switch (this.state.operator) {
            case "+":
                if (this.state.isAccumulating && this.state.lastOperation === "+") {
                    result = this.state.accumulatedResult + secondNum;
                } else {
                    result = firstNum + secondNum;
                    this.state.isAccumulating = true;
                }
                this.state.lastOperation = "+";
                break;
            case "-":
                if (this.state.isAccumulating && this.state.lastOperation === "-") {
                    result = this.state.accumulatedResult - secondNum;
                } else {
                    result = firstNum - secondNum;
                    this.state.isAccumulating = true;
                }
                this.state.lastOperation = "-";
                break;
            case "*":
                result = firstNum * secondNum;
                this.state.isAccumulating = false;
                break;
            case "/":
                if (secondNum === 0) {
                    this.showError("Деление на 0");
                    this.state.operator = "";
                    this.state.isAccumulating = false;
                    return;
                }
                result = firstNum / secondNum;
                this.state.isAccumulating = false;
                break;
            default:
                return;
        }
        
        this.state.accumulatedResult = result;
        this.display.textContent = this.roundResult(result);
        this.state.operator = "";
        this.state.shouldResetScreen = true;
    }

    private chooseOperator(selectedOperator: string): void {
        if (this.display.textContent === "0" && this.state.operator) {
            this.state.operator = selectedOperator;
            return;
        }
        
        if (this.state.operator !== "" && this.state.shouldResetScreen === false) {
            this.calculate();
        }
        
        this.state.firstNumber = this.display.textContent || "";
        this.state.operator = selectedOperator;
        this.state.shouldResetScreen = true;
        this.state.isAccumulating = false;
    }

    private changeBackgroundColor(): void {
        this.state.currentBackgroundColor = 
            (this.state.currentBackgroundColor + 1) % this.state.backgroundColors.length;
        document.body.style.backgroundColor = this.state.backgroundColors[this.state.currentBackgroundColor];
    }

    private changeDisplayColor(): void {
        this.state.currentDisplayColor = 
            (this.state.currentDisplayColor + 1) % this.state.displayColors.length;
        this.display.style.backgroundColor = this.state.displayColors[this.state.currentDisplayColor];
        this.display.style.borderColor = this.state.displayColors[this.state.currentDisplayColor];
    }

    private customOperation(): void {
        const currentDisplay = this.display.textContent || "0";
        const currentValue = parseFloat(currentDisplay);
        
        if (!isNaN(currentValue)) {
            const exponent = prompt("Введите степень (B):", "2");
            if (exponent !== null) {
                const expValue = parseFloat(exponent);
                if (!isNaN(expValue)) {
                    const result = Math.pow(currentValue, expValue);
                    this.display.textContent = this.roundResult(result);
                    this.state.shouldResetScreen = true;
                } else {
                    alert("Введите корректное число!");
                }
            }
        }
    }

    private roundResult(number: number): string {
        const rounded = Math.round(number * 10000000000) / 10000000000;
        
        if (Math.abs(rounded) > 1e12 || (Math.abs(rounded) < 1e-6 && rounded !== 0)) {
            return rounded.toExponential(6);
        }
        
        return parseFloat(rounded.toString()).toString();
    }
}

// Инициализация калькулятора при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    new Calculator();
});
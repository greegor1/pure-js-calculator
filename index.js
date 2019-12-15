class CreateButtons {
    constructor() {
        this.btnsField = document.querySelector('.calculator__btns')
        this.numsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reverse()
        this.opsArr = ['C', '=','+', '-', '*', '/']
        this.createBtns(this.opsArr, this.btnsField, 'operator');
        this.createBtns(this.numsArr, this.btnsField, 'number');
    }
    createBtns(arr, field, aditionaClass) {
        arr.map((item) => {
            const btn = document.createElement('button');
            btn.textContent = item;
            btn.classList.add('calculator__btn', aditionaClass);
            field.appendChild(btn);
        })
    }
}


class SetButtonsBehaviour {
    constructor() {
        this.btns = document.querySelectorAll('.calculator__btn')
        this.monitorFiled = document.querySelector('.calculator__monitor')
        this.toShowArr = [];
        this.toCountArr = [];
        this.storeValueArr = [];
        this.lastOperation;
        this.methods = {
            addition: 'addition',
            substraction: 'substraction',
            multiplication: 'multiplication',
            division: 'division'
        }
        this.btnsClickEvents(this.btns);
    }
    
    countCase(method) {
        this.storeValueArr.push(this.toCountArr[this.toCountArr.length -1])
        this.toCountArr = this.onCalc(this.storeValueArr, method);
        this.toShowArr=[];
        this.monitorFiled.textContent = this.toShowArr.join('');
        return this.toCountArr
    }
    
    btnsClickEvents(buttons) {
        const { addition, substraction, multiplication, division } = this.methods;
        [...buttons].forEach(button => {
            button.addEventListener('click', () => {
                switch(button.textContent) {
                    case 'C':
                        this.toShowArr = [];
                        this.toCountArr = [];
                        this.storeValueArr = [];
                        this.monitorFiled.textContent = this.toShowArr.join('');
                        break;
                    case '+':
                        this.countCase(addition)
                        this.lastOperation = addition;
                        break;
                    case '-':
                        this.countCase(substraction)
                        this.lastOperation = substraction;
                        break;
                    case '*':
                        this.countCase(multiplication)
                        this.lastOperation = multiplication;
                        break;
                    case '/':
                        this.countCase(division)
                        this.lastOperation = division;
                        break;
                    case '=':
                        this.onEqual();
                        break;
                    default:
                        this.toShowArr.push(button.textContent);
                        this.monitorFiled.textContent = this.toShowArr.join('');
                        this.toCountArr.push(parseInt(this.toShowArr.join('')));
                }
            })
        })
    }
    
    onCalc(arr, method) {
        const { addition, substraction, multiplication, division } = this.methods;
        let Calced;
        let initialValue;
        switch (method) {
            case addition:
                initialValue = 0;
                break;
            case substraction:
                initialValue = arr[0]*2;
                break;
            case multiplication:
                initialValue = 1;
                break;
            case division:
                initialValue = arr[0]*arr[0];
                break;
            }
        Calced = arr.reduce((acc, item) => {
            switch (method) {
                case addition:
                    return acc + item;
                case substraction:
                    return acc - item;
                case multiplication:
                    return acc * item;
                case division:
                    return acc / item;
                }
            }, initialValue)
        return [Calced]
    }

    onEqual() {
        this.countCase(this.lastOperation)
        this.monitorFiled.textContent = this.toCountArr[0];
    }
}



new CreateButtons();
new SetButtonsBehaviour();
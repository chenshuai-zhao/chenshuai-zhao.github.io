// 计算器工具模块
// 此文件包含计算器相关的功能实现

// 定义模块对象
const calculatorModule = {
    // 计算器状态变量
    expression: '',
    result: '',
    newOperation: true,
    
    // 处理键盘输入
    handleKeyPress: function(event) {
        // 获取输入元素
        const calculatorDisplay = document.getElementById('calculator-display');
        
        // 只有当计算器区域获得焦点或用户按下特定键时才处理
        const isCalculatorActive = document.activeElement === calculatorDisplay || 
                                 document.activeElement.closest('#calculator-container') !== null;
        
        // 允许在任何地方使用键盘快捷键
        const key = event.key;
        
        // 阻止默认行为，防止不必要的滚动或其他操作
        event.preventDefault();
        
        // 数字键
        if (/[0-9]/.test(key)) {
            this.calculatorNumber(parseInt(key));
        }
        // 小数点
        else if (key === '.') {
            this.calculatorDecimal();
        }
        // 运算符
        else if (key === '+' || key === '-' || key === '*' || key === '/') {
            // 转换显示的运算符
            const displayOp = key === '*' ? '×' : (key === '/' ? '÷' : key);
            this.calculatorOperator(key === '*' ? '×' : (key === '/' ? '÷' : key));
        }
        // 括号
        else if (key === '(' || key === ')') {
            this.calculatorOperator(key);
        }
        // 等号
        else if (key === '=' || key === 'Enter') {
            this.calculatorEquals();
        }
        // 清除
        else if (key === 'Escape' || key === 'Delete') {
            this.calculatorClear();
        }
        // 退格键
        else if (key === 'Backspace') {
            const currentDisplay = calculatorDisplay.value;
            if (currentDisplay.length > 1) {
                calculatorDisplay.value = currentDisplay.slice(0, -1);
                this.expression = calculatorDisplay.value;
            } else {
                calculatorDisplay.value = '0';
                this.expression = '';
                this.newOperation = true;
            }
        }
        
        // 确保计算器输入框获得焦点
        calculatorDisplay.focus();
    },
    
    // 清空计算器
    calculatorClear: function() {
        this.expression = '';
        this.result = '';
        this.newOperation = true;
        document.getElementById('calculator-display').value = '0';
    },
    
    // 输入数字
    calculatorNumber: function(num) {
        if (this.newOperation) {
            // 如果是新的操作，清空当前显示
            this.expression = '';
            this.newOperation = false;
            document.getElementById('calculator-display').value = num.toString();
        } else {
            // 否则追加到当前显示
            const currentDisplay = document.getElementById('calculator-display').value;
            if (currentDisplay === '0') {
                // 如果当前显示是0，直接替换
                document.getElementById('calculator-display').value = num.toString();
            } else {
                // 否则追加
                document.getElementById('calculator-display').value += num.toString();
            }
        }
        this.expression = document.getElementById('calculator-display').value;
    },
    
    // 输入小数点
    calculatorDecimal: function() {
        if (this.newOperation) {
            // 如果是新的操作，开始一个新的小数
            this.expression = '0.';
            this.newOperation = false;
            document.getElementById('calculator-display').value = '0.';
        } else {
            const currentDisplay = document.getElementById('calculator-display').value;
            // 检查当前显示是否已经包含小数点
            if (!currentDisplay.includes('.')) {
                document.getElementById('calculator-display').value += '.';
                this.expression = document.getElementById('calculator-display').value;
            }
        }
    },
    
    // 输入运算符
    calculatorOperator: function(op) {
        const currentDisplay = document.getElementById('calculator-display').value;
        
        // 处理平方运算符特殊情况
        if (op === '^') {
            try {
                const num = parseFloat(currentDisplay);
                const result = num * num;
                document.getElementById('calculator-display').value = result;
                this.expression = result.toString();
                this.newOperation = true;
            } catch (error) {
                document.getElementById('calculator-display').value = '错误';
                console.error('计算器平方运算错误:', error);
            }
            return;
        }
        
        if (this.newOperation && this.result !== '') {
            // 如果是新的操作且有之前的结果，使用之前的结果作为新操作的第一个数
            this.expression = this.result + op;
            document.getElementById('calculator-display').value = this.result + op;
            this.newOperation = false;
        } else {
            // 否则追加运算符到表达式
            this.expression = currentDisplay + op;
            document.getElementById('calculator-display').value = this.expression;
            this.newOperation = false;
        }
    },
    
    // 输入函数
    calculatorFunction: function(func) {
        const currentDisplay = document.getElementById('calculator-display').value;
        let result = '';
        
        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(parseFloat(currentDisplay) * Math.PI / 180); // 假设输入的是角度
                    break;
                case 'cos':
                    result = Math.cos(parseFloat(currentDisplay) * Math.PI / 180); // 假设输入的是角度
                    break;
                case 'tan':
                    result = Math.tan(parseFloat(currentDisplay) * Math.PI / 180); // 假设输入的是角度
                    break;
                case 'sqrt':
                    result = Math.sqrt(parseFloat(currentDisplay));
                    break;
                case 'log10':
                    result = Math.log10(parseFloat(currentDisplay));
                    break;
                case 'ln':
                    result = Math.log(parseFloat(currentDisplay));
                    break;
                case 'π':
                    result = Math.PI;
                    break;
            }
            
            // 处理精度问题，保留10位小数
            result = parseFloat(result.toFixed(10));
            
            document.getElementById('calculator-display').value = result;
            this.expression = result.toString();
            this.result = result.toString();
            this.newOperation = true;
        } catch (error) {
            document.getElementById('calculator-display').value = '错误';
            console.error('计算器函数错误:', error);
        }
    },
    
    // 计算结果
    calculatorEquals: function() {
        const expression = document.getElementById('calculator-display').value;
        
        try {
            // 使用Function构造函数安全地计算表达式
            // 替换显示的运算符为JavaScript运算符
            const jsExpression = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-');
            
            // 创建一个函数来计算表达式
            const calculate = new Function('return ' + jsExpression);
            const result = calculate();
            
            // 处理精度问题，保留10位小数
            const formattedResult = parseFloat(result.toFixed(10));
            
            document.getElementById('calculator-display').value = formattedResult;
            this.result = formattedResult.toString();
            this.newOperation = true;
        } catch (error) {
            document.getElementById('calculator-display').value = '错误';
            console.error('计算器计算错误:', error);
        }
    },
    
    // 复制结果到剪贴板
    calculatorCopyResult: function() {
        const display = document.getElementById('calculator-display');
        
        // 创建一个临时输入元素
        const tempInput = document.createElement('input');
        tempInput.value = display.value;
        document.body.appendChild(tempInput);
        
        // 选择并复制
        tempInput.select();
        document.execCommand('copy');
        
        // 移除临时元素
        document.body.removeChild(tempInput);
        
        // 显示复制成功提示
        const originalText = document.querySelector('button[onclick="calculatorCopyResult()"]').textContent;
        document.querySelector('button[onclick="calculatorCopyResult()"]').textContent = '已复制!';
        setTimeout(() => {
            document.querySelector('button[onclick="calculatorCopyResult()"]').textContent = originalText;
        }, 2000);
    },
    
    // 切换高级模式显示
    calculatorToggleScientific: function() {
        const scientificFunctions = document.getElementById('scientific-functions');
        const toggleButton = document.querySelector('button[onclick="calculatorToggleScientific()"]');
        
        if (scientificFunctions.style.display === 'none') {
            scientificFunctions.style.display = 'block';
            toggleButton.textContent = '基本模式';
        } else {
            scientificFunctions.style.display = 'none';
            toggleButton.textContent = '高级模式';
        }
    },
    
    // 初始化计算器
    initCalculator: function() {
        try {
            this.calculatorClear();
            
            // 添加键盘事件监听器
            document.addEventListener('keydown', (event) => {
                // 检查是否在输入框中，如果是则不处理键盘事件，避免冲突
                if (event.target.tagName === 'INPUT' && event.target.type === 'text') {
                    return;
                }
                this.handleKeyPress(event);
            });
            
            // 为计算器显示框添加焦点事件，使其可以直接通过键盘输入
            const calculatorDisplay = document.getElementById('calculator-display');
            if (calculatorDisplay) {
                calculatorDisplay.setAttribute('tabindex', '0');
                calculatorDisplay.addEventListener('focus', () => {
                    calculatorDisplay.select();
                });
            }
            
            console.log('计算器工具初始化完成，键盘输入功能已启用');
        } catch (e) {
            console.warn('计算器工具初始化失败:', e);
        }
    }
};

// 导出模块对象到全局作用域，供其他脚本使用
window.calculatorModule = calculatorModule;
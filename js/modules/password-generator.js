// 随机密码生成工具
// 此模块提供密码生成功能，支持自定义密码长度和包含字符类型

(function() {
    // 创建密码生成器模块对象
    const passwordGenerator = {
        // 生成随机密码
        generatePassword: function() {
            const length = parseInt(document.getElementById('password-length').value) || 12;
            const includeUppercase = document.getElementById('include-uppercase').checked;
            const includeLowercase = document.getElementById('include-lowercase').checked;
            const includeNumbers = document.getElementById('include-numbers').checked;
            const includeSpecial = document.getElementById('include-special').checked;
            
            // 确保至少选择一种字符类型
            if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecial) {
                alert('请至少选择一种字符类型');
                return;
            }
            
            // 定义字符集
            let charset = '';
            if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (includeNumbers) charset += '0123456789';
            if (includeSpecial) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
            
            // 生成密码
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            
            // 显示结果
            document.getElementById('password-output').value = password;
        },
        
        // 重置密码选项
        resetPasswordOptions: function() {
            document.getElementById('password-length').value = 12;
            document.getElementById('include-uppercase').checked = true;
            document.getElementById('include-lowercase').checked = true;
            document.getElementById('include-numbers').checked = true;
            document.getElementById('include-special').checked = true;
            document.getElementById('password-output').value = '';
        },
        
        // 初始化密码生成工具
        initPasswordTool: function() {
            console.log('随机密码生成工具已初始化');
            // 为重置选项按钮添加事件监听
            const resetButton = document.querySelector('button[onclick="resetPasswordOptions()"]');
            if (resetButton) {
                resetButton.addEventListener('click', this.resetPasswordOptions);
            }
            
            // 为生成密码按钮添加事件监听
            const generateButton = document.querySelector('button[onclick="generatePassword()"]');
            if (generateButton) {
                generateButton.addEventListener('click', this.generatePassword);
            }
        }
    };
    
    // 将密码生成器模块导出到全局window对象
    window.passwordModule = passwordGenerator;
    
    // 初始化工具
    if (typeof window.moduleInitialized === 'undefined') {
        window.moduleInitialized = {};
    }
    
    // 避免重复初始化
    if (!window.moduleInitialized.password) {
        passwordGenerator.initPasswordTool();
        window.moduleInitialized.password = true;
    }
})();
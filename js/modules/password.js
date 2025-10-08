// 密码生成工具模块
function initPasswordTool() {
    // 密码工具初始化代码
    console.log('Password tool initialized');
}

function generatePassword() {
    // 获取用户设置
    const length = parseInt(document.getElementById('password-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSpecial = document.getElementById('include-special').checked;
    
    // 验证至少选择了一种字符类型
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecial) {
        alert('请至少选择一种字符类型！');
        return;
    }
    
    // 定义字符集
    let charset = '';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // 根据用户选择添加字符集
    if (includeLowercase) charset += lowercaseChars;
    if (includeUppercase) charset += uppercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSpecial) charset += specialChars;
    
    // 生成密码
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    
    // 显示密码
    document.getElementById('password-result').value = password;
}

// 导出函数
window.passwordModule = {
    initPasswordTool,
    generatePassword
};
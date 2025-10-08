// BCrypt加密工具模块 - 与tools-1.js保持一致的实现
// 初始化BCrypt工具
function initBcryptTool() {
    // 初始化BCrypt工具界面
    console.log('BCrypt工具初始化');
}

// 生成BCrypt盐值 - 使用bcryptjs库的标准方法
function generateBCryptSalt() {
    try {
        // 使用bcryptjs库生成标准盐值，工作因子为10
        const salt = dcodeIO.bcrypt.genSaltSync(10);
        document.getElementById('bcrypt-salt').value = salt;
        showBCryptMessage('盐值生成成功！', false);
    } catch (error) {
        showBCryptMessage('盐值生成失败: ' + error.message);
        console.error('BCrypt盐值生成错误:', error);
    }
}

// 显示BCrypt错误信息
function showBCryptMessage(message, isError = true) {
    const errorElement = document.getElementById('bcrypt-error');
    errorElement.textContent = message;
    errorElement.className = isError ? 'mt-2 alert alert-danger' : 'mt-2 alert alert-success';
    errorElement.style.display = 'block';
    
    // 3秒后自动隐藏成功信息
    if (!isError) {
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    }
}

// 清空BCrypt输入和输出
function clearBCrypt() {
    document.getElementById('bcrypt-password').value = '';
    document.getElementById('bcrypt-salt').value = '';
    document.getElementById('bcrypt-output').value = '';
    document.getElementById('bcrypt-error').style.display = 'none';
}

// BCrypt加密函数
async function encryptBCrypt() {
    try {
        // 隐藏之前的错误信息
        document.getElementById('bcrypt-error').style.display = 'none';
        
        // 获取输入
        const password = document.getElementById('bcrypt-password').value.trim();
        let salt = document.getElementById('bcrypt-salt').value.trim();
        
        // 验证输入
        if (!password) {
            showBCryptMessage('请输入要加密的密码！');
            return;
        }
        
        // 如果没有提供盐值，则自动生成
        if (!salt) {
            generateBCryptSalt();
            salt = document.getElementById('bcrypt-salt').value;
        }
        
        // 显示加载状态
        showBCryptMessage('正在加密，请稍候...', false);
        
        // 使用bcrypt算法加密密码
        const hashedPassword = await dcodeIO.bcrypt.hash(password, salt);
        
        // 显示加密结果
        document.getElementById('bcrypt-output').value = hashedPassword;
        showBCryptMessage('加密成功！', false);
    } catch (error) {
        showBCryptMessage('加密失败: ' + error.message);
        console.error('BCrypt加密错误:', error);
    }
}

// BCrypt密码校验函数
async function checkBCrypt() {
    try {
        // 隐藏之前的错误信息
        document.getElementById('bcrypt-error').style.display = 'none';
        
        // 获取输入
        const password = document.getElementById('bcrypt-password').value.trim();
        const hashedPassword = document.getElementById('bcrypt-output').value.trim();
        
        // 验证输入
        if (!password) {
            showBCryptMessage('请输入要校验的密码！');
            return;
        }
        
        if (!hashedPassword) {
            showBCryptMessage('请确保已经生成了BCrypt哈希值！');
            return;
        }
        
        // 显示加载状态
        showBCryptMessage('正在校验，请稍候...', false);
        
        // 执行BCrypt校验
        const matches = await dcodeIO.bcrypt.compare(password, hashedPassword);
        
        // 显示校验结果
        if (matches) {
            document.getElementById('bcrypt-output').value = '密码匹配成功！';
            showBCryptMessage('密码校验成功！', false);
        } else {
            document.getElementById('bcrypt-output').value = '密码不匹配！';
            showBCryptMessage('密码校验失败！');
        }
    } catch (error) {
        showBCryptMessage('校验失败: ' + error.message);
        console.error('BCrypt校验错误:', error);
    }
}

// 导出函数
window.bcryptModule = {
    initBcryptTool,
    generateBCryptSalt,
    showBCryptMessage,
    clearBCrypt,
    encryptBCrypt,
    checkBCrypt
};

// 使用标准的bcryptjs库实现
// 注意：需要先引入vendor/bcryptjs.min.js
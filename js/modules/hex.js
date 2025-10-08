// Hex编码转换工具模块
function initHexTool() {
    // 初始化Hex编码转换工具
    document.getElementById('hex-input').value = '';
    document.getElementById('hex-output').value = '';
}

// 显示Hex转换错误信息
function showHexMessage(message, isError = true) {
    const errorElement = document.getElementById('hex-error');
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

// 清空Hex输入和输出
function clearHex() {
    document.getElementById('hex-input').value = '';
    document.getElementById('hex-output').value = '';
    document.getElementById('hex-error').style.display = 'none';
}

// 字符串转Hex编码
function stringToHex() {
    // 隐藏之前的错误信息
    document.getElementById('hex-error').style.display = 'none';
    
    // 获取输入
    const content = document.getElementById('hex-input').value.trim();
    
    // 验证输入
    if (!content) {
        showHexMessage('请输入要转换的字符串！');
        return;
    }
    
    try {
        let hex = '';
        for (let i = 0; i < content.length; i++) {
            const charCode = content.charCodeAt(i);
            const hexValue = charCode.toString(16).toUpperCase();
            hex += hexValue.padStart(2, '0');
        }
        
        // 显示转换结果
        document.getElementById('hex-output').value = hex;
        showHexMessage('字符串转Hex成功！', false);
    } catch (error) {
        showHexMessage('转换失败: ' + error.message);
        console.error('字符串转Hex错误:', error);
    }
}

// Hex编码转字符串
function hexToString() {
    // 隐藏之前的错误信息
    document.getElementById('hex-error').style.display = 'none';
    
    // 获取输入
    let content = document.getElementById('hex-input').value.trim();
    
    // 验证输入
    if (!content) {
        showHexMessage('请输入要转换的Hex编码！');
        return;
    }
    
    // 移除所有非十六进制字符
    content = content.replace(/[^0-9A-Fa-f]/g, '');
    
    // 检查Hex长度是否为偶数
    if (content.length % 2 !== 0) {
        showHexMessage('Hex编码长度必须为偶数！');
        return;
    }
    
    try {
        let str = '';
        for (let i = 0; i < content.length; i += 2) {
            const hexPair = content.substr(i, 2);
            const charCode = parseInt(hexPair, 16);
            str += String.fromCharCode(charCode);
        }
        
        // 显示转换结果
        document.getElementById('hex-output').value = str;
        showHexMessage('Hex转字符串成功！', false);
    } catch (error) {
        showHexMessage('转换失败: ' + error.message);
        console.error('Hex转字符串错误:', error);
    }
}

// 复制Hex输出结果
function copyHexOutput() {
    try {
        const text = document.getElementById('hex-output').value;
        navigator.clipboard.writeText(text);
        
        // 显示复制成功提示
        const errorElement = document.getElementById('hex-error');
        if (errorElement) {
            const originalText = errorElement.textContent;
            const originalDisplay = errorElement.style.display;
            
            errorElement.className = 'mt-2 alert alert-success';
            errorElement.textContent = '结果已复制到剪贴板！';
            errorElement.style.display = 'block';
            
            // 3秒后恢复原来的状态
            setTimeout(function() {
                errorElement.className = 'mt-2 alert alert-danger';
                errorElement.textContent = originalText;
                errorElement.style.display = originalDisplay;
            }, 3000);
        }
    } catch (err) {
        console.error('无法复制文本: ', err);
        showHexMessage('复制失败，请手动复制！');
    }
}

// 导出模块到全局对象，保持向后兼容性
window.hexModule = {
    initHexTool,
    showHexMessage,
    clearHex,
    stringToHex,
    hexToString,
    copyHexOutput
};
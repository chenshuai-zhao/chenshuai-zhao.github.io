// Base64编解码工具模块
function initBase64Tool() {
    // Base64工具初始化代码
    console.log('Base64 tool initialized');
}

// Base64编码
function encodeBase64() {
    const input = document.getElementById('base64-input').value;
    if (!input) {
        alert('请输入要编码的内容！');
        return;
    }
    
    try {
        // 使用浏览器内置的btoa函数进行Base64编码
        // 需要先将UTF-8字符串转换为Base64友好的格式
        const encoded = btoa(unescape(encodeURIComponent(input)));
        document.getElementById('base64-output').value = encoded;
    } catch (error) {
        console.error('Base64编码错误:', error);
        alert('编码失败: ' + error.message);
    }
}

// Base64解码
function decodeBase64() {
    const input = document.getElementById('base64-output').value;
    if (!input) {
        alert('请输入要解码的内容！');
        return;
    }
    
    try {
        // 使用浏览器内置的atob函数进行Base64解码
        // 并将解码后的内容转换回UTF-8字符串
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('base64-input').value = decoded;
    } catch (error) {
        console.error('Base64解码错误:', error);
        alert('解码失败: ' + error.message);
    }
}

// 清空Base64输入输出
function clearBase64() {
    document.getElementById('base64-input').value = '';
    document.getElementById('base64-output').value = '';
}

// 复制Base64结果
function copyBase64Result() {
    const output = document.getElementById('base64-output');
    output.select();
    document.execCommand('copy');
    alert('已复制到剪贴板！');
}

// 导出函数
window.base64Module = {
    initBase64Tool,
    encodeBase64,
    decodeBase64,
    clearBase64,
    copyBase64Result
};
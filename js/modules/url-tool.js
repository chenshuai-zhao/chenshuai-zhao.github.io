// URL工具模块
// 此文件包含URL编解码相关的功能实现

// 定义模块对象
const urlToolModule = {
    // URL编码功能
    encodeURL: function() {
        const input = document.getElementById('url-input').value;
        const output = encodeURIComponent(input);
        document.getElementById('url-output').value = output;
    },
    
    // URL解码功能
    decodeURL: function() {
        const input = document.getElementById('url-input').value;
        try {
            const output = decodeURIComponent(input);
            document.getElementById('url-output').value = output;
        } catch (e) {
            alert('URL解码失败: ' + e.message);
            console.error('URL解码错误:', e);
        }
    },
    
    // 去除转义字符功能
    removeEscape: function() {
        const input = document.getElementById('escape-input').value;
        const output = input.replace(/\\(["'\\])/g, '$1');
        document.getElementById('escape-output').value = output;
    },
    
    // 初始化URL工具
    initUrlTool: function() {
        try {
            // 工具初始化代码，如果需要的话
            console.log('URL工具初始化完成');
        } catch (e) {
            console.warn('URL工具初始化失败:', e);
        }
    }
};

// 导出模块对象到全局作用域，供其他脚本使用
window.urlModule = urlToolModule;
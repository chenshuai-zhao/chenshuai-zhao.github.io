// 文本处理工具模块
// 此文件包含文本处理相关的功能实现

// 定义模块对象
const textToolsModule = {
    // 计算字节大小功能
    calculateByteSize: function() {
        const input = document.getElementById('size-input').value;
        
        // 使用TextEncoder API计算UTF-8编码的字节大小
        const encoder = new TextEncoder();
        const bytes = encoder.encode(input);
        const byteLength = bytes.length;
        
        // 显示结果
        document.getElementById('size-output').value = `${byteLength} 字节 (${(byteLength / 1024).toFixed(2)} KB) length:${input.length}`;
    },
    
    // 合并行功能
    mergeLines: function() {
        const input = document.getElementById('merge-input').value;
        // 移除所有换行符
        const output = input.replace(/\r?\n/g, '');
        document.getElementById('merge-output').value = output;
    },
    
    // 拼接引号功能 - 与tools-1.js中的实现保持一致
    addtxt: function(type) {
        // 获取输入值
        const input = document.getElementById('addtxt1').value;
        
        if (!input) return;
        
        // 处理可能存在的 \r\n 换行符
        const linesArray = input.split(/\r?\n/);
        
        // 输出结果数组
        // 使用map方法遍历数组，在每个元素前后添加单引号
        let quotedLines = [];
        if (type == 1) {
            quotedLines = linesArray.map(num => `'${num}'`);
        } else if (type == 2) {
            quotedLines = linesArray.map(num => `"${num}"`);
        } else {
            quotedLines = linesArray.map(num => `${num}`);
        }
        
        // 使用join方法将数组元素用换行符连接成一个字符串
        const resultString = quotedLines.join(',\n');
        document.getElementById('addtxt2').value = resultString;
    },
    
    // 初始化文本处理工具
    initTextTool: function() {
        try {
            // 工具初始化代码，如果需要的话
            console.log('文本处理工具初始化完成');
        } catch (e) {
            console.warn('文本处理工具初始化失败:', e);
        }
    }
};

// 导出模块对象到全局作用域，供其他脚本使用
window.textModule = textToolsModule;
// JSON格式化工具模块
// 此文件包含JSON格式化相关的功能实现

// 定义模块对象
const jsonFormatterModule = {
    // 格式化JSON并使用JSONFormatter组件显示
    tojson: function() {
        const container = document.getElementById('formatted-json');
        try {
            const str = JSON.parse(document.getElementById('json-input').value);
            const formatter = new JSONFormatter(str);
            container.innerHTML = "";
            container.appendChild(formatter.render());
        } catch (error) {
            console.error('JSON解析错误:', error);
            container.innerHTML = `<span style="color: red;">Invalid JSON: ${error.message}</span>`;
        }
    },
    
    // 格式化JSON文本
    formatJson: function() {
        const input = document.getElementById('json-input').value;
        const output = document.getElementById('formatted-json');

        try {
            // 尝试解析并格式化输入的JSON字符串
            const parsedJson = JSON.parse(input);
            const formattedJson = JSON.stringify(parsedJson, null, 4);

            // 显示格式化的JSON
            output.textContent = formattedJson;

            // 可选：进行语法高亮
            this.highlightSyntax(output);
        } catch (error) {
            // 如果解析失败，显示错误信息
            output.innerHTML = `<span style="color: red;">Invalid JSON: ${error.message}</span>`;
        }
    },
    
    // 简单的语法高亮函数
    highlightSyntax: function(element) {
        const code = element.textContent;
        element.innerHTML = code.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function(match) {
                let cls = 'number';
                if (/^".*/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            }
        );
    },
    
    // 初始化JSON格式化工具
    initJsonTool: function() {
        try {
            // 工具初始化代码，如果需要的话
            console.log('JSON格式化工具初始化完成');
        } catch (e) {
            console.warn('JSON格式化工具初始化失败:', e);
        }
    }
};

// 导出模块对象到全局作用域，供其他脚本使用
window.jsonModule = jsonFormatterModule;
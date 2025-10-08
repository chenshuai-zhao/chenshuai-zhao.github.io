// 命名转换工具模块
function initNamingTool() {
    // 命名转换工具初始化代码
    console.log('Naming tool initialized');
}

// 转驼峰命名 (camelCase)
function toCamelCase() {
    const input = document.getElementById('naming-input').value;
    if (!input) {
        document.getElementById('naming-output').value = '';
        return;
    }
    
    // 处理各种分隔符和空格，统一转换为驼峰
    const result = input
        .replace(/[-_\s.]+(\w|$)/g, (_, p1) => p1.toUpperCase())
        .replace(/^([A-Z])/, (_, p1) => p1.toLowerCase());
    
    document.getElementById('naming-output').value = result;
}

// 转帕斯卡命名 (PascalCase)
function toPascalCase() {
    const input = document.getElementById('naming-input').value;
    if (!input) {
        document.getElementById('naming-output').value = '';
        return;
    }
    
    // 处理各种分隔符和空格，统一转换为帕斯卡
    const result = input
        .replace(/[-_\s.]+(\w|$)/g, (_, p1) => p1.toUpperCase())
        .replace(/^(\w)/, (_, p1) => p1.toUpperCase());
    
    document.getElementById('naming-output').value = result;
}

// 转蛇形命名 (snake_case)
function toSnakeCase() {
    const input = document.getElementById('naming-input').value;
    if (!input) {
        document.getElementById('naming-output').value = '';
        return;
    }
    
    // 处理各种分隔符和空格，统一转换为蛇形
    const result = input
        .replace(/([A-Z])/g, '_$1')
        .replace(/[-_\s.]+/g, '_')
        .toLowerCase()
        .replace(/^_/, '')
        .replace(/_$/, '');
    
    document.getElementById('naming-output').value = result;
}

// 转短横线命名 (kebab-case)
function toKebabCase() {
    const input = document.getElementById('naming-input').value;
    if (!input) {
        document.getElementById('naming-output').value = '';
        return;
    }
    
    // 处理各种分隔符和空格，统一转换为短横线
    const result = input
        .replace(/([A-Z])/g, '-$1')
        .replace(/[-_\s.]+/g, '-')
        .toLowerCase()
        .replace(/^-/, '')
        .replace(/-$/, '');
    
    document.getElementById('naming-output').value = result;
}

// 转点号命名 (dot.case)
function toDotCase() {
    const input = document.getElementById('naming-input').value;
    if (!input) {
        document.getElementById('naming-output').value = '';
        return;
    }
    
    // 处理各种分隔符和空格，统一转换为点号
    const result = input
        .replace(/([A-Z])/g, '.$1')
        .replace(/[-_\s.]+/g, '.')
        .toLowerCase()
        .replace(/^\./, '')
        .replace(/\.$/, '');
    
    document.getElementById('naming-output').value = result;
}

// 转常量命名 (CONSTANT_CASE)
function toConstantCase() {
    const input = document.getElementById('naming-input').value;
    if (!input) {
        document.getElementById('naming-output').value = '';
        return;
    }
    
    // 处理各种分隔符和空格，统一转换为常量
    const result = input
        .replace(/([A-Z])/g, '_$1')
        .replace(/[-_\s.]+/g, '_')
        .toUpperCase()
        .replace(/^_/, '')
        .replace(/_$/, '');
    
    document.getElementById('naming-output').value = result;
}

// 清空命名转换工具
function clearNaming() {
    document.getElementById('naming-input').value = '';
    document.getElementById('naming-output').value = '';
}

// 导出函数
window.namingModule = {
    initNamingTool,
    toCamelCase,
    toPascalCase,
    toSnakeCase,
    toKebabCase,
    toDotCase,
    toConstantCase,
    clearNaming
};
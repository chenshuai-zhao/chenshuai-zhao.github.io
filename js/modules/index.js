// 工具集合主入口文件
// 此文件负责导入所有工具模块并在页面加载时初始化

// 初始化所有工具
function initAllTools() {
    console.log('开始初始化所有工具模块');
    
    // 初始化VSCode工具
    if (typeof window.vscodeModule !== 'undefined' && typeof window.vscodeModule.initVSCodeTool === 'function') {
        try {
            window.vscodeModule.initVSCodeTool();
        } catch (e) {
            console.warn('VSCode工具初始化失败:', e);
        }
    }
    
    // 初始化密码生成工具
    if (typeof window.passwordModule !== 'undefined' && typeof window.passwordModule.initPasswordTool === 'function') {
        try {
            window.passwordModule.initPasswordTool();
        } catch (e) {
            console.warn('密码生成工具初始化失败:', e);
        }
    }
    
    // 初始化JWT解析工具
    if (typeof window.jwtModule !== 'undefined' && typeof window.jwtModule.initJWT === 'function') {
        try {
            window.jwtModule.initJWT();
        } catch (e) {
            console.warn('JWT解析工具初始化失败:', e);
        }
    }
    
    // 初始化AES加密工具
    if (typeof window.aesModule !== 'undefined' && typeof window.aesModule.initAESTool === 'function') {
        try {
            window.aesModule.initAESTool();
        } catch (e) {
            console.warn('AES加密工具初始化失败:', e);
        }
    }
    
    // 初始化BCrypt加密工具
    if (typeof window.bcryptModule !== 'undefined' && typeof window.bcryptModule.initBcryptTool === 'function') {
        try {
            window.bcryptModule.initBcryptTool();
        } catch (e) {
            console.warn('BCrypt加密工具初始化失败:', e);
        }
    }
    
    // 初始化SM4加密工具
    if (typeof window.sm4Module !== 'undefined' && typeof window.sm4Module.initSM4Tool === 'function') {
        try {
            window.sm4Module.initSM4Tool();
        } catch (e) {
            console.warn('SM4加密工具初始化失败:', e);
        }
    }
    
    // 初始化Hex编码转换工具
    if (typeof window.hexModule !== 'undefined' && typeof window.hexModule.initHexTool === 'function') {
        try {
            window.hexModule.initHexTool();
            console.log('Hex编码转换工具初始化成功');
        } catch (e) {
            console.warn('Hex编码转换工具初始化失败:', e);
        }
    }
    
    // 初始化JSON格式化工具
    if (typeof window.jsonModule !== 'undefined' && typeof window.jsonModule.initJsonTool === 'function') {
        try {
            window.jsonModule.initJsonTool();
            console.log('JSON格式化工具初始化成功');
        } catch (e) {
            console.warn('JSON格式化工具初始化失败:', e);
        }
    }
    
    // 初始化URL工具
    if (typeof window.urlModule !== 'undefined' && typeof window.urlModule.initUrlTool === 'function') {
        try {
            window.urlModule.initUrlTool();
            console.log('URL工具初始化成功');
        } catch (e) {
            console.warn('URL工具初始化失败:', e);
        }
    }
    
    // 初始化文本处理工具
    if (typeof window.textModule !== 'undefined' && typeof window.textModule.initTextTool === 'function') {
        try {
            window.textModule.initTextTool();
            console.log('文本处理工具初始化成功');
        } catch (e) {
            console.warn('文本处理工具初始化失败:', e);
        }
    }
    
    // 初始化计算器工具
    if (typeof window.calculatorModule !== 'undefined' && typeof window.calculatorModule.initCalculator === 'function') {
        try {
            window.calculatorModule.initCalculator();
            console.log('计算器工具初始化成功');
        } catch (e) {
            console.warn('计算器工具初始化失败:', e);
        }
    }
    
    // 初始化Base64工具
    if (typeof window.base64Module !== 'undefined' && typeof window.base64Module.initBase64Tool === 'function') {
        try {
            window.base64Module.initBase64Tool();
            console.log('Base64工具初始化成功');
        } catch (e) {
            console.warn('Base64工具初始化失败:', e);
        }
    }
    
    // 初始化时间戳工具
    if (typeof window.timestampModule !== 'undefined' && typeof window.timestampModule.initTimestampTool === 'function') {
        try {
            window.timestampModule.initTimestampTool();
            console.log('时间戳工具初始化成功');
        } catch (e) {
            console.warn('时间戳工具初始化失败:', e);
        }
    }
    
    // 初始化命名转换工具
    if (typeof window.namingModule !== 'undefined' && typeof window.namingModule.initNamingTool === 'function') {
        try {
            window.namingModule.initNamingTool();
            console.log('命名转换工具初始化成功');
        } catch (e) {
            console.warn('命名转换工具初始化失败:', e);
        }
    }
    
    console.log('所有工具模块初始化完成');
}

// 导出initAllTools函数供外部调用
window.toolsModule = {
    initAllTools
};
// 模块化重构后的薄包装层
// 此文件负责加载所有模块化的工具文件并保持向后兼容性

// 动态加载模块化的工具文件
function loadModuleScripts() {
    // 定义需要加载的模块文件列表
const modules = [
    'js/modules/uuid.js',
    'js/modules/case-converter.js',
    'js/modules/vscode.js',
    'js/modules/password-generator.js',
    'js/modules/jwt.js',
    'js/modules/aes.js',
    'js/modules/bcrypt.js',
    'js/modules/sm4.js',
    'js/modules/hex.js',
    'js/modules/json-formatter.js',
    'js/modules/url-tool.js',
    'js/modules/text-tools.js',
    'js/modules/calculator.js',
    'js/modules/base64.js',
    'js/modules/timestamp.js',
    'js/modules/naming.js',
    'js/modules/index.js'
];
    
    // 跟踪加载状态
    let loadedCount = 0;
    const totalModules = modules.length;
    
    // 创建并加载每个模块脚本
    modules.forEach(modulePath => {
        const script = document.createElement('script');
        script.src = modulePath;
        script.async = false; // 确保顺序加载
        
        script.onload = function() {
            loadedCount++;
            if (loadedCount === totalModules) {
                // 所有模块加载完成后，设置全局函数映射
                setupGlobalFunctionMappings();
            }
        };
        
        script.onerror = function() {
            console.error('Failed to load module:', modulePath);
        };
        
        document.head.appendChild(script);
    });
}

// 设置全局函数映射，保持向后兼容性
function setupGlobalFunctionMappings() {
    // UUID生成工具函数映射
    if (window.uuidModule) {
        window.guid = window.uuidModule.guid;
        window.clean = window.uuidModule.clean;
        window.removeStr = window.uuidModule.removeStr;
        window.generator = window.uuidModule.generator;
        window.copyToClipboardModern = window.uuidModule.copyToClipboardModern;
    }
    
    // 大小写转换工具函数映射
    if (window.caseConverterModule) {
        window.toUpper = window.caseConverterModule.toUpper;
        window.toLower = window.caseConverterModule.toLower;
        window.reverseText = window.caseConverterModule.reverseText;
        window.clearText = window.caseConverterModule.clearText;
        window.toFirstUpper = window.caseConverterModule.toFirstUpper;
    }
    
    // 文本处理工具函数映射
    if (window.textModule) {
        window.calculateByteSize = window.textModule.calculateByteSize;
        window.mergeLines = window.textModule.mergeLines;
        window.addtxt = window.textModule.addtxt;
    }
    
    // 计算器工具函数映射
    if (window.calculatorModule) {
        window.calculatorClear = window.calculatorModule.calculatorClear.bind(window.calculatorModule);
        window.calculatorNumber = window.calculatorModule.calculatorNumber.bind(window.calculatorModule);
        window.calculatorDecimal = window.calculatorModule.calculatorDecimal.bind(window.calculatorModule);
        window.calculatorOperator = window.calculatorModule.calculatorOperator.bind(window.calculatorModule);
        window.calculatorFunction = window.calculatorModule.calculatorFunction.bind(window.calculatorModule);
        window.calculatorEquals = window.calculatorModule.calculatorEquals.bind(window.calculatorModule);
        window.calculatorCopyResult = window.calculatorModule.calculatorCopyResult.bind(window.calculatorModule);
        window.calculatorToggleScientific = window.calculatorModule.calculatorToggleScientific.bind(window.calculatorModule);
    }
    
    // JSON格式化工具函数映射
    if (window.jsonModule) {
        window.tojson = window.jsonModule.tojson;
        window.formatJson = window.jsonModule.formatJson;
        window.highlightSyntax = window.jsonModule.highlightSyntax;
    }
    
    // URL工具函数映射
    if (window.urlModule) {
        window.encodeURL = window.urlModule.encodeURL;
        window.decodeURL = window.urlModule.decodeURL;
        window.removeEscape = window.urlModule.removeEscape;
    }
    
        // 密码生成工具函数映射
    if (window.passwordModule) {
        window.generatePassword = window.passwordModule.generatePassword;
    }
    
    // BCrypt加密工具函数映射
    if (window.bcryptModule) {
        window.encryptBCrypt = window.bcryptModule.encryptBCrypt;
        window.checkBCrypt = window.bcryptModule.checkBCrypt;
        window.clearBCrypt = window.bcryptModule.clearBCrypt;
        window.generateBCryptSalt = window.bcryptModule.generateBCryptSalt;
    }
    
    // Base64工具函数映射
    if (window.base64Module) {
        window.encodeBase64 = window.base64Module.encodeBase64;
        window.decodeBase64 = window.base64Module.decodeBase64;
        window.clearBase64 = window.base64Module.clearBase64;
        window.copyBase64Result = window.base64Module.copyBase64Result;
    }
    
    // 时间戳工具函数映射
    if (window.timestampModule) {
        window.timestampToDatetime = window.timestampModule.timestampToDatetime;
        window.datetimeToTimestamp = window.timestampModule.datetimeToTimestamp;
        window.clearTimestamp = window.timestampModule.clearTimestamp;
        window.getCurrentTimestamp = window.timestampModule.getCurrentTimestamp;
    }
    
    // 命名转换工具函数映射
    if (window.namingModule) {
        window.toCamelCase = window.namingModule.toCamelCase;
        window.toPascalCase = window.namingModule.toPascalCase;
        window.toSnakeCase = window.namingModule.toSnakeCase;
        window.toKebabCase = window.namingModule.toKebabCase;
        window.toDotCase = window.namingModule.toDotCase;
        window.toConstantCase = window.namingModule.toConstantCase;
        window.clearNaming = window.namingModule.clearNaming;
    }
    
    console.log('模块化工具已加载，向后兼容性已保持');
    
    // 调用initAllTools初始化所有工具
    if (window.toolsModule && typeof window.toolsModule.initAllTools === 'function') {
        console.log('准备调用initAllTools函数');
        window.toolsModule.initAllTools();
    }
}

// 当DOM加载完成时加载模块
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadModuleScripts);
} else {
    // DOM已经加载完成，直接加载模块
    loadModuleScripts();
}
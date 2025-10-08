// VSCode工具模块
function initVSCodeTool() {
    // 初始化链接状态
    updateVSCodeLink();
}

function updateVSCodeLink() {
    // 实现VSCode链接更新逻辑
    // 注意：这里可能需要根据实际代码实现完整功能
    console.log('VSCode link updated');
}

// 导出函数
window.vscodeModule = {
    initVSCodeTool,
    updateVSCodeLink
};
// 时间戳转换工具模块
function initTimestampTool() {
    // 时间戳工具初始化代码
    console.log('Timestamp tool initialized');
}

// 时间戳转日期
function timestampToDatetime() {
    const timestampInput = document.getElementById('timestamp-input').value.trim();
    if (!timestampInput) {
        alert('请输入时间戳！');
        return;
    }
    
    try {
        // 处理可能的秒级时间戳（10位）
        let timestamp = parseInt(timestampInput);
        if (timestamp.toString().length === 10) {
            timestamp *= 1000;
        }
        
        const date = new Date(timestamp);
        
        // 检查是否是有效日期
        if (isNaN(date.getTime())) {
            alert('无效的时间戳！');
            return;
        }
        
        // 格式化日期输出为datetime-local格式
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        const datetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        document.getElementById('datetime-input').value = datetimeLocal;
    } catch (error) {
        console.error('时间戳转换错误:', error);
        alert('转换失败: ' + error.message);
    }
}

// 日期转时间戳
function datetimeToTimestamp() {
    const datetimeInput = document.getElementById('datetime-input').value;
    if (!datetimeInput) {
        alert('请选择日期时间！');
        return;
    }
    
    try {
        const date = new Date(datetimeInput);
        
        // 检查是否是有效日期
        if (isNaN(date.getTime())) {
            alert('无效的日期时间！');
            return;
        }
        
        // 获取时间戳（毫秒级）
        const timestamp = date.getTime();
        
        document.getElementById('timestamp-input').value = timestamp;
    } catch (error) {
        console.error('日期时间转换错误:', error);
        alert('转换失败: ' + error.message);
    }
}

// 获取当前时间戳
function getCurrentTimestamp() {
    const now = Date.now();
    document.getElementById('timestamp-input').value = now;
    
    // 同时设置当前日期时间到datetime-input
    const date = new Date(now);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const datetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    document.getElementById('datetime-input').value = datetimeLocal;
}

// 清空时间戳输入输出
function clearTimestamp() {
    document.getElementById('timestamp-input').value = '';
    document.getElementById('date-output').value = '';
    document.getElementById('date-input').value = '';
    document.getElementById('timestamp-output').value = '';
}

// 导出函数
window.timestampModule = {
    initTimestampTool,
    timestampToDatetime,
    datetimeToTimestamp,
    getCurrentTimestamp,
    clearTimestamp
};
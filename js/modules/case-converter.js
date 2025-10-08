// 大小写转换工具模块
function toUpper() {
    $("#upperLowerL2").val($("#upperLowerL1").val().toString().toUpperCase());
}

function toLower() {
    $("#upperLowerL2").val($("#upperLowerL1").val().toString().toLowerCase());
}

function reverseText() {
    var text = $("#upperLowerL1").val().toString();
    var reversedText = text.split('').reverse().join('');
    $("#upperLowerL2").val(reversedText);
}

function clearText() {
    $("#upperLowerL1").val('');
    $("#upperLowerL2").val('');
}

// 首字母大写
function toFirstUpper() {
    const text = $("#upperLowerL1").val().toString();
    if (!text) {
        $("#upperLowerL2").val('');
        return;
    }
    
    // 将文本按行分割
    const lines = text.split('\n');
    const result = lines.map(line => {
        if (!line.trim()) return line;
        // 将每个单词的首字母大写
        return line.replace(/\b\w/g, char => char.toUpperCase());
    }).join('\n');
    
    $("#upperLowerL2").val(result);
}

// 导出函数
window.caseConverterModule = {
    toUpper,
    toLower,
    reverseText,
    clearText,
    toFirstUpper
};
function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function clean() {
	document.getElementById("exampleFormControlTextarea1").value = "";
}


function removeStr() {
	var va = document.getElementById("exampleFormControlTextarea1").value;
	document.getElementById("exampleFormControlTextarea1").value = va.replaceAll("-", "");
}

function generator() {
	// 获取textarea元素
	var textarea = document.getElementById("exampleFormControlTextarea1");

	var number = document.getElementById("exampleFormControlInput1").value;

	for (var i = 0; i < number; i++) {
		// 要追加的文本
		var newText = guid();
		// 如果textarea已经有内容，确保以换行符结尾
		if (textarea.value) {
			textarea.value += "\n"; // 在非Windows系统上使用\n换行，在Windows上可能需要\r\n
		}
		// 追加新的文本
		textarea.value += newText;
	}
}

function copyToClipboardModern() {
	try {
		var text = document.getElementById("exampleFormControlTextarea1").value;
		// 调用navigator.clipboard.writeText并等待结果
		navigator.clipboard.writeText(text);
		console.log("文本已复制到剪贴板");
	} catch (err) {
		console.error("无法复制文本: ", err);
	}
}


function toUpper() {
	$("#upperLowerL2").val($("#upperLowerL1").val().toString().toUpperCase());
}

function toFirstUpper() {
	$("#upperLowerL2").val(capitalizeFirstLetter($("#upperLowerL1").val().toString()));


}

function capitalizeFirstLetter(string) {
	if (typeof string !== 'string' || string.length === 0) {
		return string; // 返回原值如果它不是字符串或为空
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}


function toLower() {
	$("#upperLowerL2").val($("#upperLowerL1").val().toLowerCase());
}

function addtxt(type) {
	var str = $("#addtxt1").val();
	// 处理可能存在的 \r\n 换行符
	let numbersArray = str.split(/\r?\n/);
	// 输出结果数组
	// 使用map方法遍历数组，在每个元素前后添加单引号
	let quotedNumbers = [];
	if (type == 1) {
		quotedNumbers = numbersArray.map(num => `'${num}'`);
	} else if (type == 2) {
		quotedNumbers = numbersArray.map(num => `"${num}"`);
	} else {
		quotedNumbers = numbersArray.map(num => `${num}`);
	}


	// 使用join方法将数组元素用换行符连接成一个字符串
	let resultString = quotedNumbers.join(',\n');
	$("#addtxt2").val(resultString);
}

function tojson() {
	const container = document.getElementById('formatted-json');
	const str = JSON.parse($("#json-input").val())
	const formatter = new JSONFormatter(
		str
	);
	container.innerHTML = "";
	container.appendChild(formatter.render());
}

function formatJson() {
	const input = document.getElementById('json-input').value;
	const output = document.getElementById('formatted-json');

	try {
		// 尝试解析并格式化输入的JSON字符串
		const parsedJson = JSON.parse(input);
		const formattedJson = JSON.stringify(parsedJson, null, 4);

		// 显示格式化的JSON
		output.textContent = formattedJson;

		// 可选：进行语法高亮（如果需要）
		highlightSyntax(output);
	} catch (error) {
		// 如果解析失败，显示错误信息
		output.innerHTML = `<span style="color: red;">Invalid JSON: ${error.message}</span>`;
	}
}

// 简单的语法高亮函数（可选）
function highlightSyntax(element) {
	const code = element.textContent;
	element.innerHTML = code.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		function(match) {
			let cls = 'number';
			if (/^"/.test(match)) {
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
		});
}


function encodeURL() {
    const input = document.getElementById('url-input').value;
    const output = encodeURIComponent(input);
    document.getElementById('url-output').value = output;
}

function decodeURL() {
    const input = document.getElementById('url-input').value;
    try {
        const output = decodeURIComponent(input);
        document.getElementById('url-output').value = output;
    } catch (e) {
        alert('URL解码失败: ' + e.message);
    }
}

function removeEscape() {
    const input = document.getElementById('escape-input').value;
    const output = input.replace(/\\(["'\\])/g, '$1');
    document.getElementById('escape-output').value = output;
}

function calculateByteSize() {
    const input = document.getElementById('size-input').value;
    
    // 使用TextEncoder API计算UTF-8编码的字节大小
    const encoder = new TextEncoder();
    const bytes = encoder.encode(input);
    const byteLength = bytes.length;
    
    // 显示结果
    document.getElementById('size-output').value = `${byteLength} 字节 (${(byteLength / 1024).toFixed(2)} KB) length:${input.length}`;
}

function mergeLines() {
    const input = document.getElementById('merge-input').value;
    // 移除所有换行符
    const output = input.replace(/\r?\n/g, '');
    document.getElementById('merge-output').value = output;
}

// Base64编解码工具
function encodeBase64() {
    const input = document.getElementById('base64-input').value;
    // 使用TextEncoder和btoa进行UTF-8安全的Base64编码
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const base64String = btoa(String.fromCharCode.apply(null, data));
    document.getElementById('base64-output').value = base64String;
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value;
    try {
        // 使用atob和TextDecoder进行UTF-8安全的Base64解码
        const binaryString = atob(input);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        const decodedText = decoder.decode(bytes);
        document.getElementById('base64-output').value = decodedText;
    } catch (e) {
        alert('Base64解码失败: ' + e.message);
        document.getElementById('base64-output').value = '解码失败';
    }
}

// 时间戳转换工具
function timestampToDatetime() {
    const timestampInput = document.getElementById('timestamp-input').value;
    if (!timestampInput || isNaN(timestampInput)) {
        alert('请输入有效的时间戳');
        return;
    }
    
    let timestamp = parseInt(timestampInput);
    // 如果是10位时间戳，转换为13位（毫秒）
    if (timestamp.toString().length === 10) {
        timestamp *= 1000;
    }
    
    const date = new Date(timestamp);
    // 格式化为YYYY-MM-DDTHH:MM格式，适用于datetime-local输入
    const formattedDate = date.toISOString().slice(0, 16);
    document.getElementById('datetime-input').value = formattedDate;
}

function datetimeToTimestamp() {
    const datetimeInput = document.getElementById('datetime-input').value;
    if (!datetimeInput) {
        alert('请选择日期时间');
        return;
    }
    
    // 转换为时间戳（毫秒）
    const timestamp = new Date(datetimeInput).getTime();
    document.getElementById('timestamp-input').value = timestamp;
}

function getCurrentTimestamp() {
    const currentTimestamp = new Date().getTime();
    document.getElementById('timestamp-input').value = currentTimestamp;
    // 同时更新日期时间输入框
    const formattedDate = new Date().toISOString().slice(0, 16);
    document.getElementById('datetime-input').value = formattedDate;
}

// VSCode调用工具函数
function updateVSCodeLink() {
    const pathInput = document.getElementById('vscode-path');
    const lineInput = document.getElementById('vscode-line');
    const columnInput = document.getElementById('vscode-column');
    const vscodeLink = document.getElementById('open-vscode-link');
    
    if (!pathInput || !vscodeLink) return;
    
    const path = pathInput.value.trim();
    if (path) {
        // 构建VSCode URI
        let vscodeUri = `vscode://file${path}`;
        
        // 添加行号
        const line = lineInput ? parseInt(lineInput.value.trim()) : 0;
        if (line > 0) {
            vscodeUri += `:${line}`;
            
            // 添加列号
            const column = columnInput ? parseInt(columnInput.value.trim()) : 0;
            if (column > 0) {
                vscodeUri += `:${column}`;
            }
        }
        
        vscodeLink.href = vscodeUri;
        vscodeLink.textContent = '打开VSCode';
    } else {
        vscodeLink.removeAttribute('href');
        vscodeLink.textContent = '请输入文件路径';
    }
}

function setCurrentFilePath() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    
    // 尝试获取完整的本地文件路径（仅在特定环境下可能有效）
    let localPath = currentPath;
    
    // 在macOS环境下，如果路径以/Users/开头，可能是完整路径
    if (localPath.startsWith('/Users/')) {
        document.getElementById('vscode-path').value = localPath;
    } else {
        // 否则，使用相对路径作为参考
        document.getElementById('vscode-path').value = localPath;
        // 显示提示信息
        alert('由于浏览器安全限制，无法自动获取完整本地路径。\n请手动输入完整文件路径，如：/Users/chenshuai/Documents/HBuilderProjects/chenshuai-zhao.github.io' + localPath);
    }
    
    updateVSCodeLink();
}

function openCurrentToolFiles() {
    // 尝试打开工具相关的源文件
    try {
        // 打开当前HTML文件
        const htmlPath = window.location.pathname;
        let htmlUri = `vscode://file${htmlPath}`;
        window.open(htmlUri, '_blank');
        
        // 打开对应的JS文件
        const jsPath = '/js/tools.js';
        let jsUri = `vscode://file${jsPath}`;
        
        // 延迟打开JS文件，避免浏览器阻止
        setTimeout(() => {
            window.open(jsUri, '_blank');
        }, 300);
        
    } catch (e) {
        alert('无法打开文件：' + e.message);
    }
}

// 页面加载完成后初始化VSCode工具
function initVSCodeTool() {
    const pathInput = document.getElementById('vscode-path');
    const lineInput = document.getElementById('vscode-line');
    const columnInput = document.getElementById('vscode-column');
    
    if (pathInput) {
        // 监听输入变化，更新链接
        pathInput.addEventListener('input', updateVSCodeLink);
        if (lineInput) lineInput.addEventListener('input', updateVSCodeLink);
        if (columnInput) columnInput.addEventListener('input', updateVSCodeLink);
        
        // 初始化链接状态
        updateVSCodeLink();
    }
}

// 当DOM加载完成时初始化所有工具
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initVSCodeTool();
        initPasswordTool();
        initJWT();
        initAESTool();
        initBcryptTool();
        initSM4Tool();
        initHexTool();
    });
} else {
    // DOM已经加载完成，直接初始化
    initVSCodeTool();
    initPasswordTool();
    initJWT();
    initAESTool();
    initBcryptTool();
    initSM4Tool();
    initHexTool();
}

// 随机密码生成工具函数
function generatePassword() {
    // 获取用户设置
    const length = parseInt(document.getElementById('password-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSpecial = document.getElementById('include-special').checked;
    
    // 验证至少选择了一种字符类型
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecial) {
        alert('请至少选择一种字符类型！');
        return;
    }
    
    // 定义字符集
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecial) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // 生成密码
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    
    // 确保密码包含至少一个所选类型的字符
    password = ensurePasswordMeetsRequirements(password, includeUppercase, includeLowercase, includeNumbers, includeSpecial, charset);
    
    // 显示密码
    document.getElementById('password-output').value = password;
}

function ensurePasswordMeetsRequirements(password, includeUppercase, includeLowercase, includeNumbers, includeSpecial, charset) {
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumbers = false;
    let hasSpecial = false;
    
    // 检查现有密码是否满足要求
    for (let i = 0; i < password.length; i++) {
        const char = password.charAt(i);
        if (/[A-Z]/.test(char)) hasUppercase = true;
        if (/[a-z]/.test(char)) hasLowercase = true;
        if (/\d/.test(char)) hasNumbers = true;
        if (/[^A-Za-z0-9]/.test(char)) hasSpecial = true;
    }
    
    // 转换为数组以便修改
    const passwordArray = password.split('');
    
    // 确保包含大写字母
    if (includeUppercase && !hasUppercase) {
        const randomIndex = Math.floor(Math.random() * passwordArray.length);
        passwordArray[randomIndex] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
    }
    
    // 确保包含小写字母
    if (includeLowercase && !hasLowercase) {
        const randomIndex = Math.floor(Math.random() * passwordArray.length);
        passwordArray[randomIndex] = 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
    }
    
    // 确保包含数字
    if (includeNumbers && !hasNumbers) {
        const randomIndex = Math.floor(Math.random() * passwordArray.length);
        passwordArray[randomIndex] = '0123456789'.charAt(Math.floor(Math.random() * 10));
    }
    
    // 确保包含特殊字符
    if (includeSpecial && !hasSpecial) {
        const randomIndex = Math.floor(Math.random() * passwordArray.length);
        passwordArray[randomIndex] = '!@#$%^&*()_+-=[]{}|;:,.<>?'.charAt(Math.floor(Math.random() * 32));
    }
    
    return passwordArray.join('');
}

function resetPasswordOptions() {
    document.getElementById('password-length').value = 12;
    document.getElementById('include-uppercase').checked = true;
    document.getElementById('include-lowercase').checked = true;
    document.getElementById('include-numbers').checked = true;
    document.getElementById('include-special').checked = true;
    document.getElementById('password-output').value = '';
}

// 复制内容到剪贴板的函数
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    
    // 显示复制成功提示
    const originalText = element.nextElementSibling.querySelector('button').textContent;
    element.nextElementSibling.querySelector('button').textContent = '已复制!';
    setTimeout(() => {
        element.nextElementSibling.querySelector('button').textContent = originalText;
    }, 2000);
}

// 初始化密码工具
function initPasswordTool() {
    // 页面加载时自动生成一个密码
    generatePassword();
}

// JWT解析工具函数
function parseJWT() {
    // 隐藏之前的错误信息
    document.getElementById('jwt-error').style.display = 'none';
    
    // 获取JWT输入
    const jwtInput = document.getElementById('jwt-input').value.trim();
    
    if (!jwtInput) {
        showJWTError('请输入JWT Token');
        return;
    }
    
    // 分割JWT的三部分：Header.Payload.Signature
    const parts = jwtInput.split('.');
    
    if (parts.length !== 3) {
        showJWTError('无效的JWT格式，JWT应由三部分组成：Header.Payload.Signature');
        return;
    }
    
    try {
        // 解析Header
        const header = JSON.parse(atobUrlSafe(parts[0]));
        document.getElementById('jwt-header').textContent = JSON.stringify(header, null, 2);
        
        // 解析Payload
        const payload = JSON.parse(atobUrlSafe(parts[1]));
        document.getElementById('jwt-payload').textContent = JSON.stringify(payload, null, 2);
        
        // 显示Signature（不解析，仅显示）
        document.getElementById('jwt-signature').textContent = parts[2];
        
        // 检查token是否过期
        if (payload.exp) {
            checkTokenExpiry(payload.exp);
        }
    } catch (error) {
        showJWTError('解析JWT时出错: ' + error.message);
    }
}

// URL安全的base64解码函数
function atobUrlSafe(str) {
    // 确保字符串长度是4的倍数
    while (str.length % 4) {
        str += '=';
    }
    
    // 替换URL安全字符
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    
    // 解码
    return decodeURIComponent(encodeURIComponent(atob(str)));
}

// 显示JWT错误信息
function showJWTError(message) {
    const errorElement = document.getElementById('jwt-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// 清空JWT输入和输出
function clearJWT() {
    document.getElementById('jwt-input').value = '';
    document.getElementById('jwt-header').textContent = '{}';
    document.getElementById('jwt-payload').textContent = '{}';
    document.getElementById('jwt-signature').textContent = '无';
    document.getElementById('jwt-error').style.display = 'none';
}

// 生成示例JWT
function generateSampleJWT() {
    // 创建一个简单的示例JWT
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    };
    
    const payload = {
        "sub": "1234567890",
        "name": "示例用户",
        "iat": Math.floor(Date.now() / 1000),
        "exp": Math.floor(Date.now() / 1000) + 3600, // 1小时后过期
        "admin": true,
        "roles": ["user", "admin"]
    };
    
    // 模拟签名（实际中应该使用密钥签名）
    const encodedHeader = btoaUrlSafe(JSON.stringify(header));
    const encodedPayload = btoaUrlSafe(JSON.stringify(payload));
    const signature = '示例签名（实际应用中应使用密钥生成）';
    
    const sampleJWT = `${encodedHeader}.${encodedPayload}.${signature}`;
    
    // 填充到输入框并解析
    document.getElementById('jwt-input').value = sampleJWT;
    parseJWT();
}

// URL安全的base64编码函数
function btoaUrlSafe(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
    })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// 检查令牌是否过期
function checkTokenExpiry(expiryTime) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDiff = expiryTime - currentTime;
    
    if (timeDiff < 0) {
        // 令牌已过期
        const errorElement = document.getElementById('jwt-error');
        errorElement.className = 'mt-2 alert alert-warning';
        errorElement.textContent = '注意：此令牌已过期！';
        errorElement.style.display = 'block';
    } else if (timeDiff < 3600) {
        // 令牌将在1小时内过期
        const warningElement = document.getElementById('jwt-error');
        warningElement.className = 'mt-2 alert alert-info';
        warningElement.textContent = `注意：此令牌将在${Math.floor(timeDiff / 60)}分钟后过期！`;
        warningElement.style.display = 'block';
    }
}

// 初始化JWT工具
function initJWT() {
    // 页面加载时可以生成一个示例JWT
    // generateSampleJWT();
}

// AES加密解密工具函数

// 初始化AES工具
function initAESTool() {
    // 设置默认密钥
    document.getElementById('aes-key').value = 'XX#@Portal&*...1';
}

// 生成随机16位AES密钥
function generateRandomAESKey() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let key = '';
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        key += charset.charAt(randomIndex);
    }
    document.getElementById('aes-key').value = key;
}

// 显示AES错误信息
function showAESMessage(message, isError = true) {
    const errorElement = document.getElementById('aes-error');
    errorElement.textContent = message;
    errorElement.className = isError ? 'mt-2 alert alert-danger' : 'mt-2 alert alert-success';
    errorElement.style.display = 'block';
    
    // 3秒后自动隐藏成功信息
    if (!isError) {
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    }
}

// 清空AES输入和输出
function clearAES() {
    document.getElementById('aes-input').value = '';
    document.getElementById('aes-output').value = '';
    document.getElementById('aes-error').style.display = 'none';
}

// 加密AES
async function encryptAES() {
    // 隐藏之前的错误信息
    document.getElementById('aes-error').style.display = 'none';
    
    // 获取输入
    const key = document.getElementById('aes-key').value.trim();
    const content = document.getElementById('aes-input').value.trim();
    
    // 验证输入
    if (!key || key.length !== 16) {
        showAESMessage('请输入16位密钥！');
        return;
    }
    
    if (!content) {
        showAESMessage('请输入要加密的内容！');
        return;
    }
    
    try {
        // 使用Web Crypto API进行AES-CBC加密
        const encrypted = await aesEncrypt(content, key);
        
        // 显示加密结果
        document.getElementById('aes-output').value = encrypted;
        showAESMessage('加密成功！', false);
    } catch (error) {
        showAESMessage('加密失败: ' + error.message);
        console.error('AES加密错误:', error);
    }
}

// 解密AES
async function decryptAES() {
    // 隐藏之前的错误信息
    document.getElementById('aes-error').style.display = 'none';
    
    // 获取输入
    const key = document.getElementById('aes-key').value.trim();
    const encryptedContent = document.getElementById('aes-input').value.trim();
    
    // 验证输入
    if (!key || key.length !== 16) {
        showAESMessage('请输入16位密钥！');
        return;
    }
    
    if (!encryptedContent) {
        showAESMessage('请输入要解密的内容！');
        return;
    }
    
    try {
        // 使用Web Crypto API进行AES-CBC解密
        const decrypted = await aesDecrypt(encryptedContent, key);
        
        // 显示解密结果
        document.getElementById('aes-output').value = decrypted;
        showAESMessage('解密成功！', false);
    } catch (error) {
        showAESMessage('解密失败: ' + error.message);
        console.error('AES解密错误:', error);
    }
}

// AES-CBC加密核心函数
async function aesEncrypt(content, key) {
    // 使用固定的IV（与Java代码保持一致）
    const iv = new TextEncoder().encode('B-16-Byte-Rtring');
    
    // 将字符串密钥转换为CryptoKey
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        { name: 'AES-CBC' },
        false,
        ['encrypt']
    );
    
    // 加密内容
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: 'AES-CBC',
            iv: iv
        },
        cryptoKey,
        new TextEncoder().encode(content)
    );
    
    // 将加密结果转换为Base64字符串
    return arrayBufferToBase64(encrypted);
}

// AES-CBC解密核心函数
async function aesDecrypt(encryptedContent, key) {
    // 使用固定的IV（与Java代码保持一致）
    const iv = new TextEncoder().encode('B-16-Byte-Rtring');
    
    // 将Base64字符串转换为ArrayBuffer
    const encryptedData = base64ToArrayBuffer(encryptedContent);
    
    // 将字符串密钥转换为CryptoKey
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(key),
        { name: 'AES-CBC' },
        false,
        ['decrypt']
    );
    
    // 解密内容
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: 'AES-CBC',
            iv: iv
        },
        cryptoKey,
        encryptedData
    );
    
    // 将解密结果转换为字符串
    return new TextDecoder().decode(decrypted);
}

// ArrayBuffer转换为Base64字符串
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Base64字符串转换为ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Hex编码转换工具函数

// 初始化Hex工具
function initHexTool() {
    // 工具初始化代码，如果需要的话
}

// 显示Hex错误信息
function showHexMessage(message, isError = true) {
    const errorElement = document.getElementById('hex-error');
    errorElement.textContent = message;
    errorElement.className = isError ? 'mt-2 alert alert-danger' : 'mt-2 alert alert-success';
    errorElement.style.display = 'block';
    
    // 3秒后自动隐藏成功信息
    if (!isError) {
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    }
}

// 清空Hex输入和输出
function clearHex() {
    document.getElementById('hex-input').value = '';
    document.getElementById('hex-output').value = '';
    document.getElementById('hex-error').style.display = 'none';
}

// 字符串转Hex
function stringToHex() {
    // 隐藏之前的错误信息
    document.getElementById('hex-error').style.display = 'none';
    
    // 获取输入
    const content = document.getElementById('hex-input').value.trim();
    
    // 验证输入
    if (!content) {
        showHexMessage('请输入要转换的内容！');
        return;
    }
    
    try {
        let hexString = '';
        for (let i = 0; i < content.length; i++) {
            const hex = content.charCodeAt(i).toString(16);
            hexString += ('00' + hex).slice(-2);
        }
        
        // 显示转换结果
        document.getElementById('hex-output').value = hexString.toUpperCase();
        showHexMessage('字符串转Hex成功！', false);
    } catch (error) {
        showHexMessage('字符串转Hex失败: ' + error.message);
        console.error('字符串转Hex错误:', error);
    }
}

// Hex转字符串
function hexToString() {
    // 隐藏之前的错误信息
    document.getElementById('hex-error').style.display = 'none';
    
    // 获取输入
    let content = document.getElementById('hex-input').value.trim();
    
    // 验证输入
    if (!content) {
        showHexMessage('请输入要转换的Hex内容！');
        return;
    }
    
    // 移除空格和换行
    content = content.replace(/\s+/g, '');
    
    // 验证Hex格式
    if (!/^[0-9A-Fa-f]+$/.test(content)) {
        showHexMessage('无效的Hex格式！只允许0-9和A-F/a-f字符。');
        return;
    }
    
    // 验证Hex长度是否为偶数
    if (content.length % 2 !== 0) {
        showHexMessage('无效的Hex格式！长度必须为偶数。');
        return;
    }
    
    try {
        let result = '';
        for (let i = 0; i < content.length; i += 2) {
            const hex = content.substr(i, 2);
            result += String.fromCharCode(parseInt(hex, 16));
        }
        
        // 显示转换结果
        document.getElementById('hex-output').value = result;
        showHexMessage('Hex转字符串成功！', false);
    } catch (error) {
        showHexMessage('Hex转字符串失败: ' + error.message);
        console.error('Hex转字符串错误:', error);
    }
}

// 国密4(SM4)加密解密工具函数

// 初始化SM4工具
function initSM4Tool() {
    // 设置默认密钥
    document.getElementById('sm4-key').value = 'SM4-Key-16Bytes!';
}

// 生成随机16位SM4密钥
function generateRandomSM4Key() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let key = '';
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        key += charset.charAt(randomIndex);
    }
    document.getElementById('sm4-key').value = key;
}

// 显示SM4错误信息
function showSM4Message(message, isError = true) {
    const errorElement = document.getElementById('sm4-error');
    errorElement.textContent = message;
    errorElement.className = isError ? 'mt-2 alert alert-danger' : 'mt-2 alert alert-success';
    errorElement.style.display = 'block';
    
    // 3秒后自动隐藏成功信息
    if (!isError) {
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    }
}

// 清空SM4输入和输出
function clearSM4() {
    document.getElementById('sm4-input').value = '';
    document.getElementById('sm4-output').value = '';
    document.getElementById('sm4-error').style.display = 'none';
}

// 加密SM4
async function encryptSM4() {
    // 隐藏之前的错误信息
    document.getElementById('sm4-error').style.display = 'none';
    
    // 获取输入
    const key = document.getElementById('sm4-key').value.trim();
    const content = document.getElementById('sm4-input').value.trim();
    
    // 验证输入
    if (!key || key.length !== 16) {
        showSM4Message('请输入16位密钥！');
        return;
    }
    
    if (!content) {
        showSM4Message('请输入要加密的内容！');
        return;
    }
    
    try {
        // 使用SM4算法加密
        const encrypted = sm4Encrypt(content, key);
        
        // 显示加密结果
        document.getElementById('sm4-output').value = encrypted;
        showSM4Message('加密成功！', false);
    } catch (error) {
        showSM4Message('加密失败: ' + error.message);
        console.error('SM4加密错误:', error);
    }
}

// 解密SM4
async function decryptSM4() {
    // 隐藏之前的错误信息
    document.getElementById('sm4-error').style.display = 'none';
    
    // 获取输入
    const key = document.getElementById('sm4-key').value.trim();
    const encryptedContent = document.getElementById('sm4-input').value.trim();
    
    // 验证输入
    if (!key || key.length !== 16) {
        showSM4Message('请输入16位密钥！');
        return;
    }
    
    if (!encryptedContent) {
        showSM4Message('请输入要解密的内容！');
        return;
    }
    
    try {
        // 使用SM4算法解密
        const decrypted = sm4Decrypt(encryptedContent, key);
        
        // 显示解密结果
        document.getElementById('sm4-output').value = decrypted;
        showSM4Message('解密成功！', false);
    } catch (error) {
        showSM4Message('解密失败: ' + error.message);
        console.error('SM4解密错误:', error);
    }
}

// SM4算法实现
class SM4 {
    constructor() {
        this.SBOX = [
            0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05,
            0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99,
            0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62,
            0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6,
            0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8,
            0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35,
            0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87,
            0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e,
            0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1,
            0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3,
            0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f,
            0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51,
            0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8,
            0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0,
            0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84,
            0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48
        ];
        
        this.FK = [0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc];
        this.CK = [
            0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269,
            0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9,
            0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249,
            0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9,
            0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229,
            0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
            0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209,
            0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279
        ];
    }
    
    // 密钥扩展
    expandKey(key) {
        const MK = new Array(4);
        for (let i = 0; i < 4; i++) {
            MK[i] = ((key[i * 4] & 0xff) << 24) |
                   ((key[i * 4 + 1] & 0xff) << 16) |
                   ((key[i * 4 + 2] & 0xff) << 8) |
                   (key[i * 4 + 3] & 0xff);
        }
        
        const rk = new Array(32);
        let K = new Array(4);
        
        for (let i = 0; i < 4; i++) {
            K[i] = MK[i] ^ this.FK[i];
        }
        
        for (let i = 0; i < 32; i++) {
            let tmp = K[1] ^ this.T1(K[2] ^ K[3] ^ this.CK[i]);
            rk[i] = K[0] ^ tmp;
            
            K[0] = K[1];
            K[1] = K[2];
            K[2] = K[3];
            K[3] = rk[i];
        }
        
        return rk;
    }
    
    // T函数
    T1(X) {
        let x = this.L(this.S(X));
        return x;
    }
    
    T2(X) {
        let x = this.L1(this.S(X));
        return x;
    }
    
    // 非线性变换S
    S(X) {
        let x = 0;
        x |= (this.SBOX[(X >> 24) & 0xff]) << 24;
        x |= (this.SBOX[(X >> 16) & 0xff]) << 16;
        x |= (this.SBOX[(X >> 8) & 0xff]) << 8;
        x |= (this.SBOX[X & 0xff]);
        return x;
    }
    
    // 线性变换L
    L(X) {
        return X ^ this.rotl(X, 2) ^ this.rotl(X, 10) ^ this.rotl(X, 18) ^ this.rotl(X, 24);
    }
    
    // 线性变换L1
    L1(X) {
        return X ^ this.rotl(X, 13) ^ this.rotl(X, 23);
    }
    
    // 循环左移
    rotl(X, n) {
        return ((X << n) & 0xffffffff) | (X >>> (32 - n));
    }
    
    // 加密
    encrypt(data, key) {
        const rk = this.expandKey(key);
        
        const X = new Array(4);
        for (let i = 0; i < 4; i++) {
            X[i] = ((data[i * 4] & 0xff) << 24) |
                   ((data[i * 4 + 1] & 0xff) << 16) |
                   ((data[i * 4 + 2] & 0xff) << 8) |
                   (data[i * 4 + 3] & 0xff);
        }
        
        let tmp;
        for (let i = 0; i < 32; i++) {
            tmp = X[1] ^ X[2] ^ X[3] ^ rk[i];
            tmp = this.T1(tmp);
            tmp = X[0] ^ tmp;
            
            X[0] = X[1];
            X[1] = X[2];
            X[2] = X[3];
            X[3] = tmp;
        }
        
        // 逆序
        const result = new Array(16);
        for (let i = 0; i < 4; i++) {
            result[i * 4] = (X[3 - i] >> 24) & 0xff;
            result[i * 4 + 1] = (X[3 - i] >> 16) & 0xff;
            result[i * 4 + 2] = (X[3 - i] >> 8) & 0xff;
            result[i * 4 + 3] = X[3 - i] & 0xff;
        }
        
        return result;
    }
    
    // 解密
    decrypt(data, key) {
        const rk = this.expandKey(key);
        
        const X = new Array(4);
        for (let i = 0; i < 4; i++) {
            X[i] = ((data[i * 4] & 0xff) << 24) |
                   ((data[i * 4 + 1] & 0xff) << 16) |
                   ((data[i * 4 + 2] & 0xff) << 8) |
                   (data[i * 4 + 3] & 0xff);
        }
        
        let tmp;
        for (let i = 31; i >= 0; i--) {
            tmp = X[1] ^ X[2] ^ X[3] ^ rk[i];
            tmp = this.T1(tmp);
            tmp = X[0] ^ tmp;
            
            X[0] = X[1];
            X[1] = X[2];
            X[2] = X[3];
            X[3] = tmp;
        }
        
        // 逆序
        const result = new Array(16);
        for (let i = 0; i < 4; i++) {
            result[i * 4] = (X[3 - i] >> 24) & 0xff;
            result[i * 4 + 1] = (X[3 - i] >> 16) & 0xff;
            result[i * 4 + 2] = (X[3 - i] >> 8) & 0xff;
            result[i * 4 + 3] = X[3 - i] & 0xff;
        }
        
        return result;
    }
}

// SM4加密核心函数
function sm4Encrypt(content, key) {
    // 创建SM4实例
    const sm4 = new SM4();
    
    // 将密钥转换为字节数组
    const keyBytes = new TextEncoder().encode(key);
    
    // 对内容进行填充，使其长度为16的倍数
    const contentBytes = new TextEncoder().encode(content);
    const paddingLength = 16 - (contentBytes.length % 16);
    const paddedBytes = new Uint8Array(contentBytes.length + paddingLength);
    paddedBytes.set(contentBytes);
    
    // 添加PKCS#7填充
    for (let i = contentBytes.length; i < paddedBytes.length; i++) {
        paddedBytes[i] = paddingLength;
    }
    
    // 分块加密
    const encryptedBytes = new Uint8Array(paddedBytes.length);
    for (let i = 0; i < paddedBytes.length; i += 16) {
        const block = paddedBytes.slice(i, i + 16);
        const encryptedBlock = sm4.encrypt(block, keyBytes);
        encryptedBytes.set(encryptedBlock, i);
    }
    
    // 将加密结果转换为Base64字符串
    return arrayBufferToBase64(encryptedBytes.buffer);
}

// SM4解密核心函数
function sm4Decrypt(encryptedContent, key) {
    // 创建SM4实例
    const sm4 = new SM4();
    
    // 将密钥转换为字节数组
    const keyBytes = new TextEncoder().encode(key);
    
    // 将Base64字符串转换为字节数组
    const encryptedBytes = new Uint8Array(base64ToArrayBuffer(encryptedContent));
    
    // 分块解密
    const decryptedBytes = new Uint8Array(encryptedBytes.length);
    for (let i = 0; i < encryptedBytes.length; i += 16) {
        const block = encryptedBytes.slice(i, i + 16);
        const decryptedBlock = sm4.decrypt(block, keyBytes);
        decryptedBytes.set(decryptedBlock, i);
    }
    
    // 去除PKCS#7填充
    const paddingLength = decryptedBytes[decryptedBytes.length - 1];
    const actualBytes = decryptedBytes.slice(0, decryptedBytes.length - paddingLength);
    
    // 将解密结果转换为字符串
    return new TextDecoder().decode(actualBytes);
}

// BCrypt加密工具函数

// 计算器工具函数
// 变量用于存储计算器状态
let calculatorExpression = '';
let calculatorResult = '';
let calculatorNewOperation = true;

// 清空计算器
function calculatorClear() {
    calculatorExpression = '';
    calculatorResult = '';
    calculatorNewOperation = true;
    document.getElementById('calculator-display').value = '0';
}

// 输入数字
function calculatorNumber(num) {
    if (calculatorNewOperation) {
        // 如果是新的操作，清空当前显示
        calculatorExpression = '';
        calculatorNewOperation = false;
        document.getElementById('calculator-display').value = num.toString();
    } else {
        // 否则追加到当前显示
        const currentDisplay = document.getElementById('calculator-display').value;
        if (currentDisplay === '0') {
            // 如果当前显示是0，直接替换
            document.getElementById('calculator-display').value = num.toString();
        } else {
            // 否则追加
            document.getElementById('calculator-display').value += num.toString();
        }
    }
    calculatorExpression = document.getElementById('calculator-display').value;
}

// 输入小数点
function calculatorDecimal() {
    if (calculatorNewOperation) {
        // 如果是新的操作，开始一个新的小数
        calculatorExpression = '0.';
        calculatorNewOperation = false;
        document.getElementById('calculator-display').value = '0.';
    } else {
        const currentDisplay = document.getElementById('calculator-display').value;
        // 检查当前显示是否已经包含小数点
        if (!currentDisplay.includes('.')) {
            document.getElementById('calculator-display').value += '.';
            calculatorExpression = document.getElementById('calculator-display').value;
        }
    }
}

// 输入运算符
function calculatorOperator(op) {
    const currentDisplay = document.getElementById('calculator-display').value;
    
    // 处理平方运算符特殊情况
    if (op === '^') {
        try {
            const num = parseFloat(currentDisplay);
            const result = num * num;
            document.getElementById('calculator-display').value = result;
            calculatorExpression = result.toString();
            calculatorNewOperation = true;
        } catch (error) {
            document.getElementById('calculator-display').value = '错误';
        }
        return;
    }
    
    if (calculatorNewOperation && calculatorResult !== '') {
        // 如果是新的操作且有之前的结果，使用之前的结果作为新操作的第一个数
        calculatorExpression = calculatorResult + op;
        document.getElementById('calculator-display').value = calculatorResult + op;
        calculatorNewOperation = false;
    } else {
        // 否则追加运算符到表达式
        calculatorExpression = currentDisplay + op;
        document.getElementById('calculator-display').value = calculatorExpression;
        calculatorNewOperation = false;
    }
}

// 输入函数
function calculatorFunction(func) {
    const currentDisplay = document.getElementById('calculator-display').value;
    let result = '';
    
    try {
        switch (func) {
            case 'sin':
                result = Math.sin(parseFloat(currentDisplay) * Math.PI / 180); // 假设输入的是角度
                break;
            case 'cos':
                result = Math.cos(parseFloat(currentDisplay) * Math.PI / 180); // 假设输入的是角度
                break;
            case 'tan':
                result = Math.tan(parseFloat(currentDisplay) * Math.PI / 180); // 假设输入的是角度
                break;
            case 'sqrt':
                result = Math.sqrt(parseFloat(currentDisplay));
                break;
            case 'log10':
                result = Math.log10(parseFloat(currentDisplay));
                break;
            case 'ln':
                result = Math.log(parseFloat(currentDisplay));
                break;
            case 'π':
                result = Math.PI;
                break;
        }
        
        // 处理精度问题，保留10位小数
        result = parseFloat(result.toFixed(10));
        
        document.getElementById('calculator-display').value = result;
        calculatorExpression = result.toString();
        calculatorResult = result.toString();
        calculatorNewOperation = true;
    } catch (error) {
        document.getElementById('calculator-display').value = '错误';
    }
}

// 计算结果
function calculatorEquals() {
    const expression = document.getElementById('calculator-display').value;
    
    try {
        // 使用Function构造函数安全地计算表达式（注意：这不是最安全的方式，但对于简单计算器来说足够了）
        // 替换显示的运算符为JavaScript运算符
        const jsExpression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        // 创建一个函数来计算表达式，这样可以避免eval的一些安全问题
        const calculate = new Function('return ' + jsExpression);
        const result = calculate();
        
        // 处理精度问题，保留10位小数
        const formattedResult = parseFloat(result.toFixed(10));
        
        document.getElementById('calculator-display').value = formattedResult;
        calculatorResult = formattedResult.toString();
        calculatorNewOperation = true;
    } catch (error) {
        document.getElementById('calculator-display').value = '错误';
    }
}

// 复制结果到剪贴板
function calculatorCopyResult() {
    const display = document.getElementById('calculator-display');
    
    // 创建一个临时输入元素
    const tempInput = document.createElement('input');
    tempInput.value = display.value;
    document.body.appendChild(tempInput);
    
    // 选择并复制
    tempInput.select();
    document.execCommand('copy');
    
    // 移除临时元素
    document.body.removeChild(tempInput);
    
    // 显示复制成功提示
    const originalText = document.querySelector('button[onclick="calculatorCopyResult()"]').textContent;
    document.querySelector('button[onclick="calculatorCopyResult()"]').textContent = '已复制!';
    setTimeout(() => {
        document.querySelector('button[onclick="calculatorCopyResult()"]').textContent = originalText;
    }, 2000);
}

// 切换高级模式显示
function calculatorToggleScientific() {
    const scientificFunctions = document.getElementById('scientific-functions');
    const toggleButton = document.querySelector('button[onclick="calculatorToggleScientific()"]');
    
    if (scientificFunctions.style.display === 'none') {
        scientificFunctions.style.display = 'block';
        toggleButton.textContent = '基本模式';
    } else {
        scientificFunctions.style.display = 'none';
        toggleButton.textContent = '高级模式';
    }
}

// 初始化计算器
function initCalculator() {
    calculatorClear();
}

// 当DOM加载完成时初始化计算器
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    // DOM已经加载完成，直接初始化
    initCalculator();
}

// 初始化BCrypt工具
function initBcryptTool() {
    // 可以在这里设置默认值或进行其他初始化操作
}

// 生成BCrypt盐值 - 使用bcryptjs库的标准方法
function generateBCryptSalt() {
    // 使用bcryptjs库生成标准盐值，工作因子为10
    const salt = dcodeIO.bcrypt.genSaltSync(10);
    document.getElementById('bcrypt-salt').value = salt;
}

// 显示BCrypt错误信息
function showBCryptMessage(message, isError = true) {
    const errorElement = document.getElementById('bcrypt-error');
    errorElement.textContent = message;
    errorElement.className = isError ? 'mt-2 alert alert-danger' : 'mt-2 alert alert-success';
    errorElement.style.display = 'block';
    
    // 3秒后自动隐藏成功信息
    if (!isError) {
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    }
}

// 清空BCrypt输入和输出
function clearBCrypt() {
    document.getElementById('bcrypt-password').value = '';
    document.getElementById('bcrypt-salt').value = '';
    document.getElementById('bcrypt-output').value = '';
    document.getElementById('bcrypt-error').style.display = 'none';
}

// BCrypt加密函数
async function encryptBCrypt() {
    // 隐藏之前的错误信息
    document.getElementById('bcrypt-error').style.display = 'none';
    
    // 获取输入
    const password = document.getElementById('bcrypt-password').value.trim();
    let salt = document.getElementById('bcrypt-salt').value.trim();
    
    // 验证输入
    if (!password) {
        showBCryptMessage('请输入要加密的密码！');
        return;
    }
    
    // 如果没有提供盐值，生成一个
    if (!salt) {
        generateBCryptSalt();
        salt = document.getElementById('bcrypt-salt').value;
    }
    
    try {
        // 使用bcrypt算法加密密码
        const hashedPassword = await dcodeIO.bcrypt.hash(password, salt);
        
        // 显示加密结果
        document.getElementById('bcrypt-output').value = hashedPassword;
        showBCryptMessage('加密成功！', false);
    } catch (error) {
        showBCryptMessage('加密失败: ' + error.message);
        console.error('BCrypt加密错误:', error);
    }
}

// BCrypt密码校验函数
async function checkBCrypt() {
    // 隐藏之前的错误信息
    document.getElementById('bcrypt-error').style.display = 'none';
    
    // 获取输入
    const password = document.getElementById('bcrypt-password').value.trim();
    const hashedPassword = document.getElementById('bcrypt-output').value.trim();
    
    // 验证输入
    if (!password) {
        showBCryptMessage('请输入要校验的密码！');
        return;
    }
    
    if (!hashedPassword) {
        showBCryptMessage('请确保已经生成了BCrypt哈希值！');
        return;
    }
    
    try {
        // 校验密码
        const matches = await dcodeIO.bcrypt.compare(password, hashedPassword);
        
        // 显示校验结果
        if (matches) {
            document.getElementById('bcrypt-output').value = '密码匹配成功！';
            showBCryptMessage('密码校验成功！', false);
        } else {
            document.getElementById('bcrypt-output').value = '密码不匹配！';
            showBCryptMessage('密码校验失败！');
        }
    } catch (error) {
        showBCryptMessage('校验失败: ' + error.message);
        console.error('BCrypt校验错误:', error);
    }
}

// 使用标准的bcryptjs库实现
// 注意：需要先引入vendor/bcryptjs.min.js

// 旧的bcrypt函数已被直接使用dcodeIO.bcrypt.hash替代
// 旧的bcryptCompare函数已被直接使用dcodeIO.bcrypt.compare替代
// 命名转换工具函数

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

// 正则表达式测试工具

// 测试正则表达式匹配
function testRegex() {
    const patternStr = document.getElementById('regex-pattern').value;
    const flags = document.getElementById('regex-flags').value;
    const testText = document.getElementById('regex-text').value;
    
    // 隐藏之前的错误信息
    document.getElementById('regex-error').style.display = 'none';
    
    try {
        // 创建正则表达式对象
        const regex = new RegExp(patternStr, flags);
        
        // 测试匹配
        const matches = [];
        let match;
        
        if (flags.includes('g')) {
            // 全局匹配
            while ((match = regex.exec(testText)) !== null) {
                matches.push({
                    match: match[0],
                    index: match.index,
                    groups: match.groups || {}
                });
                
                // 防止零宽度匹配导致的无限循环
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
            }
        } else {
            // 单次匹配
            match = regex.exec(testText);
            if (match) {
                matches.push({
                    match: match[0],
                    index: match.index,
                    groups: match.groups || {}
                });
            }
        }
        
        // 显示匹配结果
        displayRegexResults(matches, testText);
        
        // 高亮显示匹配
        highlightRegexMatches(testText, matches);
        
    } catch (error) {
        // 显示错误信息
        const errorElement = document.getElementById('regex-error');
        errorElement.textContent = '正则表达式错误: ' + error.message;
        errorElement.style.display = 'block';
        
        // 清空结果区域
        document.getElementById('regex-results').value = '';
        document.getElementById('regex-highlight').innerHTML = '';
    }
}

// 显示正则表达式匹配结果
function displayRegexResults(matches, testText) {
    const resultsElement = document.getElementById('regex-results');
    
    if (matches.length === 0) {
        resultsElement.value = '未找到匹配项';
        return;
    }
    
    let results = `找到 ${matches.length} 个匹配项\n\n`;
    
    matches.forEach((match, index) => {
        results += `匹配项 ${index + 1}: "${match.match}"\n`;
        results += `  位置: ${match.index}\n`;
        results += `  长度: ${match.match.length}\n`;
        
        // 如果有捕获组
        if (Object.keys(match.groups).length > 0) {
            results += `  捕获组:\n`;
            Object.entries(match.groups).forEach(([key, value]) => {
                results += `    ${key}: "${value || ''}"\n`;
            });
        }
        
        results += '\n';
    });
    
    // 添加总体信息
    results += `测试文本长度: ${testText.length} 字符\n`;
    
    resultsElement.value = results;
}

// 高亮显示正则表达式匹配
function highlightRegexMatches(text, matches) {
    const highlightElement = document.getElementById('regex-highlight');
    
    if (matches.length === 0) {
        // 没有匹配项，显示原始文本
        highlightElement.textContent = text;
        return;
    }
    
    // 按索引排序匹配项
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);
    
    let highlightedHTML = '';
    let lastIndex = 0;
    
    // 遍历匹配项并构建高亮HTML
    sortedMatches.forEach((match, index) => {
        // 添加匹配项前的文本
        if (match.index > lastIndex) {
            highlightedHTML += escapeHTML(text.substring(lastIndex, match.index));
        }
        
        // 添加高亮的匹配项
        highlightedHTML += `<span class="bg-yellow-200 px-1 rounded font-semibold" title="匹配项 ${index + 1}: 位置 ${match.index}">`;
        highlightedHTML += escapeHTML(match.match);
        highlightedHTML += '</span>';
        
        lastIndex = match.index + match.match.length;
    });
    
    // 添加最后一个匹配项后的文本
    if (lastIndex < text.length) {
        highlightedHTML += escapeHTML(text.substring(lastIndex));
    }
    
    highlightElement.innerHTML = highlightedHTML;
}

// HTML转义函数
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 清空正则表达式工具
function clearRegex() {
    document.getElementById('regex-pattern').value = '';
    document.getElementById('regex-flags').value = 'g';
    document.getElementById('regex-text').value = '';
    document.getElementById('regex-results').value = '';
    document.getElementById('regex-highlight').innerHTML = '';
    document.getElementById('regex-error').style.display = 'none';
}

// 显示正则表达式帮助
function showRegexHelp() {
    const helpContent = `
正则表达式语法帮助：

字符类：
. - 匹配任意字符（除换行符）
\w - 匹配字母、数字或下划线
\d - 匹配数字
\s - 匹配空白字符
\b - 匹配单词边界
[^...] - 匹配不在括号内的任意字符

量词：
* - 匹配前面的元素零次或多次
+ - 匹配前面的元素一次或多次
? - 匹配前面的元素零次或一次
{n} - 匹配前面的元素恰好n次
{n,} - 匹配前面的元素至少n次
{n,m} - 匹配前面的元素n到m次

分组：
() - 捕获组
(?:) - 非捕获组
(?<name>) - 命名捕获组

锚点：
^ - 匹配字符串开头
$ - 匹配字符串结尾

特殊字符需要转义：\ ^ $ . | ? * + ( ) [ ] { }

标志说明：
g - 全局匹配
  - 查找所有匹配项而不是在找到第一个匹配后停止
i - 忽略大小写
  - 匹配时不区分大小写
m - 多行模式
  - ^ 和 $ 匹配每行的开头和结尾
s - 单行模式
  - . 可以匹配换行符
u - Unicode模式
  - 正确处理Unicode字符
`;
    
    alert(helpContent);
}
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
    });
} else {
    // DOM已经加载完成，直接初始化
    initVSCodeTool();
    initPasswordTool();
    initJWT();
    initAESTool();
    initBcryptTool();
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

// BCrypt加密工具函数

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
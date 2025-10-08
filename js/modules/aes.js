// AES加密解密工具模块
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

// 导出函数
window.aesModule = {
    initAESTool,
    generateRandomAESKey,
    showAESMessage,
    clearAES,
    encryptAES,
    decryptAES,
    aesEncrypt,
    aesDecrypt,
    arrayBufferToBase64,
    base64ToArrayBuffer
};
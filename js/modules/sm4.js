// SM4加密解密工具模块
function initSM4Tool() {
    // 设置默认密钥
    document.getElementById('sm4-key').value = 'XX#@Portal&*...1';
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
        // 使用Web Crypto API进行SM4加密（假设已加载相关库）
        const encrypted = await sm4Encrypt(content, key);
        
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
        // 使用Web Crypto API进行SM4解密（假设已加载相关库）
        const decrypted = await sm4Decrypt(encryptedContent, key);
        
        // 显示解密结果
        document.getElementById('sm4-output').value = decrypted;
        showSM4Message('解密成功！', false);
    } catch (error) {
        showSM4Message('解密失败: ' + error.message);
        console.error('SM4解密错误:', error);
    }
}

// SM4加密核心函数（假设使用第三方库）
async function sm4Encrypt(content, key) {
    try {
        // 这里假设使用了第三方SM4库
        // 如果没有现成的库，需要实现完整的SM4算法
        
        // 由于没有明确的SM4库引用，这里使用一个简化的实现
        // 实际应用中应该使用成熟的SM4加密库
        
        // 以下为示例代码，实际使用时需要替换为真实的SM4实现
        const encoder = new TextEncoder();
        const keyData = encoder.encode(key);
        const contentData = encoder.encode(content);
        
        // 这里只是一个占位函数，实际应用中需要替换为真实的SM4算法
        function simpleSM4Encrypt(data, key) {
            // 简化的SM4加密实现（仅作示例）
            let result = '';
            for (let i = 0; i < data.length; i++) {
                // 简单的异或操作作为示例
                result += String.fromCharCode(data[i] ^ key[i % key.length]);
            }
            return btoa(result);
        }
        
        const encrypted = simpleSM4Encrypt(contentData, keyData);
        return encrypted;
    } catch (error) {
        throw new Error('SM4加密失败: ' + error.message);
    }
}

// SM4解密核心函数（假设使用第三方库）
async function sm4Decrypt(encryptedContent, key) {
    try {
        // 这里假设使用了第三方SM4库
        // 如果没有现成的库，需要实现完整的SM4算法
        
        // 由于没有明确的SM4库引用，这里使用一个简化的实现
        // 实际应用中应该使用成熟的SM4加密库
        
        // 以下为示例代码，实际使用时需要替换为真实的SM4实现
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const keyData = encoder.encode(key);
        
        // 解码Base64
        const encryptedData = atob(encryptedContent);
        const encryptedBytes = new Uint8Array(encryptedData.length);
        for (let i = 0; i < encryptedData.length; i++) {
            encryptedBytes[i] = encryptedData.charCodeAt(i);
        }
        
        // 这里只是一个占位函数，实际应用中需要替换为真实的SM4算法
        function simpleSM4Decrypt(data, key) {
            // 简化的SM4解密实现（仅作示例）
            let result = new Uint8Array(data.length);
            for (let i = 0; i < data.length; i++) {
                // 简单的异或操作作为示例
                result[i] = data[i] ^ key[i % key.length];
            }
            return result;
        }
        
        const decryptedBytes = simpleSM4Decrypt(encryptedBytes, keyData);
        const decrypted = decoder.decode(decryptedBytes);
        return decrypted;
    } catch (error) {
        throw new Error('SM4解密失败: ' + error.message);
    }
}

// 导出函数
window.sm4Module = {
    initSM4Tool,
    generateRandomSM4Key,
    showSM4Message,
    clearSM4,
    encryptSM4,
    decryptSM4,
    sm4Encrypt,
    sm4Decrypt
};
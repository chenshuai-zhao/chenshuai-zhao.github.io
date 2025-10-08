// JWT解析工具模块
function initJWT() {
    // 页面加载时可以生成一个示例JWT
    // generateSampleJWT();
}

// 解析JWT函数
function parseJWT() {
    const jwtToken = document.getElementById('jwt-input').value.trim();
    
    if (!jwtToken) {
        showJWTError('请输入JWT令牌！');
        return;
    }
    
    try {
        // 分割JWT的三部分：Header.Payload.Signature
        const parts = jwtToken.split('.');
        
        if (parts.length !== 3) {
            showJWTError('无效的JWT格式，JWT应由三部分组成：Header.Payload.Signature');
            return;
        }
        
        // 解析Header
        const header = JSON.parse(atobUrlSafe(parts[0]));
        document.getElementById('jwt-header').textContent = JSON.stringify(header, null, 2);
        
        // 解析Payload
        const payload = JSON.parse(atobUrlSafe(parts[1]));
        document.getElementById('jwt-payload').textContent = JSON.stringify(payload, null, 2);
        
        // 显示Signature（不解析）
        document.getElementById('jwt-signature').textContent = parts[2];
        
        // 检查令牌是否过期
        if (payload.exp) {
            checkTokenExpiry(payload.exp);
        }
        
        // 隐藏错误信息
        document.getElementById('jwt-error').style.display = 'none';
        
    } catch (error) {
        showJWTError('解析失败: ' + error.message);
        console.error('JWT解析错误:', error);
    }
}

// 显示JWT错误信息
function showJWTError(message) {
    const errorElement = document.getElementById('jwt-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// URL安全的base64解码
function atobUrlSafe(str) {
    // 添加缺失的填充字符
    str += '='.repeat((4 - str.length % 4) % 4);
    // 替换URL安全字符
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // 解码
    return atob(str);
}

// 检查令牌过期
function checkTokenExpiry(expTimestamp) {
    const now = Math.floor(Date.now() / 1000);
    const expiryDate = new Date(expTimestamp * 1000);
    
    const statusElement = document.getElementById('jwt-expiry-status');
    
    if (now > expTimestamp) {
        statusElement.textContent = `令牌已过期于 ${expiryDate.toLocaleString()}`;
        statusElement.className = 'text-danger';
    } else {
        const timeLeft = expTimestamp - now;
        let timeLeftStr = '';
        
        if (timeLeft < 60) {
            timeLeftStr = `${timeLeft}秒`;
        } else if (timeLeft < 3600) {
            timeLeftStr = `${Math.floor(timeLeft / 60)}分钟`;
        } else if (timeLeft < 86400) {
            timeLeftStr = `${Math.floor(timeLeft / 3600)}小时`;
        } else {
            timeLeftStr = `${Math.floor(timeLeft / 86400)}天`;
        }
        
        statusElement.textContent = `令牌将在 ${timeLeftStr} 后过期（${expiryDate.toLocaleString()}）`;
        statusElement.className = 'text-success';
    }
    
    statusElement.style.display = 'block';
}

// 清空JWT输入和输出
function clearJWT() {
    document.getElementById('jwt-input').value = '';
    document.getElementById('jwt-header').textContent = '{}';
    document.getElementById('jwt-payload').textContent = '{}';
    document.getElementById('jwt-signature').textContent = '';
    document.getElementById('jwt-error').style.display = 'none';
    document.getElementById('jwt-expiry-status').style.display = 'none';
}

// 生成示例JWT
function generateSampleJWT() {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600; // 1小时后过期
    
    // 创建Header
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    };
    
    // 创建Payload
    const payload = {
        "sub": "1234567890",
        "name": "John Doe",
        "iat": now,
        "exp": exp,
        "admin": true
    };
    
    // Base64编码（URL安全）
    const encodedHeader = btoaUrlSafe(JSON.stringify(header));
    const encodedPayload = btoaUrlSafe(JSON.stringify(payload));
    
    // 示例签名（实际应用中应该使用密钥签名）
    const signature = "example_signature_here_that_would_be_generated_with_a_secret_key";
    
    // 组合JWT
    const sampleJWT = `${encodedHeader}.${encodedPayload}.${signature}`;
    
    // 设置到输入框
    document.getElementById('jwt-input').value = sampleJWT;
    
    // 自动解析示例JWT
    parseJWT();
}

// URL安全的base64编码
function btoaUrlSafe(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// 导出函数
window.jwtModule = {
    initJWT,
    parseJWT,
    showJWTError,
    atobUrlSafe,
    checkTokenExpiry,
    clearJWT,
    generateSampleJWT,
    btoaUrlSafe
};
##  ttyd
- ttyd 是一个简单的命令行工具，用于通过网络共享终端。
- 地址 https://github.com/tsl0922/ttyd


- 启动命令 
```
cd /usr/sbin/ttyd.x86_64
ttyd.x86_64 -p 8090 bash

```

- 后台启动
```
ttyd.x86_64 -p 2222 bash &
ttyd.x86_64 -p 2222 -c km:kmtest1234 bash &

```

- 参数配置

```
选项：

-p、 --要侦听的端口（默认值：7681，使用'0'表示随机端口）
-i、 --要绑定的接口网络接口（例如：eth0）或UNIX域套接字路径（例如：/var/run/ttyd.sock）
-c、 --用于基本身份验证的凭据（格式：用户名：密码）
-u、 --要使用的uid用户id
-g、 --要使用的gid组id
-s、 --退出命令时发送给命令的信号（默认值：1，SIGHUP）
-a、 --url arg允许客户端在url中发送命令行参数（例如：http://localhost:7681?arg=foo&arg=bar)
-R、 --只读不允许客户端写入TTY
-t、 --客户端选项向客户端发送选项（格式：key=value），重复此操作以添加更多选项
-T、 --要报告的端子类型端子类型，默认值：xterm-256color
-O、 --检查原点不允许从不同原点连接websocket
-m、 --最大客户端要支持的最大客户端数（默认值：0，无限制）
-o、 --一次只接受一个客户端，断开连接后退出
-B、 --浏览器使用默认系统浏览器打开终端
-一、 --索引自定义index.html路径
-b、 --基本路径来自反向代理的请求的预期基本路径（例如：/mounted/here，最大长度：128）
-P、 --ping间隔Websocket ping间隔（秒）（默认值：300）
-6，-ipv6启用ipv6支持
-S、 --ssl启用ssl
-C、 --ssl证书ssl证书文件路径
-K、 --ssl密钥ssl密钥文件路径
-A、 --用于客户端证书验证的ssl ca ssl ca文件路径
-d、 --调试设置日志级别（默认值：7）
-v、 --版本打印版本并退出
-h、 --帮助打印此文本并退出

```

- nginx配置
``` 
location ~ ^/ttyd(.*)$ {
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://127.0.0.1:7681/$1;
}
```
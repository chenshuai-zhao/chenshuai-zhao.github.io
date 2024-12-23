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
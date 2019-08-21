tppl.js
=======

> fork from [https://github.com/jojoin/tppl](https://github.com/jojoin/tppl)

**做了以下改动：**

- 增加便于调试模板的报错提醒
- 封装成npm包`js-tppl`

## 特性

1.	代码精简，就一个函数，方便嵌入任何位置
2.	性能卓越，为目前最快的模板引擎（[性能测试](http://jojoin.github.io/tppl/test/test.htm)）
3.	编译缓存，一次编译重复渲染使用
4.	无模板语法，使用原生js
5.	兼容Node.js及所有流行的浏览器

============

## 快速上手

**编写模板**

使用一个``type="text/html"``的``script``标签存放模板：
	
	<script id="test" type="text/html">
	[: if (title){ :]
		[: for (var i=0;i<list.length;i++) { :]
			<div>[:=i:]. [:=list[i].user:]</div>
		[:}:]
		[:=this.name||"name is not found !":]
	[:}:]
	</script>

**渲染模板**
	
	var data = {
		title: '标签',
		list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
	};
	var html = tppl(document.getElementById('test').innerHTML, data);

============

## 方法

#### tppl(tpl, data)

返回渲染好的模板内容。

#### tppl(tpl)

返回渲染函数。

	var tpl = "..." , data = {...};
	var render = tppl(tpl); //渲染函数
	var html = render(data);  //重复使用

============

## 语法

字段 | 类型 | 值| 说明
------------ | ------------- | ------------ | ------------
openTag | String | ``[:`` | 逻辑语法开始标签
closeTag | String | ``:]`` | 逻辑语法结束标签
valueTag | String | ``[:=`` | 输出变量开始标签
valueTag | String | ``:]`` | 输出变量结束标签

**变量默认值**

为未定义的或值为`假`的变量给出默认值：

	[:=foo||"变量foo存在但值为假":]
	
	[:=this.foo||"变量foo不存在或为假!":]

**避免未定义的变量引起系统崩溃**

若模板中定义了一个变量输出，但传入数据中却没有这个变量，模板解析就会出错，从而引起整个程序的崩溃。如果无法确保数据完整性，仍然有方法可以对其成员进行探测。在需要检测的变量前加关键字 this，如：

	[: if (this.dataName !== undefined) { :]
	      [:= dataName :]
	[: } :]

也可为不存在的变量设置默认值：

	[:=this.foo||"变量foo不存在或为假!":]

其它判断：

	[:=foo ? 1 : 0:]
	[:=this.foo ? "存在" : "变量foo不存在或为假!":]



============

## 下载

* [tppl.js](https://github.com/jojoin/tppl/blob/gh-pages/tppl.js) *(原生语法, 1.19kb)* 

============
	
## 性能测试：

![性能测试](test/all.jpg)

“第一梯队”效率测试：

![性能测试](test/some.jpg)

tppl 的编译渲染速度是著名的 jQuery 作者 John Resig 开发的 tmpl 的 **43** 倍！与第二名 artTemplate 也有一倍的差距。 查看 [性能测试](http://jojoin.github.io/tppl/test/test.htm) ，单次结果不一定准确，请多测几次。

============

## 授权协议

Released under the MIT, BSD, and GPL Licenses

============

© 杨捷 yangjie@jojoin.com

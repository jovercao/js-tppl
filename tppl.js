/**
 * tppl.js 极致性能的 JS 模板引擎
 * Github：https://github.com/jojoin/tppl
 * 作者：杨捷
 * 修改：Jover
 * 邮箱：yangjie@jojoin.com
 *
 * @param tpl {String}    模板字符串
 * @param data {Object}   模板数据（不传或为null时返回渲染方法）
 *
 * @return  {String}    渲染结果
 * @return  {Function}  渲染方法
 *
 */

function tppl(tpl, data) {
    var fn = function (d) {
        var i, k = [], v = [];
        for (i in d) {
            k.push(i);
            v.push(d[i]);
        }
        let handler;
        try {
            handler = new Function(k, fn.$);
        } catch (e) {
            throw new Error('模板编译错误：\n' + e.message + '\n模板信息：' + fn.$);
        }
        try {
            return handler.apply(d, v);
        } catch (e) {
            throw new Error('模板渲染错误：\n' + e.message + '\n模板信息：' + fn.$);
        }
    };
    if (!fn.$) {
        fn.$ = compileTpl(tpl)
    }
    return data ? fn(data) : fn;
}

function compileTpl(tpl) {
    let statements;
    var tpls = tpl.split('[:');
    statements = "var $=''";
    for (var i = 0; i < tpls.length; i++) {
        var p = tpls[i].split(':]');
        if (i !== 0) {
            statements += p[0].charAt(0) === '='
                ? "\n    +(" + p[0].substr(1) + ")"
                : ";\n    " + p[0] + "$=$";
        }
        // 支持 <pre> 和 [::] 包裹的 js 代码
        // 文本代码
        statements += "\n    +'" + p[p.length - 1].replace(/\\/g, '\\\\').replace(/\'/g, "\\'").replace(/\r\n/g, '\\r\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
    }
    statements += ";return $;";
    // log(statements);
    return statements;
}

function compile2Module(tpl, args) {
    const statements = compileTpl(tpl)
    return `
module.exports = function(${args.join(', ')}) {
  ${statements}
}
`
}

module.exports = tppl;
module.exports.tppl = tppl;
module.exports.default = tppl;

module.exports.compile2Module = compile2Module;

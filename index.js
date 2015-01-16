'use strict';

function parseText(str) {
    return str.trim();
}

function textToString(field, value) {
    value = value || '';
    var end = new Array(field.size + 1 - value.length).join(' ');
    return value + end;
}

var fixedstr = module.exports = function (objDef) {
    return {
        objectify: function (str) {
            var from = 0;
            str = str || '';
            return objDef.reduce(function (obj, field) {
                var parse = field.parse || parseText;
                obj[field.name] = parse(str.substring(from, from + field.size));
                from += field.size;
                return obj;
            }, {});
        },
        stringify: function (obj) {
            return objDef.reduce(function (str, field) {
                var toStr = field.toFixedString || textToString;
                if(obj[field.name] && obj[field.name].length > field.size) {
                    throw new Error('truncation error on field: ' + field.name + ', size: ' + field.size + ', value: ' + obj[field.name]);
                }
                return str + toStr(field, obj[field.name]);
            }, '');
        }
    };
};

fixedstr.str = function (name, size) {
    return {
        name: name,
        size: size
    };
};

fixedstr.number = function (name, size) {
    return {
        name: name,
        size: size,
        parse: Number,
        toFixedString: function (field, value) {
            var strVal = value && value.toString ? value.toString() : '0',
                pad = new Array(field.size + 1 - strVal.length).join('0');
            return pad + strVal;
        }
    };
};

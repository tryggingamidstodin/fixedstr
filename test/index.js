'use strict';
var fixedstr = require('../'),
    expect = require('chai').expect;

describe('fixedstr', function() {
    var transformer = fixedstr([
        fixedstr.str('foo', 2),
        {
            name: 'bar',
            size: 5,
            parse: function(str) {
                return str;
            }
        },
        fixedstr.number('baz', 3)
    ]);

    it('should objectify', function() {

        expect(transformer.objectify('F Bar  3')).to.eql({
            foo: 'F',
            bar: 'Bar  ',
            baz: 3
        });
    });

    it('should objectify empty string', function() {

        expect(transformer.objectify('')).to.eql({
            foo: '',
            bar: '',
            baz: 0
        });
    });

    it('should objectify empty undefined', function() {

        expect(transformer.objectify()).to.eql({
            foo: '',
            bar: '',
            baz: 0
        });
    });

    it('should stringify', function() {
        expect(transformer.stringify({
            foo: 'F',
            bar: 'Bar',
            baz: 3
        })).to.equal('F Bar  003');
    });

    it('should stringify missing fields', function () {
        expect(transformer.stringify({
            foo: 'F'
        })).to.equal('F      000');
    });

    it('should throw truncation error on string type', function () {
        var ex;
        try{
            transformer.stringify({
                foo: 'Fooo'
            });
        }catch(e) {
            ex = e;
        }
        expect(ex.message).to.contain('truncation error on field: foo');
    });

    it('should throw truncation error on number type', function () {
        var ex;
        try{
            transformer.stringify({
                baz: 12345
            });
        }catch(e) {
            ex = e;
        }
        expect(ex.message).to.contain('truncation error on field: baz');
    });

    it('should not throw truncation error if toFixedString truncated the value', function() {
        var t = fixedstr([{
            name: 'foo',
            size: 4,
            toFixedString: function(f, value) {
                return value.substr(0, 4);
            }
        }]);
        var str = t.stringify({
            foo: '123456'
        });
        expect(str).to.equal('1234');
    });

    it('should not throw truncation error if using fixedstr.strTrunc', function() {
        var t = fixedstr([fixedstr.strTrunc('TEST', 5)]);
        var str = t.stringify({
            TEST: '123456'
        });
        expect(str).to.equal('12345');
    });
});

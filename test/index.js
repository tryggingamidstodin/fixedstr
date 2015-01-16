'use strict';
var fixedstr = require('../'),
    expect = require('chai').expect;

describe('fixedstr', function() {
    var transformer = fixedstr([
        fixedstr.str('foo', 2),
        fixedstr.str('bar', 5),
        fixedstr.number('baz', 3)
    ]);

    it('should objectify', function() {

        expect(transformer.objectify('F Bar  3')).to.eql({
            foo: 'F',
            bar: 'Bar',
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

    it('should throw truncation error', function () {
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
});

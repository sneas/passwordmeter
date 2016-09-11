import {expect} from 'chai';
import passwordMeter from './index'

describe('password-meter', function() {
    describe('checkPass', function() {
        it('should return -1 on empty string', function() {
            expect(passwordMeter.checkPass('')).to.be.equal(-1);
        });

        it('should return 4 on sequential number', function() {
            expect(passwordMeter.checkPass('123')).to.be.equal(4);
        });

        it('check for Consecutive Uppercase Letters exist ', function() {
            expect(passwordMeter.checkPass('AA')).to.be.equal(0);
        });

        it('should return 0 on sequential alpha number exists', function() {
            expect(passwordMeter.checkPass('abcdefghi')).to.be.equal(0);
        });

        it('should return 29 on sequential symbols', function() {
            expect(passwordMeter.checkPass('@#$')).to.be.equal(29);
        });

        it('should return less than 100 when some of criteria does not meet', function() {
            expect(passwordMeter.checkPass('bnd#A')).to.be.below(100);
        });

        it('should return 100 when meet all criteria', function() {
            expect(passwordMeter.checkPass('abm@poOdsc!G&')).to.be.equal(100);
        });

        it('should consider minLength param', function() {
            let minLengthNoSatisfiedScore = passwordMeter.checkPass('1@111a111', 20),
                minLengthSatisfiedScore = passwordMeter.checkPass('1@111a111', 4);

            expect(minLengthSatisfiedScore > minLengthNoSatisfiedScore).to.be.true;
        });
    });
});
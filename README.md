# passwordmeter

[![travis build](https://img.shields.io/travis/sneas/passwordmeter.svg?style=flat-square&maxAge=2592000)](https://travis-ci.org/sneas/passwordmeter)
[![codecov coverage](https://img.shields.io/codecov/c/github/sneas/passwordmeter.svg?style=flat-square)](https://codecov.io/github/sneas/passwordmeter)
[![version](https://img.shields.io/npm/v/passwordmeter.svg?style=flat-square)](http://npm.im/passwordmeter)
[![bower](https://img.shields.io/bower/v/passwordmeter.svg?style=flat-square)](https://bower.io/)
[![downloads](https://img.shields.io/npm/dm/passwordmeter.svg?style=flat-square)](http://npm-stat.com/charts.html?package=passwordmeter&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/passwordmeter.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Password security checker function based on http://www.passwordmeter.com/

Unobtrusive and tested.

# Installation

This package is distributed via npm:

```
npm install passwordmeter
```

or Bower:

```
bower install passwordmeter
```

# Usage

## Require

```javascript
var passwordMeter = require('passwordmeter');
//Function returns result from 0 to 100 and -1 for empty password.
//Second param is minimum password length. 8 by default
var score = passwordMeter.checkPass('pA$$w0rD', 8);
```

## Bower
 
 ```html
 <script src="bower_components/passwordmeter/dist/index.umd.min.js"></script>
 <script>
    var score = passwordMeter.checkPass('pA$$w0rD', 8);
 </script>
 ```
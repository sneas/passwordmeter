(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["passwordMeter"] = factory();
	else
		root["passwordMeter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	function reverse(string) {
	    var newstring = "";
	    for (var s = 0; s < string.length; s++) {
	        newstring = string.charAt(s) + newstring;
	    }
	    return newstring;
	}
	
	module.exports = {
	    /**
	     * Check password's strength
	     *
	     * @param {String} password
	     * @param {Number} minLength - minimum password length
	     * @returns {Number} - from 0 to 100 and -1 for an empty password
	     */
	    checkPass: function checkPass(password) {
	        var minLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
	
	        if (!password) {
	            return -1;
	        }
	
	        // The code below almost identical to the `chkPass(pwd)` function from http://www.passwordmeter.com/js/pwdmeter.js
	
	        var nAlphaUC = 0,
	            nAlphaLC = 0,
	            nNumber = 0,
	            nSymbol = 0,
	            nMidChar = 0,
	            nUnqChar = 0,
	            nRepChar = 0,
	            nRepInc = 0,
	            nConsecAlphaUC = 0,
	            nConsecAlphaLC = 0,
	            nConsecNumber = 0,
	            nConsecSymbol = 0,
	            nConsecCharType = 0,
	            nSeqAlpha = 0,
	            nSeqNumber = 0,
	            nSeqSymbol = 0,
	            nSeqChar = 0,
	            nReqChar = 0;
	        var nMultMidChar = 2,
	            nMultConsecAlphaUC = 2,
	            nMultConsecAlphaLC = 2,
	            nMultConsecNumber = 2;
	        var nMultSeqAlpha = 3,
	            nMultSeqNumber = 3,
	            nMultSeqSymbol = 3;
	        var nMultLength = 4,
	            nMultNumber = 4;
	        var nMultSymbol = 6;
	        var nTmpAlphaUC = "",
	            nTmpAlphaLC = "",
	            nTmpNumber = "",
	            nTmpSymbol = "";
	        var sAlphas = "abcdefghijklmnopqrstuvwxyz";
	        var sNumerics = "01234567890";
	        var sSymbols = ")!@#$%^&*()";
	
	        var nScore = parseInt(password.length * nMultLength);
	        var nLength = password.length;
	        var arrPwd = password.replace(/\s+/g, "").split(/\s*/);
	        var arrPwdLen = arrPwd.length;
	
	        /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
	        for (var a = 0; a < arrPwdLen; a++) {
	            if (arrPwd[a].match(/[A-Z]/g)) {
	                if (nTmpAlphaUC !== "") {
	                    if (nTmpAlphaUC + 1 == a) {
	                        nConsecAlphaUC++;nConsecCharType++;
	                    }
	                }
	                nTmpAlphaUC = a;
	                nAlphaUC++;
	            } else if (arrPwd[a].match(/[a-z]/g)) {
	                if (nTmpAlphaLC !== "") {
	                    if (nTmpAlphaLC + 1 == a) {
	                        nConsecAlphaLC++;nConsecCharType++;
	                    }
	                }
	                nTmpAlphaLC = a;
	                nAlphaLC++;
	            } else if (arrPwd[a].match(/[0-9]/g)) {
	                if (a > 0 && a < arrPwdLen - 1) {
	                    nMidChar++;
	                }
	                if (nTmpNumber !== "") {
	                    if (nTmpNumber + 1 == a) {
	                        nConsecNumber++;nConsecCharType++;
	                    }
	                }
	                nTmpNumber = a;
	                nNumber++;
	            } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
	                if (a > 0 && a < arrPwdLen - 1) {
	                    nMidChar++;
	                }
	                if (nTmpSymbol !== "") {
	                    if (nTmpSymbol + 1 == a) {
	                        nConsecSymbol++;nConsecCharType++;
	                    }
	                }
	                nTmpSymbol = a;
	                nSymbol++;
	            }
	            /* Internal loop through password to check for repeat characters */
	            var bCharExists = false;
	            for (var b = 0; b < arrPwdLen; b++) {
	                if (arrPwd[a] == arrPwd[b] && a != b) {
	                    /* repeat character exists */
	                    bCharExists = true;
	                    /*
	                     Calculate icrement deduction based on proximity to identical characters
	                     Deduction is incremented each time a new match is discovered
	                     Deduction amount is based on total password length divided by the
	                     difference of distance between currently selected match
	                     */
	                    nRepInc += Math.abs(arrPwdLen / (b - a));
	                }
	            }
	            if (bCharExists) {
	                nRepChar++;
	                nUnqChar = arrPwdLen - nRepChar;
	                nRepInc = nUnqChar ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
	            }
	        }
	
	        /* Check for sequential alpha string patterns (forward and reverse) */
	        for (var s = 0; s < 23; s++) {
	            var sFwd = sAlphas.substring(s, parseInt(s + 3));
	            var sRev = reverse(sFwd);
	            if (password.toLowerCase().indexOf(sFwd) != -1 || password.toLowerCase().indexOf(sRev) != -1) {
	                nSeqAlpha++;nSeqChar++;
	            }
	        }
	
	        /* Check for sequential numeric string patterns (forward and reverse) */
	        for (var _s = 0; _s < 8; _s++) {
	            var _sFwd = sNumerics.substring(_s, parseInt(_s + 3));
	            var _sRev = reverse(_sFwd);
	            if (password.toLowerCase().indexOf(_sFwd) != -1 || password.toLowerCase().indexOf(_sRev) != -1) {
	                nSeqNumber++;nSeqChar++;
	            }
	        }
	
	        /* Check for sequential symbol string patterns (forward and reverse) */
	        for (var _s2 = 0; _s2 < 8; _s2++) {
	            var _sFwd2 = sSymbols.substring(_s2, parseInt(_s2 + 3));
	            var _sRev2 = reverse(_sFwd2);
	            if (password.toLowerCase().indexOf(_sFwd2) != -1 || password.toLowerCase().indexOf(_sRev2) != -1) {
	                nSeqSymbol++;nSeqChar++;
	            }
	        }
	
	        /* Modify overall score value based on usage vs requirements */
	
	        /* General point assignment */
	        if (nAlphaUC > 0 && nAlphaUC < nLength) {
	            nScore = parseInt(nScore + (nLength - nAlphaUC) * 2);
	        }
	        if (nAlphaLC > 0 && nAlphaLC < nLength) {
	            nScore = parseInt(nScore + (nLength - nAlphaLC) * 2);
	        }
	        if (nNumber > 0 && nNumber < nLength) {
	            nScore = parseInt(nScore + nNumber * nMultNumber);
	        }
	        if (nSymbol > 0) {
	            nScore = parseInt(nScore + nSymbol * nMultSymbol);
	        }
	        if (nMidChar > 0) {
	            nScore = parseInt(nScore + nMidChar * nMultMidChar);
	        }
	
	        /* Point deductions for poor practices */
	        if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {
	            // Only Letters
	            nScore = parseInt(nScore - nLength);
	        }
	        if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {
	            // Only Numbers
	            nScore = parseInt(nScore - nLength);
	        }
	        if (nRepChar > 0) {
	            // Same character exists more than once
	            nScore = parseInt(nScore - nRepInc);
	        }
	        if (nConsecAlphaUC > 0) {
	            // Consecutive Uppercase Letters exist
	            nScore = parseInt(nScore - nConsecAlphaUC * nMultConsecAlphaUC);
	        }
	        if (nConsecAlphaLC > 0) {
	            // Consecutive Lowercase Letters exist
	            nScore = parseInt(nScore - nConsecAlphaLC * nMultConsecAlphaLC);
	        }
	        if (nConsecNumber > 0) {
	            // Consecutive Numbers exist
	            nScore = parseInt(nScore - nConsecNumber * nMultConsecNumber);
	        }
	        if (nSeqAlpha > 0) {
	            // Sequential alpha strings exist (3 characters or more)
	            nScore = parseInt(nScore - nSeqAlpha * nMultSeqAlpha);
	        }
	        if (nSeqNumber > 0) {
	            // Sequential numeric strings exist (3 characters or more)
	            nScore = parseInt(nScore - nSeqNumber * nMultSeqNumber);
	        }
	        if (nSeqSymbol > 0) {
	            // Sequential symbol strings exist (3 characters or more)
	            nScore = parseInt(nScore - nSeqSymbol * nMultSeqSymbol);
	        }
	
	        var arrChars = void 0,
	            arrCharsIds = void 0,
	            arrCharsLen = void 0;
	
	        /* Determine if mandatory requirements have been met and set image indicators accordingly */
	        arrChars = [nLength, nAlphaUC, nAlphaLC, nNumber, nSymbol];
	        arrCharsIds = ["nLength", "nAlphaUC", "nAlphaLC", "nNumber", "nSymbol"];
	        arrCharsLen = arrChars.length;
	        for (var c = 0; c < arrCharsLen; c++) {
	            var minVal;
	            if (arrCharsIds[c] == "nLength") {
	                minVal = parseInt(minLength - 1);
	            } else {
	                minVal = 0;
	            }
	            if (arrChars[c] == parseInt(minVal + 1)) {
	                nReqChar++;
	            } else if (arrChars[c] > parseInt(minVal + 1)) {
	                nReqChar++;
	            }
	        }
	        var nRequirements = nReqChar;
	        var nMinReqChars;
	        if (password.length >= minLength) {
	            nMinReqChars = 3;
	        } else {
	            nMinReqChars = 4;
	        }
	        if (nRequirements > nMinReqChars) {
	            // One or more required characters exist
	            nScore = parseInt(nScore + nRequirements * 2);
	        }
	
	        if (nScore > 100) {
	            nScore = 100;
	        } else if (nScore < 0) {
	            nScore = 0;
	        }
	
	        return nScore;
	    }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.umd.js.map
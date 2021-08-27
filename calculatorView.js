"use strict";

function calculatorView() {

    this.displayNumber = function (num) {
        let result = document.getElementById("result");
        result.innerText += num;
    };

    this.clearDisplay = function () {
        let result = document.getElementById("result");
        result.innerHTML = "AMOUNT: \u00A0";
    };

    this.clearCalculatorCallback = function (callback) {
        document.getElementById("clear").addEventListener("click", callback);
    };

    this.calculateCallback = function (callback) {
        document.getElementById("calculate").addEventListener("click", callback);
    };

    this.numberButtonCallback = function (callback) {
        var buttons = document.querySelectorAll(".numButton"), i;

        for (i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", callback);
        }
    };

    this.bankFeeButtonCallback = function (callback) {
        let fees = document.querySelectorAll(".feeButtons"), i;

        for (i = 0; i < fees.length; i++) {
            fees[i].addEventListener("click", callback);
        }
    };

    this.rateButtonCallback = function (callback) {
        document.getElementById("select1").addEventListener("input", callback);
        document.getElementById("select2").addEventListener("input", callback);
    };

    this.dropdownMenu = function (num) {
        if (num === 1) {
            document.getElementById("rates").classList.toggle("show");

        } else {
            document.getElementById("fees").classList.toggle("show");
        }
    };
}

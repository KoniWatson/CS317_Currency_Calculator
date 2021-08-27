"use strict";

let view = new calculatorView(),
    model = new calculatorModel(),
    controller = null;

function calculatorController() {
    let calcDone = false;

    this.updateCalculatorNumber = function (num) {
        view.displayNumber(num);
        console.log(localStorage);
    };

    this.init = function () {
        model.readMXL();

        view.calculateCallback(function () {
            let sum = model.calculate(model.getVisitingRates(), model.getFees());
            view.clearDisplay();
            controller.updateCalculatorNumber(sum);
            calcDone = true;
        });

        view.clearCalculatorCallback(function () {
            view.clearDisplay();
        });

        view.numberButtonCallback(function () {
            if (calcDone) {
                view.clearDisplay();
                controller.updateCalculatorNumber(model.getNumber());
                calcDone = false;
            } else {
                controller.updateCalculatorNumber(model.getNumber());
            }
        });

        view.bankFeeButtonCallback(function () {
            model.setBankFee();
            model.localSave(3, model.getFees(), 0);
        });

        view.rateButtonCallback(function () {
            model.setHomeRates();
            model.localSave(1, model.getHomeRates());
            model.setVisitingRates();
            model.localSave(2, model.getVisitingRates());
        });
    };
}

controller = new calculatorController();
window.addEventListener("load", controller.init);

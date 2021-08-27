"use strict";

let  ratesEBC = [];

function calculatorModel() {
    let calcNum, fee, rate2, rate1;

    this.setHomeRates = function () {
        let homeRate = document.getElementById("select1");

        rate1 = homeRate.options[homeRate.selectedIndex].value;
    };

    this.setVisitingRates = function () {
        let visitingRate = document.getElementById("select2");

        rate2 = visitingRate.options[visitingRate.selectedIndex].value;
    };

    this.getHomeRates = function () {
        return rate1;
    };

    this.getVisitingRates = function () {
        return rate2;
    };

    this.setNumber = function (num) {
        calcNum = num;
    };

    this.getNumber = function () {
        return calcNum;
    };

    this.calculate = function (rate, bankFee) {
        let amount = document.getElementById("result").innerText.replace("AMOUNT:", ""),
            calculation;

        if (rate1 === 1) {
            if (bankFee > 0) {
                calculation = ((bankFee / 100) * (amount * rate)) + (amount * rate);
            } else {
                calculation = amount * rate;
            }
        }else {
            if (bankFee > 0) {
                calculation = ((bankFee / 100) * ((amount/rate1)*rate2)) + ((amount/rate1)*rate2);
            } else {
                calculation = (amount/rate1)*rate2;
            }
        }

        return Math.round(calculation);
    };

    this.setBankFee = function () {
        let checkedBankFee = document.getElementsByName("bankFee");

        for (let i = 0; i < checkedBankFee.length; i++) {
            if (checkedBankFee[i].checked) {
                fee = checkedBankFee[i].value;
            }
        }
    };

    this.getFees = function () {
        return fee;
    };

    this.localSave = function (key, value) {
        switch (key) {
            case 1:
                localStorage.setItem("homeRate", value);
                break;
            case 2:
                localStorage.setItem("visitingRate", value);
                break;
            case 3:
                localStorage.setItem("bankFee", value);
                break;
            default:
                break;
        }
    };

    this.localLoad = function () {
        rate1 = localStorage.getItem("homeRate");
        if (rate1 === null) {
            rate1 = document.getElementById("select1").options[6].value;
            document.getElementById("select1").value = rate1;
            localStorage.setItem("homeRate", rate1);
        }else {
            for (let i = 1; i < document.getElementById("select1").length; i++) {
                if (document.getElementById("select1").options[i].value === rate1) {
                    document.getElementById("select1").value = rate1;
                    break;
                }
            }
        }

        rate2 = localStorage.getItem("visitingRate");
        if (rate2 === null) {
            rate2 = document.getElementById("select2").options[0].value;
            document.getElementById("select2").value = rate2;
            localStorage.setItem("visitingRate", rate2);
        }else {
            for (let i = 1; i < document.getElementById("select2").length; i++) {
                if (document.getElementById("select2").options[i].value === rate2) {
                    document.getElementById("select2").value = rate2;
                    break;
                }
            }
        }

        fee = localStorage.getItem("bankFee");
        if (fee === null) {
            document.getElementById("0").checked = true;
            fee = 0;
            localStorage.setItem("bankFee", "0");
        } else {
            document.getElementById(fee).checked = true;
        }
    };

    this.readMXL = function () {
        let httpXML = new XMLHttpRequest();

        httpXML.open("GET", "https://devweb2019.cis.strath.ac.uk/~aes02112/ecbxml.php", true);
        httpXML.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let x, i, xmlFile;

                xmlFile = this.responseXML;

                x = xmlFile.getElementsByTagName('Cube');

                for (i = 0; i < x.length; i++) {
                    ratesEBC.push(x[i].getAttribute('rate'));
                }
                model.realRates();
                document.getElementById("updated").innerText = "true";
            }else {
                document.getElementById("updated").innerText = "false";
            }
        };
        httpXML.send();
    };

    this.realRates = function () {
        for(let i = 1; i < document.getElementById("select1").length; i++ ) {
            document.getElementById("select1").options[i].value = ratesEBC[i+1];
        }
        for(let i = 1; i < document.getElementById("select2").length; i++ ) {
            document.getElementById("select2").options[i].value = ratesEBC[i+1];
        }

        model.localLoad();
    };
}

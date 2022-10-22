class Controller {
    constructor() {

    }
    showChargingUI() {
        var divContainer = document.createElement("div"); // parent
        var divChargeCell = document.createElement("div"); // a cell
        var percentage = document.createElement("p");
        percentage.textContent = "28%";
        
        percentage.className = "charging_percentage";

        divChargeCell.className = "charging_cell";
        divContainer.className = "charging_container";
        divContainer.appendChild(percentage);
        divContainer.appendChild(divChargeCell);


        return divContainer
    }
}
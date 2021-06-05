"use strict";

// decimal should be clicked once
// exception handling

var values_collected_from_user = [];
var second_operand = [];

let last_used = "null";

const my_numBtn = document.querySelectorAll(".buttons");
const my_results = document.getElementById("results");

for (var i = 0; i < my_numBtn.length; i++) {
  my_numBtn[i].addEventListener("click", clickBtn);
}

function clickBtn(e) {
  const key = e.target;
  const action = key.dataset.action;
  const btn_clicked = key.textContent;
  let displayed_num = my_results.textContent;
  let current_keyType = key.classList.contains("operator");
  let operand1, operand2, operator;

  if (!action) {
    // if key is not an operator
    if (displayed_num == "0") {
      // if it IS a number, and is the default 0, then replace its value
      my_results.textContent = btn_clicked;
    } else if (action === "decimal") {
      // if its a decimal, append decimal to previous numbers
      my_results.textContent = displayed_num + ".";
    } else if (values_collected_from_user.length > 0) {
      // if key is an operator and array isn't empty
      second_operand.push(btn_clicked);
      my_results.textContent = displayed_num + btn_clicked;
      displayed_num = my_results.textContent;
      // ----@@@@@@----- REMOVE HERE
      // operand2 = key.textContent;
      // values_collected_from_user.push(operand2);
      // console.log(values_collected_from_user[2]);
      // @@@@@@@@@@@@@@
    } else if (last_used == "equals") {
      // after a calculation is done we want to reset the screen, this "if stmt" does that
      last_used = "null";
      my_results.textContent = btn_clicked;
      displayed_num = my_results.textContent;
    } else {
      // If its just a number then just append to it
      my_results.textContent = displayed_num + btn_clicked;
    }
    /* ------------------------------------------------------------------------*/
  } else if (action && !values_collected_from_user.length > 0) {
    // if key is an operator and array is empty

    operand1 = displayed_num;
    operator = key.textContent;
    values_collected_from_user.push(operand1);
    values_collected_from_user.push(operator);
    my_results.textContent = displayed_num + operator;
    console.log(values_collected_from_user[0]);
    console.log(values_collected_from_user[1]);
  } else if (action && key.dataset.action == "calculate") {
    // if equal button is clicked
    operand2 = Number(second_operand.join(""));
    values_collected_from_user.push(operand2);

    let result = eval(values_collected_from_user.join(" "));
    let isDecimal = Number(result);

    // if number is decimal then truncate it, otherwise whole numbers shouldn't be posted as decimals
    if (isDecimal % 1 != 0) {
      result = result.toFixed(7);
    }
    my_results.textContent = result;
    displayed_num = my_results.textContent;
    last_used = "equals";

    //empty the array for new calculations
    values_collected_from_user.pop();
    values_collected_from_user.pop();
    values_collected_from_user.pop();

    // --- MAKE WHILE LOOP WHILE OPERAND IS FULL POP
    while (second_operand.length > 0) {
      second_operand.pop();
    }

    console.log(result);
  }
}

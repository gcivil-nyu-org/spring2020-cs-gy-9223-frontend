function addRow(){
  var sensorList, myLi, myInput, mySelect, myButton, float_option, string_option, bool_option;

  sensorList = document.getElementById("sensor-list");
  // Make name box:
  myLi = document.createElement("LI");
  myLi.className = "sensor-list-field-name";
  myInput = document.createElement("input");
  myInput.setAttribute("type","text");
  myLi.appendChild(myInput);
  sensorList.appendChild(myLi);

  //Make field type:
  myLi = document.createElement("LI");
  myLi.className = "sensor-list-field-type";
  mySelect = document.createElement("select");

  float_option = document.createElement("option");
  float_option.appendChild(document.createTextNode("Float"));
  mySelect.appendChild(float_option);

  string_option = document.createElement("option");
  string_option.appendChild(document.createTextNode("String"));
  mySelect.appendChild(string_option);

  bool_option = document.createElement("option");
  bool_option.appendChild(document.createTextNode("Bool"));
  mySelect.appendChild(bool_option);

  myLi.appendChild(mySelect);
  sensorList.appendChild(myLi);

  var hr = document.createElement('hr');
  sensorList.appendChild(hr);
}

var add_field_button = document.getElementById("addfieldbutton");
add_field_button.onclick = function() {
  addRow();
}

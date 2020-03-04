$(document).ready(function() {

    // AJAX to retrieve sensor data from the backend
    $.ajax({
        url: "/sensor_data",
        type: "GET",

    success: function(response) {

        // parse serialized sensor data, store in an object
        var sensors = JSON.parse(response);

        var existing_sensors;
        existing_sensors = document.getElementById("existing_sensors");
        var sensorNumber = 0;

        // build panel with editable fields for each sensor
        for (sensor in sensors) {
            // Create panel div
            let div = document.createElement("div");
            div.setAttribute("class", "panel");
            existing_sensors.append(div);

            // Create header
            let header = document.createElement("h2");
            header.setAttribute("contentEditable", "true");
            header.setAttribute("id", "sensor_name_"+sensorNumber);
            header.innerHTML = sensors[sensor]["sensor_display_name"];
            div.append(header);

            // Create labels
            let labels_div = document.createElement("div");
            labels_div.setAttribute("id", "labels");
            div.append(labels_div);

            let field_name_label_div = document.createElement("div");
            field_name_label_div.setAttribute("class", "inline-block-child");
            let field_name_label = document.createElement("h4");
            field_name_label.innerHTML="<u>Field Name</ul>";
            field_name_label_div.append(field_name_label);
            labels_div.append(field_name_label_div);

            let field_type_label_div = document.createElement("div");
            field_type_label_div.setAttribute("class", "inline-block-child");
            let field_type_label = document.createElement("h4");
            field_type_label.innerHTML="<u>Field Type</ul>";
            field_type_label_div.append(field_type_label);
            labels_div.append(field_type_label_div);

            // Retrieve field display names
            // Note: replace single quotes with double quotes
            let display_names = sensors[sensor]["fields"]["field_display_names"]
            .replace(/'/g,'"')
            field_display_names = JSON.parse(display_names);

            // Retrieve field data types
            let types = sensors[sensor]["fields"]["data_types"].replace(/'/g, '"')
            field_data_types =  JSON.parse(types)

            let fieldNumber = 0
            for (field in field_display_names) {

                let current_field_div = document.createElement("div");
                current_field_div.setAttribute("id", field);
                div.append(current_field_div);

                field_name_div = document.createElement("div");
                field_name_div.setAttribute("class", "inline-block-child");
                current_field_div.append(field_name_div);
                field_name = document.createElement("p");
                field_name.setAttribute("contentEditable", "true");
                field_name.setAttribute("id", "name"+field);
                field_name.innerHTML=field_display_names[field];
                div.append(field_name);
                field_name_div.append(field_name);

                //build a select element, with the correct data type selected
                field_type_div = document.createElement("div");
                field_type_div.setAttribute("class", "inline-block-child");
                current_field_div.append(field_type_div);

                data_type_select = document.createElement("select");
                float_option = document.createElement("option");
                float_option.append(document.createTextNode("Float"));
                if (field_data_types[field] === "float"){
                    float_option.setAttribute("selected", "true");
                }
                data_type_select.append(float_option);

                string_option = document.createElement("option");
                string_option.append(document.createTextNode("String"));
                if (field_data_types[field] === "string"){
                    float_option.setAttribute("selected", "true");
                }
                data_type_select.append(string_option);

                bool_option = document.createElement("option");
                bool_option.append(document.createTextNode("Boolean"));
                if (field_data_types[field] === "boolean"){
                    float_option.setAttribute("selected", "true");
                }
                data_type_select.append(bool_option);

                field_type_div.append(data_type_select);

                fieldNumber++;
            }

            // Create edit button
            let edit_button = document.createElement("input");
            edit_button.setAttribute("class", "editbutton simulator-btn grafana-btn grafana-btn-green");
            edit_button.setAttribute("type", "submit");
            edit_button.setAttribute("name", "edit_sensor_"+sensorNumber);
            edit_button.setAttribute("value", "Edit");
            div.append(edit_button);

            sensorNumber++;
        }
    },

    error: function(xhr, errmsg) {
        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        console.log(xhr);
    }
    });
});

$('#SensorForm').on('submit', function (event) {
            event.preventDefault();
            console.log("Sensor form submitted");
            create_sensor();
        }
    );

function create_sensor() {

    console.log("Entered create_sensor()");

    console.log($('#SensorForm').serializeArray());

}

function addRow(){
  var sensorList, field_name_li, field_type_li, field_name_input, field_type_select,
  float_option, string_option, bool_option;

  sensorList = document.getElementById("sensor-list");
  // Make name box:
  field_name_li = document.createElement("li");
  field_name_li.className = "sensor-list-field-name";
  field_name_input = document.createElement("input");
  field_name_input.setAttribute("type","text");
  field_name_input.setAttribute("name","field-name")
  field_name_li.appendChild(field_name_input);
  sensorList.appendChild(field_name_li);

  //Make field type:
  field_type_li = document.createElement("li");
  field_type_li.className = "sensor-list-field-type";
  field_type_select = document.createElement("select");
  field_type_select.setAttribute("name", "field-type")

  float_option = document.createElement("option");
  float_option.appendChild(document.createTextNode("Float"));
  field_type_select.appendChild(float_option);

  string_option = document.createElement("option");
  string_option.appendChild(document.createTextNode("String"));
  field_type_select.appendChild(string_option);

  bool_option = document.createElement("option");
  bool_option.appendChild(document.createTextNode("Boolean"));
  field_type_select.appendChild(bool_option);

  field_type_li.appendChild(field_type_select);
  sensorList.appendChild(field_type_li);

  var hr = document.createElement('hr');
  sensorList.appendChild(hr);
}

var add_field_button = document.getElementById("addfieldbutton");
add_field_button.onclick = function() {
  addRow();
}

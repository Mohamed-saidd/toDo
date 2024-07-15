var eventInput = document.getElementById("input");
var dateInput = document.getElementById("date");
var btnInput = document.getElementById("btn");
var eventList = [];
if (localStorage.getItem("eventss") != null) {
  eventList = JSON.parse(localStorage.getItem("eventss"));
  displayEvent();
}
btnInput.addEventListener("click", function () {
  if (validateTask()) {
    if (validateDate()) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Good Job !",
        showConfirmButton: false,
        timer: 1500,
      });
      var event = {
        name: eventInput.value,
        date: dateInput.value,
      };
      eventList.push(event);
      localStorage.setItem("eventss", JSON.stringify(eventList));
      displayEvent();
    }
  }
});
function displayEvent() {
  var temp = "";
  for (var i = 0; i < eventList.length; i++) {
    temp += `<div class="col-lg-12">
      <div class="form-check d-flex align-items-center px-3">
        <input class="form-check-input mx-0" type="checkbox"  id="${i}">
        <label class="form-check-label h3 m-3 p-0" for="${i}">${eventList[i].name}</label>
        <div class="icon ms-auto d-flex align-items-center gap-2" >
          <i class="fa-solid fa-trash-can text-danger" onClick="deleteTask(${i})"></i>
          <div class="bg-white border border-warning rounded p-2">
            <i class="fa-solid fa-hourglass-half text-warning"></i>
            <span>
            ${eventList[i].date}
            </span>
          </div>
        </div>
          </div>
  </div>`;
    document.getElementById("TaskContent").innerHTML = temp;
  }
}
function deleteTask(index) {
  eventList.splice(index, 1);
  displayEvent();
  localStorage.setItem("eventss", JSON.stringify(eventList));
}
function validateDate() {
  var currentDate = new Date().toJSON().slice(0, 10);
  if (dateInput.value < currentDate) {
    Swal.fire("Enter Valid Date");
    return false;
  } else {
    return true;
  }
}
function validateTask() {
  var regex = /.+/;
  if (regex.test(eventInput.value)) {
    return true;
  } else {
    Swal.fire("Enter Task");
    return false;
  }
}

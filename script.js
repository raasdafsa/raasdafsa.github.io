const yearHead = document.querySelector(".yearHead"),
monthHead = document.querySelector(".monthHead"),
calendarTable = document.querySelector(".calendarTable");

console.log($.getJSON("http://spreadsheets.google.com/tq?tq=select+A&key=1qKdLoNBo9yqMVFBVSd7MlzIAsnr5Tw4S1ZBUvwqCf4Y"))

//Month Names
var months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]

//for testing
//var date = new Date(2024, 10, 25),

//Current Date

var date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth(),
currentDate = date.getDate();

yearHead.textContent = currentYear;
monthHead.textContent = months[currentMonth];

//year and month both in int
function genCalendar(year, month){
    var Day1 = new Date(year, month).getDay()
    calendarTable.innerHTML = "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>"
    for (let row = 0; row < 6; row++){
        var newRow = document.createElement("tr");
        for (let col = 0; col < 7; col++){
            var newCell = document.createElement("td");
            var dateCount = (7 * row) + col - Day1 + 1;

            if (year == currentYear &&
                month == currentMonth &&
                dateCount == currentDate){
                    newCell.classList.add("currentDate");
                }

            if (dateCount <= 0 || dateCount > 31){
                    newCell.classList.add("inactive");
                }
            else if (month == 3 ||
                    month == 5 ||
                    month == 8 ||
                    month == 10){
                        if (dateCount <= 0 || dateCount > 30){
                            newCell.classList.add("inactive");
                        }
                    }
            else if (month == 1){
                if (year % 4 == 0){
                    if (dateCount <= 0 || dateCount > 29){
                        newCell.classList.add("inactive");
                    }
                }
                else {
                    if (dateCount <= 0 || dateCount > 28){
                        newCell.classList.add("inactive");
                    }
                }
            }

            newCell.textContent = new Date(year, month, (7 * row) + col - Day1 + 1).getDate();
            newRow.append(newCell);
        }
        calendarTable.append(newRow);
    }
}
genCalendar(currentYear, currentMonth)


function prevMonth() {
    var monthIndex = months.indexOf(monthHead.textContent);
    if (monthIndex == 0) {
        monthIndex = 11;
        monthHead.textContent = months[monthIndex];
        yearHead.textContent--;
    }
    else {
        monthIndex--;
        monthHead.textContent = months[monthIndex];
    } 
    genCalendar(yearHead.textContent, monthIndex);
}


function nextMonth() {
    var monthIndex = months.indexOf(monthHead.textContent);
    if (monthIndex == 11) {
        monthIndex = 0;
        monthHead.textContent = months[monthIndex];
        yearHead.textContent++;
    }
    else {
        monthIndex++;
        monthHead.textContent = months[monthIndex];
    }
    genCalendar(yearHead.textContent, monthIndex);
}
const yearHead = document.querySelector(".yearHead"),
monthHead = document.querySelector(".monthHead"),
calendarTable = document.querySelector(".calendarTable");

//Month Names
const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]

//Current Date

const date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth(),
currentDate = date.getDate();

yearHead.textContent = currentYear;
monthHead.textContent = months[currentMonth];

var data
const downloadURLtest = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSa6eNkpxWpyjaBUR2vbm4_LJVPJAXgu355xGULFpkpucVEcH13p9QEtSbG6Srg1foNTY8tvhdZhAW_/pub?gid=0&single=true&output=csv"
fetch(downloadURLtest)
      .then(response => response.text())
      .then(text => data = text)
      .then(r => genCalendar(currentYear, currentMonth))
      .then(r => dataCounter(data))

//year and month both in int

function dataCounter(data){
    let dataArray = data.split("\r\n")
    dataArray.shift()
    var expandedDates = []
    for (dRange of dataArray){
        let dates = dRange.split(","),
        sDate = new Date(dates[0]),
        eDate = new Date(dates[1])
    }
}

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
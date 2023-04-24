// Your code here
function createEmployeeRecord(array) {
    let timeCard = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    // console.log(Object.values(timeCard))
    return timeCard
}

function createEmployeeRecords(arrays) {
    let employeeRecords = arrays.map(createEmployeeRecord)
    return employeeRecords
}

function createTimeInEvent(record, timeIn) {
    let time = {
        type: "TimeIn",
        date: timeIn.split(" ")[0],
        hour: parseInt(timeIn.split(" ")[1])
    }
    record.timeInEvents.push(time)
    return record
}

function createTimeOutEvent(record, timeOut) {
    let time = {
        type: "TimeOut",
        date: timeOut.split(" ")[0],
        hour: parseInt(timeOut.split(" ")[1])
    }
    record.timeOutEvents.push(time)
    return record
}

function hoursWorkedOnDate(record) {
    return (record.timeOutEvents[0].hour - record.timeInEvents[0].hour) / 100
}

function wagesEarnedOnDate(record) {
    return hoursWorkedOnDate(record) * record.payPerHour
}

function allWagesFor(record) {
    // console.log(record)
    let TIE = record.timeInEvents
    let TOE = record.timeOutEvents
    let hoursWorkedArr = []
    for (let i = 0; i < TIE.length; i++) {
        let num = TOE[i].hour - TIE[i].hour
        hoursWorkedArr.push(num)
    }
    let totalHours = hoursWorkedArr.reduce((accum, curr) => 
        accum + curr, 0)
    return totalHours / 100 * record.payPerHour
}

function calculatePayroll(array) {
    let payStubs = []
    for (const emp of array) {
        payStubs.push(allWagesFor(emp))
    }
    let payRoll = payStubs.reduce((accum, curr) => 
    accum + curr, 0)
    return payRoll
}
import datepicker from 'js-datepicker'

console.log(document.getElementById('startingDate'))
const startingDatePicker = datepicker(document.getElementById('startingDate'),{
    // Event callbacks.
    onSelect: instance => {
      // Show which date was selected.
      console.log(instance.dateSelected)
    },
    onShow: instance => {
      console.log('Calendar showing.')
    },
    onHide: instance => {
      console.log('Calendar hidden.')
    },
    onMonthChange: instance => {
      // Show the month of the selected date.
      console.log(instance.currentMonthName)
    },
    formatter: (input, date, instance) => {
      // This will display the date as `1/1/2019`.
      input.value = date.toDateString()
    },
    startDay: 1, // Calendar week starts on a Monday.
    customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
})
  // Customizations.
  /*
  position: 'tr', // Top right.
  startDay: 1, // Calendar week starts on a Monday.
  customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  customOverlayMonths: ['😀', '😂', '😎', '😍', '🤩', '😜', '😬', '😳', '🤪', '🤓 ', '😝', '😮'],
  overlayButton: 'Go!',
  overlayPlaceholder: 'Enter a 4-digit year',

  // Settings.
  alwaysShow: true, // Never hide the calendar.
  dateSelected: new Date(), // Today is selected.
  maxDate: new Date(2099, 0, 1), // Jan 1st, 2099.
  minDate: new Date(2016, 5, 1), // June 1st, 2016.
  startDate: new Date(), // This month.
  showAllDates: true, // Numbers for leading & trailing days outside the current month will show.

  // Disabling things.
  noWeekends: true, // Saturday's and Sunday's will be unselectable.
  disabler: date => (date.getDay() === 2 && date.getMonth() === 9), // Disabled every Tuesday in October
  disabledDates: [new Date(2050, 0, 1), new Date(2050, 0, 3)], // Specific disabled dates.
  disableMobile: true, // Conditionally disabled on mobile devices.
  disableYearOverlay: true, // Clicking the year or month will *not* bring up the year overlay.

  // ID - be sure to provide a 2nd picker with the same id to create a daterange pair.
  id: 1
})*/
console.log(startingDatePicker)
//const maximumLimitDate = datepicker('#maximumLimitDate')
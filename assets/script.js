// Creating a global variable
var currentHour = dayjs().format('H');
// Adding function so the hour color change depending on the current time.
 function hourColor() {
  $('.time-block').each(function() {
    var blockHour = parseInt(this.id.split('-')[1]);
    $(this).toggleClass('past', blockHour < currentHour);
    $(this).toggleClass('present', blockHour === currentHour);
    $(this).toggleClass('future', blockHour > currentHour);
  });
}

// Adding function so the text of the TODO's saved after you click the save button
 function textEntry() {
  $('.saveBtn').on('click', function() {
    var key = $(this).parent().attr('id');
    var value = $(this).siblings('.description').val();
    // Retrieving the key and the value to the local storage
    localStorage.setItem(key, value);
  });
}

 function refreshColor() {
  $('.time-block').each(function() {
    var blockHour = parseInt(this.id.split('-')[1]);
// Usinfg an IF statement to recognize the block hour, past, present or future depending on the current Hour
    if (blockHour == currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else if (blockHour < currentHour) {
      $(this).removeClass('future present').addClass('past');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });
}

$('.time-block').each(function() {
  var key = $(this).attr('id');
  // Saving the key to the local storage
  var value = localStorage.getItem(key);
  $(this).find('.description').val(value);
});

// Making a global function to my document for my updateTime function
$(document).ready(function() {
  function updateTime () {
  var dateElement = $('#date');
  var timeElement = $('#time');
  // Setting the current date and time via dayjs
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  var currentTime = dayjs().format('hh:mm:ss A');
  dateElement.text('Date: ' + currentDate);
  timeElement.text('Time: ' + currentTime);
}

// Calling the current day id to add Current Date & Time text
$('#currentDay').text('Current Date & Time');
// Calling all the functions
hourColor();
textEntry();
refreshColor();
// updateTime();Setting the interval with the updateTime function
setInterval(updateTime, 1000);
});
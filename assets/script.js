
var currentHour = dayjs().format('H');

 function hourColor() {
  $('.time-block').each(function() {
    var blockHour = parseInt(this.id.split('-')[1]);
    $(this).toggleClass('past', blockHour < currentHour);
    $(this).toggleClass('present', blockHour === currentHour);
    $(this).toggleClass('future', blockHour > currentHour);
  });
}

 function textEntry() {
  $('.saveBtn').on('click', function() {
    var key = $(this).parent().attr('id');
    var value = $(this).siblings('.description').val();
    localStorage.setItem(key, value);
  });
}

 function refreshColor() {
  $('.time-block').each(function() {
    var blockHour = parseInt(this.id.split('-')[1]);

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
  var value = localStorage.getItem(key);
  $(this).find('.description').val(value);
});

$(document).ready(function() {
  function updateTime () {
  var dateElement = $('#date');
  var timeElement = $('#time');
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  var currentTime = dayjs().format('hh:mm:ss A');
  dateElement.text('Date: ' + currentDate);
  timeElement.text('Time: ' + currentTime);
}

$('#currentDay').text('Current Date & Time');
hourColor();
textEntry();
refreshColor();
updateTime();

setInterval(updateTime, 1000);
});
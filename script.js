var counter = 1;
$('.back').hide();
$('#content-2').hide();
$('#content-3').hide();
$('.end').hide();
console.log('counter is ' + counter);
var currentPosition;
var trackSize;
var seekRate;
var noOfRequest;
var alpha;
var requests = [];
var errRequestsCount = 0;

$('body').on('click', '.next', function () {
  $('.content').hide();
  var newFieldsRequest;

  // VALIDATE BEFORE GOING TO NEXT
  if (counter == 1) {
    $('#content-1').show();
    currentPosition = document.getElementById('currentPosition').value;
    var errCurrentPosition = $('#currentPosition').parent().find('.errCurrentPosition');
    trackSize = document.getElementById('trackSize').value;
    var errTrackSize = $('#trackSize').parent().find('.errTrackSize');
    seekRate = document.getElementById('seekRate').value;
    var errSeekRate = $('#seekRate').parent().find('.errSeekRate');
    noOfRequest = document.getElementById('noOfRequest').value;
    var errNoOfRequest = $('#noOfRequest').parent().find('.errNoOfRequest');
    var errCount = 0;

    if (currentPosition == "") {
      errCurrentPosition.text('This Field is Required');
      errCount++;
    } else if (isNaN(currentPosition)) {
      errCurrentPosition.text('Must be a Number');
      errCount++;
    }

    if (trackSize == "") {
      errTrackSize.text('This Field is Required');
      errCount++;
    } else if (isNaN(trackSize)) {
      errTrackSize.text('Must be a Number');
      errCount++;
    }

    if (seekRate == "") {
      errSeekRate.text('This Field is Required');
      errCount++;
    } else if (isNaN(seekRate)) {
      errSeekRate.text('Must be a Number');
      errCount++;
    }

    if (noOfRequest == "") {
      errNoOfRequest.text('This Field is Required');
      errCount++;
    } else if ((noOfRequest % 1 != 0) || noOfRequest > 10) {
      errNoOfRequest.text('Must be Less than Integer 10');
      errCount++;
    }

    if (errCount == 0) { //correct info
      counter++;
      $('#content-1').hide();
      $('#content-2').show();
      $('.back').show();
      addFieldsRequest(noOfRequest);
    }
  } else if (counter == 2) {
    $('#content-2').show();
    $('.back').show();

    validateRequest();

  } else if (counter == 3) {
    $('#content-3').show();
    $('.back').show();

    alpha = document.getElementById('alpha').value;
    var errAlpha = $('#alpha').parent().find('.errAlpha');
    if (alpha == "") {
      errAlpha.text('This Field is Required');
    } else if (isNaN(alpha)) {
      errAlpha.text('Must be a Number');
    } else {
      counter++;
      $('#content-3').hide();
      $('.content-holder').hide();
      $('.end').show();
      $('.next').removeClass("btn-info");
      $('.next').addClass("btn-secondary");
      document.querySelector('.next').innerText = 'Next';
      noOfRequest = parseInt(document.getElementById('noOfRequest').value);
      console.log(noOfRequest);
      addFieldsResult(noOfRequest);
    }
  }

  // CPU SCHEDULING COMPUTATION & RESULT
  if (counter > 3) {
    $('.content-holder').hide();
    $('.end').show();
    var card = document.querySelector('.card');
    card.classList.remove('col-lg-5');
    card.classList.remove('col-sm-8');
    card.classList.add('col-10');
  }
});

$('body').on('click', '.back', function () {
  counter--;
  console.log('counter: ' + counter);
  $('.content').hide();
  if (counter < 2) {
    $('#content-1').show();
    $('.back').hide();
    removeFieldsRequest();
  } else if (counter == 2) {
    $('#content-2').show();
  } else if (counter == 3) {
    $('#content-3').show();
  }

  if (counter < 3) {
    $('.next').removeClass("btn-info");
    $('.next').addClass("btn-secondary");
    document.querySelector('.next').innerText = 'Next';
  }
});

$('body').on('click', '.retry', function () {
  $('.back').hide();
  $('.end').hide();
  $('.content-holder').show();
  $('#content-1').show();
  $('.next').removeClass("btn-info");
  $('.next').addClass("btn-secondary");
  document.querySelector('.next').innerText = 'Next';
  document.getElementById('currentPosition').value = "";
  document.getElementById('trackSize').value = "";
  document.getElementById('seekRate').value = "";
  document.getElementById('noOfRequest').value = "";
  document.getElementById('alpha').value = "";
  document.querySelector('.errCurrentPosition').innerHTML = "";
  document.querySelector('.errTrackSize').innerHTML = "";
  document.querySelector('.errSeekRate').innerHTML = "";
  document.querySelector('.errNoOfRequest').innerHTML = "";
  document.querySelector('.errAlpha').innerHTML = "";
  removeFieldsRequest();
  removeFieldsResult();
  counter = 1;
});

var n = document.getElementById('noOfRequest').value;
console.log('n is ' + n);
var label = $('<label for="request" class="form-label"></label>');
var span = $('<span class="errorSpan"></span>');
var input = $('<input type="text" class="form-control" style="margin-bottom:10px;"/>');
var newFieldsRequest = $('');
//ADDING, REMOVING, VALIDATING AT FIELDS
function addFieldsRequest(n) {
  for (i = newFieldsRequest.length; i < n; i++) {
    label = $('<label for="request" class="form-label">Loc' + (i + 1) + '</label>');
    span = $('<span class="errorSpan errorSpanRequest' + (i + 1) + '"></span>');
    input = $('<input type="text" class="form-control" style="margin-bottom:10px;" id="request' + (i + 1) + '"/>');
    var newLabel = label.clone();
    var newSpan = span.clone();
    var newInput = input.clone();
    newFieldsRequest = newFieldsRequest.add(newLabel);
    newFieldsRequest = newFieldsRequest.add(newSpan);
    newFieldsRequest = newFieldsRequest.add(newInput);
    newLabel.appendTo('#newFieldsRequest');
    newSpan.appendTo('#newFieldsRequest');
    newInput.appendTo('#newFieldsRequest');
  }
}

function removeFieldsRequest() {
  var removeField = newFieldsRequest.slice(0).remove();
  newFieldsRequest = newFieldsRequest.not(removeField);
}

function validateRequest() {
  var n = ((newFieldsRequest.length) / 3);
  console.log('is empty: ' + !requests.length);
  errRequestsCount = 0;
  if (!requests.length) {
    console.log('here');
    requests = new Array(n);
  }

  for (i = 0; i < n; i++) {
    requests[i] = document.getElementById('request' + (i + 1)).value;
    var errorSpan = $('#request' + (i + 1)).parent().find('.errorSpanRequest' + (i + 1));
    if (requests[i] == "") {
      errorSpan.text('This Field is Required');
      errRequestsCount++;
    } else if (isNaN(requests[i] + "")) {
      errorSpan.text('Must be a Number');
      errRequestsCount++;
    } else {
      errorSpan.text('');
    }
  }

  if (errRequestsCount == 0) { //correct info
    counter++;
    $('#content-2').hide();
    $('#content-3').show();
    $('.next').removeClass("btn-secondary");
    $('.next').addClass("btn-info");
    document.querySelector('.next').innerText = 'Submit';
  }

  console.log(requests);
  console.log('errRequestsCount: ' + errRequestsCount);
}

// COMPUTE & ADD TABLE
function addFieldsResult(n) {
  const div = document.getElementById("newFieldsResult"),
    tbl = document.createElement('table');
  tbl.classList.add('table');
  tbl.classList.add('table-hover');
  tbl.classList.add('table-light');
  tbl.style.borderRadius = '20px';
  tbl.style.marginBottom = '0';
  var thead;
  var tbody = tbl.createTBody();
  var tfoot;
  var tr;

  // Call the simulateCSCAN function
  var scanResults = simulateCSCAN(alpha, currentPosition, trackSize, seekRate, n, requests);

  // Only need to iterate once for each row
  for (let i = 0; i < 2; i++) {
    tr = (i === 0) ? tbl.createTHead().insertRow() : tbody.insertRow(); // Create header row for i=0, tbody row for i=1

    for (let j = 0; j < 2; j++) {
      const td = tr.insertCell();
      td.style.color = 'black';

      if (i === 0 && j === 0) {
        td.appendChild(document.createTextNode(`Total Head Movement`));
        td.style.fontWeight = '600';
        td.style.borderTop = '0';
      } else if (i === 0 && j === 1) {
        td.appendChild(document.createTextNode(`Seek Time`));
        td.style.fontWeight = '600';
        td.style.borderTop = '0';
      } else if (j === 0) {
        if (i === 1) {
          td.appendChild(document.createTextNode(scanResults.totalHeadMovement));
        }
      } else if (j === 1) {
        if (i === 1) {
          td.appendChild(document.createTextNode(scanResults.seekTime));
        }
      }
    }
  }

  div.appendChild(tbl);
}

function removeFieldsResult() {
  var newFieldsResult = document.getElementById('newFieldsResult');
  newFieldsResult.innerHTML = '';
}

// Simulate CSCAN function
function simulateCSCAN(alpha, currentPosition, trackSize, seekRate, noOfRequests, requests) {

  // Convert inputs to integers
  alpha = parseInt(alpha);
  currentPosition = parseInt(currentPosition);
  trackSize = parseInt(trackSize);
  seekRate = parseInt(seekRate);
  noOfRequests = parseInt(noOfRequests);
 
  // Sort the requests in ascending order
  requests.sort((a, b) => a - b);

  // Initialize variables
  var totalHeadMovement = 0;

  // Find the index where the current position is located in the sorted requests
  var currentIndex = requests.findIndex(request => request >= currentPosition);

  // C-SCAN in the forward direction
  for (var i = currentIndex; i < noOfRequests; i++) {
    totalHeadMovement += Math.abs(requests[i] - currentPosition);
    currentPosition = requests[i];
  }

  // If there are requests after the current position, go to the beginning
  if (currentIndex !== -1) {
    totalHeadMovement += trackSize - currentPosition;
    currentPosition = 0;
  }

  // C-SCAN in the backward direction
  for (var i = 0; i < currentIndex; i++) {
    totalHeadMovement += Math.abs(requests[i] - currentPosition);
    currentPosition = requests[i];
  }

  // Calculate seek time using alpha
  var seekTime = alpha * totalHeadMovement / seekRate;

  // Return the results
  return {
    totalHeadMovement: totalHeadMovement,
    seekTime: seekTime.toFixed(2), // Round to two decimal places
  };
}
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
  
  function runSimulation() {
    // Get user inputs
    var alpha = document.getElementById('alpha').value;
    var currentPosition = document.getElementById('currentPosition').value;
    var trackSize = document.getElementById('trackSize').value;
    var seekRate = document.getElementById('seekRate').value;
    var noOfRequests = document.getElementById('noOfRequests').value;
    var requests = document.getElementById('requests').value.split(',').map(Number);
  
    // Call the simulation function
    var simulationResults = simulateCSCAN(alpha, currentPosition, trackSize, seekRate, noOfRequests, requests);
  
    // Display results in the frontend
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <h2>Simulation Results</h2>
      <p>Total Head Movement: ${simulationResults.totalHeadMovement}</p>
      <p>Seek Time: ${simulationResults.seekTime} ms</p>
    `;
  }
  
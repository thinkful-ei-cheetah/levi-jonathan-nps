const apiKey = 'U1Cym6cqJQtbgczuQblUY3RZNylzxISntWhrWWDc'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


// https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=MA&api_key=U1Cym6cqJQtbgczuQblUY3RZNylzxISntWhrWWDc
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getParks(params, maxResults=10) {
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString + '&limit=' + maxResults + '&api_key='+apiKey;
    console.log(url);
  
    fetch(url)
      .then(response => {
        // the new code starts here
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
      // for each video object in the items 
      //array, add a list item to the results 
      //list with the video title, description,
      //and thumbnail
      $('#results-list').append(
        `<li><h3>${responseJson.items[i].snippet.title}</h3>
        <p>${responseJson.items[i].snippet.description}</p>
        <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = {
            stateCode:  $('#js-search-term').val(), 
      };
      const maxResults =  $('#js-max-results').val();    
      getParks(searchTerm, maxResults);
    });
  }
  
  $(watchForm);
// data.
  // fullName
  // description
  // url
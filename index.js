const apiKey = 'U1Cym6cqJQtbgczuQblUY3RZNylzxISntWhrWWDc'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getParks(params, maxResults=10) {
    const queryString = formatQueryParams(params); 
    const formattedQueryString = queryString.split('%20').join('');
    const url = searchURL + '?' + formattedQueryString + '&limit=' + (maxResults-1) + '&api_key='+apiKey;
  
    fetch(url)
      .then(response => {
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
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++){
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].url}</p>
        <p>${responseJson.data[i].description}</p>
        </li>`
      )};
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
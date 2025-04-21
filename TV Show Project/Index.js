  <script>
    const showsUrl = 'https://api.tvmaze.com/shows';
    let allShows = [];
    let allEpisodes = [];


    fetch(showsUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        allShows = data;
        allShows.sort((a, b) => a.name.localeCompare(b.name));
        populateDropdown(allShows);
        displayAllShows(allShows);
      })
      .catch(error => {
        console.error('Error fetching TV show data:', error);
        document.getElementById('showDetails').innerHTML = `<p>Error loading shows. Check console.</p>`;
      });

  
    function populateDropdown(shows) {
      const dropdown = document.getElementById('showDropdown');
      dropdown.innerHTML = '<option value="">-- Select a Show --</option>';
      shows.forEach(show => {
        const option = document.createElement('option');
        option.value = show.id;
        option.textContent = show.name;
        dropdown.appendChild(option);
      });
    }

 
function displayAllShows(shows) {
  const showDetails = document.getElementById('showDetails');
  const showCount = document.getElementById('showCount');
  
  showDetails.innerHTML = '';
  showCount.textContent = `Displaying ${shows.length} show(s)`;

  shows.forEach(show => {
    const showCard = document.createElement('div');
    showCard.classList.add('show-card');

    showCard.innerHTML = `
      <h2>${show.name}</h2>
      <img src="${show.image?.medium || 'https://via.placeholder.com/250x375?text=No+Image'}" alt="Image of ${show.name}">
      <div class="card-summary">${show.summary || 'No summary available.'}</div>
      <div class="meta">
        <p><strong>Genres:</strong> ${show.genres.join(', ') || 'N/A'}</p>
        <p><strong>Status:</strong> ${show.status || 'N/A'}</p>
        <p><strong>Rating:</strong> ${show.rating?.average || 'N/A'}</p>
        <p><strong>Runtime:</strong> ${show.runtime ? show.runtime + ' min' : 'N/A'}</p>
      </div>
    `;

    showDetails.appendChild(showCard);
  });
}


    document.getElementById('showDropdown').addEventListener('change', (event) => {
      const showId = event.target.value;
      if (showId) {
        const selectedShow = allShows.find(show => show.id == showId);
        displayAllShows([selectedShow]);
      } else {
        displayAllShows(allShows);
      }
    });


    document.getElementById('searchButton').addEventListener('click', () => {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const filteredShows = allShows.filter(show =>
        show.name.toLowerCase().includes(query) ||
        (show.summary && show.summary.toLowerCase().includes(query))
      );
      displayAllShows(filteredShows);
    });
  </script>
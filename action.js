const userdata = document.querySelector("#tvshowsform");
const search = document.querySelector("#searchterm");
const sbutton = document.querySelector('button');
const MovieData = {};

sbutton.addEventListener('click', async function(e) {
  e.preventDefault();
  const searchResult = search.value;
  const config = { params: { q: searchResult } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  console.log(res.data);
  makeResults(res.data);
  search.value = '';
})

const makeResults = (shows) => {
  const container = document.getElementById('container');

  for (let result of shows) {
    const ListOfDetails = document.createElement('ul');
    const title = document.createElement('li');
    const rating = document.createElement('li');
    const genre = document.createElement('li');
    const language = document.createElement('li');
    const about = document.createElement('li');
    const liveOn = document.createElement('li');

    const ImageContainer = document.querySelector('#Image');
    const MovieDetailContainer = document.querySelector('#MovieDetails');
    if (result.show.image) {
      const img = document.createElement('IMG');
      img.src = result.show.image.medium;
    }

    title.innerText = result.show.name;
    rating.innerText = result.show.rating.average;
    genre.innerText = result.show.genres;
    language.innerText = result.show.language;
    about.innerText = result.show.summary;
    liveOn.innerText = result.show.webChannel.name;

    // Store data in the MovieData object
    const movieKey = result.show.name;
    MovieData[movieKey] = {
      image: result.show.image ? result.show.image.medium : '',
      movieTitle: result.show.name,
      movieRating: result.show.rating.average,
      movieGenre: result.show.genres,
      movieLanguage: result.show.language,
      movieAbout: result.show.summary,
      movieLiveOn: result.show.webChannel.name
    };

    // Append data to HTML page
    const showElement = document.querySelector('#finalResults');
    // First Append data to a div
    const detailDiv = document.createElement('div');
    detailDiv.setAttribute("class", "tvshows");
    // Create and append image element
    const img = document.createElement('img');
    img.src = MovieData[movieKey].image;
    detailDiv.appendChild(img);

    // Create and append details elements
    const titleElement = document.createElement('h2');
    titleElement.textContent = MovieData[movieKey].movieTitle;
    detailDiv.appendChild(titleElement);

    const ratingElement = document.createElement('p');
    ratingElement.textContent = 'Rating: ' + MovieData[movieKey].movieRating;
    detailDiv.appendChild(ratingElement);

    const genreElement = document.createElement('p');
    genreElement.textContent = 'Genre: ' + MovieData[movieKey].movieGenre;
    detailDiv.appendChild(genreElement);

    const languageElement = document.createElement('p');
    languageElement.textContent = 'Language: ' + MovieData[movieKey].movieLanguage;
    detailDiv.appendChild(languageElement);

    const aboutElement = document.createElement('p');
    aboutElement.textContent = 'About: ' + MovieData[movieKey].movieAbout;
    detailDiv.appendChild(aboutElement);

    const liveOnElement = document.createElement('p');
    liveOnElement.textContent = 'Live On: ' + MovieData[movieKey].movieLiveOn;
    detailDiv.appendChild(liveOnElement);

    showElement.appendChild(detailDiv);
  }
}

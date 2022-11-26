let autoList;

function reduce(){
	const navItem =  document.getElementById('nav-item-list');
	navItem.classList.remove('hidden');
}

function expand(){
	const navItem =  document.getElementById('nav-item-list');
	navItem.classList.add('hidden');
}
  
function autoComplete(){
	autoList = document.getElementById("auto-complete-list");
	resetResult();
	const searchBox = document.getElementById('search-box');
	let keyword = searchBox.value;
	if(keyword==""){		
		return;
	}

	// let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${keyword}&api_key=${YOUR_API_KEY}&format=json`;
	let url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${keyword}&limit=10&api_key=${YOUR_API_KEY}=json`;

	fetch(url)
	  .then((response) => {
		return response.json()
	}).then((json) => {

		let tracks = json.results.trackmatches.track;
		
		tracks.forEach((track)=>{
			const title = document.createElement('button');
			title.innerHTML= track.artist + " " + track.name;
			title.addEventListener('click', (e)=>{
				searchBox.value = e.target.innerHTML;
				document.getElementById("track").value = track.name;
				document.getElementById("artist").value = track.artist;
				autoComplete();
			})
			autoList.appendChild(title);
		})
	}).catch((error) => console.log('error:', error));
}

function showResult(){
	let keyword = document.getElementById('search-box').value;
	// let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${keyword}&api_key=${key.LASTFM_API_KEY}&format=json`;
	let url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${keyword}&limit=10&api_key=${YOUR_API_KEY}`;

	fetch(url)
	  .then((response) => {
		return response.json()
	}).then((json) => {

		let albums = json.results.albummatches.album;
		
		albums.forEach((album)=>{
			const title = document.createElement('p');
			title.innerText= album.name;
			
			const artist = document.createElement('p');
			artist.innerText = album.artist;
			
			doc.appendChild(title);
			doc.appendChild(artist);
		})
		
	}).catch((error) => console.log('error:', error));
}

function resetResult(){
	while ( autoList.hasChildNodes() )
	{
	     autoList.removeChild( autoList.firstChild );       
	}
}
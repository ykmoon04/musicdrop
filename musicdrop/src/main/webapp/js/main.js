const API_KEY = '8a8bcbe4f6e982d827468407a2c547ae';

let url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=7&api_key=${API_KEY}&format=json`;
const gallery = document.getElementById('track-gallery');
const items = gallery.querySelectorAll('.image');
const contents = document.querySelectorAll('.overlay-content');
fetch(url)
	  .then((response) => {
		return response.json()
	}).then((json) => {

		let tracks = json.tracks.track;
		
		let i=0;
		tracks.forEach((track)=>{
			let trackName= track.name;
			let artist = track.artist.name;
			let imgSrc = ""
		
			url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${trackName}&format=json`;
			
			fetch(url).then((response)=>{
				return response.json()
			}).then((json)=>{
				let term = trackName +  " " + artist;
				if(json.track.album != null){
					term = json.track.album.title;
					console.log(term)
				}
					
				url = `https://itunes.apple.com/search?term=${term}&media=music&entity=album&limit=1`
				fetch(url).then((res)=>{
					return res.json()
				}).then((json)=>{
					if(json.resultCount >0 ){
						imgSrc = json.results[0].artworkUrl100;
						imgSrc = imgSrc.replace('100x100bb','1000x1000bb');
						
						items[i].querySelector('img').setAttribute('src',imgSrc);
						contents[i].querySelector('h5').innerHTML = track.name;
						contents[i].querySelector('p').innerHTML= track.artist.name;
						i++;
					}

				})
			})
			

		})
	}).catch((error) => console.log('error:', error));
	
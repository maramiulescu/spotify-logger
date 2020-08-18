import React, {Component} from 'react';
import SpotifyWebApi from "spotify-web-api-js";
import './App.css';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
        spotifyApi.setAccessToken(token);
    }
    this.state = {
        loggedIn: token ? true : false,
        currentTrack: {
            name: '',
            artist: '',
            timestamp: '',
            progress_ms: '',
            duration_ms: '',
            album_art: ''
        },
        previousTrack: {
            name: '',
            artist: '',
            timestamp: '',
            progress_ms: '',
            duration_ms: '',
        }
    }
  }
  getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      e = r.exec(q)
      while (e) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
          e = r.exec(q);
      }
      return hashParams;
  }
  getCurrentTrack() {
      spotifyApi.getMyCurrentPlaybackState()
          .then((response) => {
              this.setState({
                  currentTrack: {
                      name: response.item.name,
                      artist: response.item.artists[0].name,
                      timestamp: response.timestamp,
                      progress_ms: response.progress_ms,
                      duration_ms: response.item.duration_ms,
                      album_art: response.item.album.images[0].url
                  },
                  previousTrack: {
                      name: response.item.name,
                      artist: response.item.artists[0].name,
                      timestamp: response.timestamp,
                      progress_ms: response.progress_ms,
                      duration_ms: response.item.duration_ms
                  }
              });
          })
          .catch((error) => {
              console.log('Error:', error);
          })
  }
  updateCurrentTrack() {
      spotifyApi.getMyCurrentPlaybackState()
          .then((response) => {
              this.setState({
                  currentTrack: {
                      name: response.item.name,
                      artist: response.item.artists[0].name,
                      timestamp: response.timestamp,
                      progress_ms: response.progress_ms,
                      duration_ms: response.item.duration_ms,
                      album_art: response.item.album.images[0].url
                  }
              });
              this.updatePreviousTrack();
          })
          .catch((error) => {
              console.log('Error:', error);
          })
  }
  updatePreviousTrack() {
      if (this.state.currentTrack.name === this.state.previousTrack.name) {
          this.setState({
              previousTrack: {
                  name: this.state.previousTrack.name,
                  artist: this.state.previousTrack.artist,
                  timestamp: this.state.previousTrack.timestamp,
                  progress_ms: this.state.currentTrack.progress_ms,
                  duration_ms: this.state.previousTrack.duration_ms
              }
          });
          console.log('Track is the same, updating previous', this.state.previousTrack);
      } else {
          console.log('Track names differ');
          this.callAPI();
          this.setState({
              previousTrack: {
                  name: this.state.currentTrack.name,
                  artist: this.state.currentTrack.artist,
                  timestamp: this.state.currentTrack.timestamp,
                  progress_ms: this.state.currentTrack.progress_ms,
                  duration_ms: this.state.currentTrack.duration_ms
              }
          })
      }
  }

  callAPI() {
      const logData = {
          name: this.state.previousTrack.name,
          artist: this.state.previousTrack.artist,
          timestamp: this.state.previousTrack.timestamp,
          progress_ms: this.state.previousTrack.progress_ms,
          duration_ms: this.state.previousTrack.duration_ms
      };
      console.log('Updating log', logData);
      fetch('http://localhost:9000/loggerAPI', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(logData)
      }).then(response => response.json())
          .then(data => {
              console.log('Success:', data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
}

  componentDidMount() {
      this.getCurrentTrack();
      this.timer = setInterval(() => this.updateCurrentTrack(), 2000);
  }

  componentWillUnmount() {
      clearInterval(this.timer);
      this.timer = null;
  }

    render() {
    return (
        <div className="App">
            <img src={this.state.currentTrack.album_art} height={850} style={{marginTop: 50}}/>
            <div>
                <p style={{fontSize: 20}}>{this.state.currentTrack.name}</p>
                <p style={{fontSize: 15}}>{this.state.currentTrack.artist}</p>
            </div>
        </div>
    )
  }
}

export default App;
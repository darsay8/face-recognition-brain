import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
    apiKey: 'd7fbe7b63787459db6271b0dfcbf788e'
});

const particlesOptions = {
    particles: {
        number: {
            value: 160,
            density: {
                enable: true,
                value_area: 800
            }
        }

    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        }
    }

    onInputChange = (event) => {
        console.log(event.target.value);
    };

    onButtonSubmit = () => {
        app.models.predict(
            "d7fbe7b63787459db6271b0dfcbf788e",
            "https://samples.clarifai.com/face-det.jpg")
            .then(
            function(response) {
                // do something with response
            },
            function(err) {
                // there was an error
            }
        );
    };

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particlesOptions}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition />


            </div>
        );
    }
}

export default App;

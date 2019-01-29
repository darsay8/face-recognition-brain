import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import './App.css';


const app = new Clarifai.App({
    apiKey: 'd7fbe7b63787459db6271b0dfcbf788e'
});

// PARTICLES BG
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
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false
        }
    }

    /*// FETCH API
    componentDidMount() {
        fetch('http://localhost:3001/')
            .then(response => response.json())
            .then(data => console.log(data));
    }*/

    // CALCULATE FACE LOCATION
    calculateFaceLocation = (data) => {

        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)

        }
    };

    // DISPLAY FACE BOX
    displayFaceBox = (box) => {
        this.setState({box: box});
    };

    // INPUT IMAGE LINK
    onInputChange = (event) => {
        this.setState({input: event.target.value})
    };

    // SUBMIT IMAGE LINK
    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
                .catch(err => console.log(err)));
    };

    // ROUTE CHANGE
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    };

    render() {
        const {isSignedIn, imageUrl, route, box} = this.state;
        return (
            <div className="App">
                <Particles className='particles' params={particlesOptions}/>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home'

                    ?
                    <div>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                    :
                    (
                        route === 'signin'
                            ? <SignIn onRouteChange={this.onRouteChange}/>
                            : <Register onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;

import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

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

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
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
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    /*// FETCH API
    componentDidMount() {
        fetch('http://localhost:3001/')
            .then(response => response.json())
            .then(data => console.log(data));
    }*/

    // LOAD USER
    loadUser = (userData) => {
        this.setState({
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                entries: userData.entries,
                joined: userData.joined
            }
        })
    };

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
    onPictureSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch('http://localhost:3001/image-url', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('http://localhost:3001/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(
                                this.state.user, {entries: count}))
                        })
                        .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    };
    // ROUTE CHANGE
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
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
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onPictureSubmit={this.onPictureSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                    :
                    (
                        route === 'signin'
                            ? <SignIn
                                loadUser={this.loadUser}
                                onRouteChange={this.onRouteChange}
                            />
                            : <Register
                                loadUser={this.loadUser}
                                onRouteChange={this.onRouteChange}
                            />
                    )
                }
            </div>
        );
    }
}

export default App;

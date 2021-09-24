import { useEffect, useState } from 'react'
import 'regenerator-runtime/runtime'
import axios from 'axios'

import Clarifai from 'clarifai'
import Particles from 'react-particles-js'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import Rank from './components/Rank'
import ImageLinkForm from './components/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition'
import SignIn from './components/SignIn'
import Register from './components/Register'

import { particlesOptions } from './utils/particlesOptions'

const App = () => {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState({})

  const loadUser = (userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined,
    })
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
  }

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const onButtonSubmit = () => {
    setImageUrl(input)

    const optionsImageUrl = {
      url: '/api/image-url',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        input: input,
      },
    }

    const optionsImage = {
      url: '/api/image',
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      data: {
        id: user.id,
      },
    }

    axios(optionsImageUrl)
      .then((response) => response.data)
      .then((response) => {
        if (response) {
          axios(optionsImage)
            .then((response) => response.data)
            .then((count) => {
              setUser({ ...user, entries: count })
            })
            .catch(console.log)
        }
        displayFaceBox(calculateFaceLocation(response))
      })
      .catch((err) => console.log(err))
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setInput('')
      setImageUrl('')
      setBox({})
      setRoute('signin')
      setIsSignedIn(false)
      setUser({})
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }

  return (
    <>
      <div className="App">
        <Particles className="particles" params={particlesOptions} />

        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

        {route === 'home' ? (
          <div>
            <Logo />
            <div className="container">
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          </div>
        ) : route === 'signin' ? (
          <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
        ) : (
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )}
      </div>
    </>
  )
}

export default App

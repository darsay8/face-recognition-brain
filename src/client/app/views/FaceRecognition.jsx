import { useState } from 'react'
import Clarifai from 'clarifai'
import axios from 'axios'

import Logo from '../components/Logo'
import Rank from '../components/Rank'
import ImageLinkForm from '../components/ImageLinkForm'
import FaceRecognitionImage from '../components/FaceRecognitionImage'

import useUser from '../hooks/useUser'

const FaceRecognition = () => {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})

  const { user, setUser } = useUser()
  const signedUser = JSON.parse(user)

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
    const token = localStorage.getItem('token')

    const optionsImageUrl = {
      url: '/api/image-url',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      data: {
        input: input,
      },
    }

    const optionsImage = {
      url: '/api/image',
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id: signedUser.id,
      },
    }
    axios(optionsImageUrl)
      .then((response) => response.data)
      .then((response) => {
        if (response) {
          axios(optionsImage)
            .then((response) => response.data)
            .then((count) => {
              console.log('count', count)
              console.log('user', user)
              // setUser({ ...signedUser, entries: count })
            })
            .catch(console.log)
        }
        displayFaceBox(calculateFaceLocation(response))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <Logo />
      <Rank user={signedUser} />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognitionImage box={box} imageUrl={imageUrl} />
    </div>
  )
}

export default FaceRecognition

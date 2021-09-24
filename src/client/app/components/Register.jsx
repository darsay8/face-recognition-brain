import { useState } from 'react'
import axios from 'axios'

const Register = ({ loadUser, onRouteChange }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitRegister = () => {
    const optionsRegister = {
      url: '/register',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: name,
        email: email,
        password: password,
      },
    }

    axios(optionsRegister)
      .then((response) => response.data)
      .then((user) => {
        if (user.id) {
          loadUser(user)
          onRouteChange('home')
        }
      })
  }

  return (
    <div className="registerForm mt3">
      <article className="br3 dark-gray shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 white">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmitRegister}
                className="b ph3 pv2 input-reset bg-blue white grow pointer f4 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    </div>
  )
}

export default Register

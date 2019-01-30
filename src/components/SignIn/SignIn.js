import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    };

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    };

    render() {
        const {onRouteChange} = this.props;
        return (
            <div className='signInForm mt3'>
                <article className="br3 dark-gray shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 white">
                                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset w-100"
                                           type="email"
                                           name="email-address"
                                           id="email-address"
                                           onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset w-100"
                                           type="password"
                                           name="password"
                                           id="password"
                                           onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input onClick={this.onSubmitSignIn}
                                       className="b ph3 pv2 input-reset bg-blue white grow pointer f4 dib"
                                       type="submit"
                                       value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')}
                                   className="f5 link white db grow pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default SignIn;
import React from 'react';
import './signin.css'

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = { signinEmail : "", signinPassword : ""};
    }


    onEmailChange = (event) => {
        this.setState({ signinEmail : event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ signinPassword : event.target.value });
    }

    onSubmitChange = () => {

        fetch("https://ancient-retreat-61866.herokuapp.com/signin", {
            method : "post",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                email : this.state.signinEmail,
                password : this.state.signinPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                this.props.loadUser(data)
                this.props.onRouteChange('home')
            }
        })

        
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
                <main className="pa4 black-80">
                    <div className="measure" style={{textAlign : "center"}}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="f1 db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="f1 db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitChange} className="f1 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={ () => onRouteChange("register")} className="f1 f6 link dim black db pointer">Register</p>
                            {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;
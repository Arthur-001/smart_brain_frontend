import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onSubmitRegister = (event) => {
        event.preventDefault(); //! Prevent default form submission and stop refreshing the WHOLE page after submition
        //! fetch by default does a GET request but we want to do a POST request when sending sensitive data
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {"Content-Type": "application/json"}, //! header accepts an object. because of `-` we have to wrapt the content-type inside of a quotation mark.
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })  //! we can NOT send the data to the backend through JavaScript so we have to convert it into something else
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) { //! if we get a user it will be true
                this.props.loadUser(user);
                this.props.onRouteChange('signin');
            } else if (user === 'password is weak') {
                alert(`Password must be at least 8 digits with at least:
    ● 1 Uppercase letter
    ● 1 Lowercase letter
    ● 1 Number
    ● 1 Special character
                `)
            }
            else {
                alert("Fill all the forms")
            }
        })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main style={{ background: "white", width: "100%" }} className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="email-address"
                                    onChange = {this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="register-email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="register-email-address"
                                    id="register-email-address"
                                    onChange = {this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange = {this.onPasswordChange}
                                />
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default Register;

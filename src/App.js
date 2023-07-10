import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logos/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from './components/particles/Particles';
import { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin', //* to keep track of user on the page
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

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  };

  //! conncect the FrontEnd to BackEnd
  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log); //or data => console.log(data)

      // .then(data => {
      //   const dataBase = data;
      //   this.setState({ dataBase });
      // })
  // }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value });
  }

  calculateFaceLocation = data => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    if (data) {
      const clarifaiFace = data;
      // console.log(clarifaiFace);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    } else {
      console.error('data or data.outputs is undefined');
    }
  }

  displayFaceBox = (box) => {
    console.log("box object is: ", box);
    this.setState({ box: box });
  }
  
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    // console.log('click');
    const IMAGE_URL = this.state.input;
    // console.log(fetchAPI(PAT, USER_ID, APP_ID, MODEL_ID, MODEL_VERSION_ID, IMAGE_URL))
    
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        IMAGE_URL: IMAGE_URL
      })
    })
    .then(response => response.json())
    .then(object => {
      if (object) {
          fetch('http://localhost:3000/image', { //! fetch accept two parameters first one is the ip address of the server we want to fetch from and the second one is an object that specify what kind of request (POST, PUT ...) we want to do
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(prevState => ({
              user: {
                ...prevState.user,
                entries: count
              }
            }));
          })
          .catch(console.log)
        }
        if(object.left_col)
          this.displayFaceBox(this.calculateFaceLocation(object));
      })
      .catch(error => console.log('error', error));

    //   .then(count => {
    //     this.setState(Object.assign(this.state.user, { entries: count }))
    //   })
    //   .catch(console.log)
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
      this.setState({ route: 'signin' });
      this.setState({ imageURL: '' })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
      this.setState({ route: route });
    } else {
      this.setState({ route: route });
    }
  }

  render() {
    //* destructuring:
    const { isSignedIn, route, imageURL, box } = this.state;
    return (
      <div className="App">
        <Particles />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home' ?
            <div>  {/* we have to return a div if we have multiple tags */}
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageURL={imageURL} />
            </div>
            :
            (
              route === 'signin' ?
                <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                :
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import FaceRecognitionApp from "./components/FaceRecognitionApp/FaceRecognitionApp";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Particles from "react-particles-js";
// import Clarifai from 'clarifai';



const particlesOption = {
	"particles": {
		"number": {
			"value": 55
		},
		"size": {
			"value": 3
		}
	},
	"interactivity": {
		"events": {
			"onhover": {
				"enable": true,
				"mode": "repulse"
			}
		}
	}
}

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
}

class App extends React.Component {
	constructor() {
		super();
		this.state =initialState
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
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const inputImage = document.getElementById('inputimage');
		const width = Number(inputImage.width);
		const height = Number(inputImage.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFace = (box) => {
		console.log(box)
		this.setState({ box: box });
	}

	onBtnSubmit = () => {
		this.setState({ imageUrl: this.state.input })
		fetch('https://boiling-inlet-84097.herokuapp.com/imageurl', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					input: this.state.input
				})
			})
			.then(response => response.json())
			.then(response => {
				if (response) {
					fetch('https://boiling-inlet-84097.herokuapp.com/image', {
							method: 'put',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								id: this.state.user.id
							})
						})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, { entries: count }))
						})
						.catch(console.log())
				}
			
				this.displayFace(this.calculateFaceLocation(response))
			})
			.catch(error => console.log(error));
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState)
		}
		else if (route === 'home') {
			this.setState({ isSignedIn: true })
		}
		this.setState({ route: route })
	}
	render() {
		return (
			<div className="App" >
				<Particles className="particles" params={particlesOption} />
				<Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
				{
					this.state.route === 'home'
						?<div>
							<Logo />
							<Rank name={this.state.user.name} entries = {this.state.user.entries} />
							<ImageLinkForm
								onInputChange={this.onInputChange}
								onBtnSubmit={this.onBtnSubmit}
							/>
							<FaceRecognitionApp box={this.state.box} imageUrl={this.state.imageUrl} />
						</div>
						: (
							this.state.route === 'signin'
								? < Signin loadUser ={this.loadUser} onRouteChange={this.onRouteChange} />
								: < Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
						)

				}

			</div>
		);
	}
}

export default App;
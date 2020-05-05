import React  from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import FaceRecognitionApp from "./components/FaceRecognitionApp/FaceRecognitionApp";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: "9b9af68598514ccd8bb7e886d96ae376",
});

const particlesOption={
	    "particles": {
	        "number": {
	            "value": 60
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
  
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {}
		}
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
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL,
				this.state.input)
			.then(response => this.displayFace(this.calculateFaceLocation(response)))
			.catch(error => console.log(error));
	  } 
	render() {
	  return (
			<div className = "App" >
					<Particles className="particles" params={particlesOption} />
					<Navigation />
					<Logo />
					<Rank />
			        <ImageLinkForm
						onInputChange={this.onInputChange}
				        onBtnSubmit={this.onBtnSubmit} 
			         />
			         <FaceRecognitionApp box={this.state.box} imageUrl={this.state.imageUrl}/>
			</div>
  );
 }
}

export default App;

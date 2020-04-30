import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import SignIn from './components/SignIn/signin';
import Register from './components/Register/register';

const particleOptions = {
    particles: {
        number: {
            value: 250,
            density: {
                enable: true,
                value_area: 600
            }
        }
    }
}

const app = new Clarifai.App({
    apiKey: '978e5fea59d1408b877dc06bcf19a61e'
   });

   const initialState = { inputVal: "" , 
            imgUrl : "", 
            box : [], 
            gender : "", 
            route : "signin", 
            isSignedIn : false,
            user : {
                id : "",
                name : "",
                email : "",
                password : "",
                entries : 0,
                joined : ""
            }
}

class App extends React.Component {

    constructor() {
        super();
        this.state = initialState;

    }

    loadUser = (data) => {
        this.setState({
            user : {
                id : data.id,
                name : data.name,
                email : data.email,
                password : data.password,
                entries : data.entries,
                joined : data.joined
            }
        })

        // console.log(this.state.user)
    }

    onInputChange = event => {
        this.setState({ inputVal: event.target.value })
    }

    findImageBox = (data, i, gen) => {

        this.setState({gender : gen})
        console.log(this.state.gender)

        let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
        // console.log(data.outputs[0].data.regions)
     
        let image = document.getElementById('inputImage');
        let width = Number(image.width);
        let height = Number(image.height);

        // console.log(clarifaiFace)
        // console.log(typeof(width))
        return {
            leftCol : clarifaiFace.left_col * width,
            rightCol : width - (clarifaiFace.right_col * width),
            topRow : clarifaiFace.top_row * height,
            bottomRow : height - (clarifaiFace.bottom_row * height),
            genderName : this.state.gender
        }
    }


   

    displayImageBox = (box) => {
        this.setState({ box : [ ...this.state.box, box ]})
        // console.log(box)
    }



    onSubmitChange = () => {
        this.setState({ imgUrl : this.state.inputVal, box : []})
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.inputVal).then(
            response => {
                // for (let i = 0; i < response.outputs[0].data.regions.length; i++) {
                //     this.displayImageBox(this.findImageBox(response , i))
                // }
            }
    ,
    err => console.log(err)
  );




  

  app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", this.state.inputVal).then(
    response => {
        if (response) {
            fetch("https://ancient-retreat-61866.herokuapp.com/image", {
            method : "put",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                id : this.state.user.id
            })
        }) .then(res => res.json())
            .then(count => {
                this.setState(Object.assign(this.state.user, { entries : count}))
            })
        }

        let max = 0, idx_i = -1;
        let gen = "";
    
        let res = response.outputs[0].data.regions;
        for (let k = 0; k < res.length; k++) {
            for (let i = 0; i < res[k].data.concepts.length; i++) {
                    max = Math.max(max, res[k].data.concepts[i].value)
                    if (res[k].data.concepts[i].value == max) {
                        idx_i = i;
                    }
            }
            
            gen = res[k].data.concepts[idx_i].name;

            if (gen === "masculine")
                gen = gen.replace("masculine","M")
            else if (gen === "feminine")
                gen =  gen.replace("feminine", "F");

            this.displayImageBox(this.findImageBox(response , k, gen))
                       
        }

    },
    function(err) {
      // there was an error
    }
  );
    }

onRouteChange = (route) => {
    if (route === 'signout'){
        this.setState(initialState)
        this.setState({ route : 'signin' })
        return;
    } else if (route === 'home') {
        this.setState({isSignedIn : true})
        
    }
    this.setState({ route : route })
    
}

    render() {
        return (
            <div className="App">
                {/* <Particles className="particles"
                    params={particleOptions}
                /> */}

                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
                {this.state.route === 'home'
                
                ?
                    <div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries} />
                    <ImageLinkForm
                        onInputChange={this.onInputChange}
                        onSubmitChange={this.onSubmitChange}
                    />
                    <FaceRecognition gender={this.state.gender} box={this.state.box} imgUrl={this.state.imgUrl}/>
                    </div>

                :
                    (this.state.route === 'signin' ? 
                        <div>
                            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                            <Logo />
                        </div>
                    :   
                        <div>
                            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                            <Logo />
                        </div>
                    )
            }
            </div>
        );
    }
}

export default App;
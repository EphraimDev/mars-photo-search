import React from 'react';
import { Col, Form, FormGroup, Label, Input, Card, CardImg } from 'reactstrap';
import Axios from 'axios';
import './App.css';
import Progress from './Progress';
import { validateForm } from './Validate';

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      sol: '',
      camera: '',
      errorMessage: '',
      result: []
    };
  }

  handleChange(evt) {
    evt.preventDefault();
    let target = evt.target;
    this.setState({
      [target.name]: target.value
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    document.getElementById("field-error").style.display = "none";
    document.getElementById("spinner").style.display = "block";
    document.getElementById("mars-container").style.marginTop = "0px";
    document.getElementById("photos").style.display = "none";
    const target = this.state;
    let data = {
      sol: target.sol,
      camera: target.camera
    }

    const validate = await validateForm(data);

    if (!!validate) {
        document.getElementById("spinner").style.display = "none";
        return validate
    }else{
      console.log(data.camera)
        const photoSearch = await Axios.get(`https://larastart-eph.herokuapp.com/api/v1/search?sol=${data.sol}&camera=${data.camera}`);
        
        if(photoSearch.status === 200){
          document.getElementById("spinner").style.display = "none";
          if(photoSearch.data.message === "No photos"){
            document.getElementById("field-error").style.display = "block";
            this.setState({
              errorMessage: 'No image for the selected options'
            })
          }else{
            document.getElementById("mars-container").style.marginTop = "-50px";
            this.setState({
              result: photoSearch.data.photos
            });
            document.getElementById("photos").style.display = "block";
          }
          
        }else{
          document.getElementById("spinner").style.display = "none";
          document.getElementById("field-error").style.display = "block";
          this.setState({
              errorMessage: 'Request was not successful, please try again'
          })
        }
    }
  }

  renderResult() {
    return this.state.result.map((data, index) => {
       return (
        <div key={data.id} className="col-sm-4 card-image">
          <Card>
            <CardImg top width="100%" src={data.img_src} alt="mars image" />
          </Card>
        </div>
       )
    })
 }

  render(){
  
    let state = this.state,
    errorMessage = state.errorMessage;
  return (
    <div className="App">
      <section className="mars-container" id="mars-container">
        <div className="wrap-mars">
          <h4>Mars Photo Search</h4>
        <Form className="mars-form">
          <span id="spinner" style={{display: "none", textAlign: "center"}}><Progress/></span>
          <span className="text-danger" id="field-error">{errorMessage}</span>
          <FormGroup row>
            <Label for="sol" sm={3}>Sol</Label>
            <Col sm={9}>
              <Input
              type="text"
                name="sol"
                id="sol" 
                onChange={evt => this.handleChange(evt)}
                placeholder="Enter a number between 0 and 1000"
                />
              <span id="sol-error" style={{display: "none", color: "red"}}>Enter a number between 0 and 1000</span>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="camera" sm={3}>Camera</Label>
            <Col sm={9}>
              <Input type="select" name="camera" id="camera" onChange={evt => this.handleChange(evt)}>
                <option defaultValue>Select a camera</option>
                <option value="FHAZ">Front Hazard Avoidance Camera</option>
                <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                <option value="MAST">Mast Camera</option>
                <option value="CHEMCAM">Chemistry and Camera Complex</option>
                <option value="MAHLI">Mars Hand Lens Imager</option>
                <option value="MARDI">Mars Descent Imager</option>
                <option value="NAVCAM">Navigation Camera</option>
              </Input>
                <span id="camera-error" style={{display: "none", color: "red"}}>Select a camera</span>
            </Col>
          </FormGroup>
          
          <FormGroup className="mars-btn">
            <Col sm={{ size: 10, offset: 2 }} className="wrap-btn">
              <div className="mars-btn-wrap"></div>
              <button className="mars-form-btn" onClick={e => this.onSubmit(e)}>Find Photos</button>
            </Col>
          </FormGroup>
        </Form>
        </div>
      </section>
      <section id="photos">
        {this.renderResult()}
      </section>
    </div>
  );
  }
}

export default App;

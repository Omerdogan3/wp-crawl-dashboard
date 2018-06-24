import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";

import {myWebsites} from '../../myData/myWebsites';

class MyWebsites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myWebsites: [],
      fetched: false
    }
    this.removeWebsite = this.removeWebsite.bind(this);
    this.displayWebsites = this.displayWebsites.bind(this);
}
  


  componentDidMount(){
    this.setState({
      myWebsites,
      fetched: true
    });
    
  }

  addWebsiteInput(){
    return  <Row>
    <Col xs={9}>
      <FormInputs 
        ncols={["col-md-12"]}
        proprieties={[
          {
            label: "Add New Website",
            type: "text",
            bsClass: "form-control",
            placeholder: "Website Adress",
            defaultValue: ""
          }
        ]}
      />
    </Col>

    <Col style={{marginTop: 20}} componentClass={ControlLabel} xs={3}>
      <Button fill round>
          Add 
      </Button> 
    </Col>
    </Row>
  }


  removeWebsite(event){
    var array = myWebsites;
    array.splice(event.currentTarget.dataset.id, 1);
    this.setState({
      myWebsites: array
    });
  }

  displayWebsites(){
    return <div>
      {this.state.myWebsites.map((item,index)=>{
        return <div key={index}> 
          <Row>
          <Col xs={9}>
            <FormInputs 
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: index+1,
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Website Adress",
                  defaultValue: item.name
                }
              ]}
            />
          </Col>
      
          <Col style={{marginTop: 20}} componentClass={ControlLabel} xs={3}>
            <Button key={index} data-id={index} fill onClick={this.removeWebsite}>
                Remove 
            </Button> 
          </Col>                        
        </Row>    
      </div>
        
    })}
    {this.addWebsiteInput()}
    </div>
  }


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="My Websites"
                content={
                  this.displayWebsites()
                }
              /> 
              
              

            </Col>
            
            <Col md={4}>
              
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MyWebsites;

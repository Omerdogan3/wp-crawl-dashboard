import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
	FormControl,
	DropdownButton,
	MenuItem,
	Alert
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";
import axios from 'axios';

class Importer extends Component {
	constructor(props){
    super(props);
    this.state = {
			selectedWebsite:'',
			inputWebsite: '',
			inputDisabled: false,
			isAlert: false
		};
	}

	// =======================Handlers=======================
	selectedWebsite = (item) => {
		this.setState({
			selectedWebsite: item
		})
	}

	handleInputValue = (event) => {
    this.setState({inputWebsite: event.target.value});
	}
	
	_handleKeyPress = (event) => {
		if(event.key === 'Enter'){
			this.importable()
		}
	}
	// =======================Handlers=======================

	displayAlert = () => {
		return (
			this.state.isAlert ? 
			<Alert bsStyle="danger">
				<span>Please Enter A valid Adress</span>
			</Alert> : null
		)
	}

	importable = () => {
		if(this.state.selectedWebsite !== '' && this.is_url(this.state.inputWebsite)){
			//Set state yerine api cagirirken replace edilmis halini cagir.	
			this.setState({
				inputWebsite: this.state.inputWebsite.replace(/(^\w+:|^)\/\//, ''),
				isAlert: false
			})
		}else{
			this.setState({
				isAlert: true
			})	
		}
	}


	is_url =(str) =>{
  	const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
			if (regexp.test(str)){
				
				return true;
			}else{
				
				return false;
			}
	}

  render() {	
		const aimWebsites = [
			"yoldaolmak.com",
			'techcrunch.com',
			'webrazzi.com',
			"otopark.com",
			"ekonomist.co",
			"blog.adimsay.com",
			"www.bankablog.com",
			"chrislema.com",
			"theinspirationblog.net",
			"garyvaynerchuk.com",
			"www.copyblogger.com",
			"hwp.com.tr",
			"limenya.com"
		]

		const myWebsites = [
			"paracepte.net",
			"sporttr.org",
			"wikiistanbul.com",
			"bir10.com",
			"nolur.net",
		]


		const apiAdress = "https://wpcrawlapi.herokuapp.com/nolur.net/webrazzi.com/7/1";


    return (
      <div className="content">
        <Grid fluid>
					<Row>
						<Col md={4}>
							<h1>{this.state.selectedWebsite}</h1>
							<form>
									<FormControl type="text" onChange={this.handleInputValue} onKeyPress={this._handleKeyPress} placeholder="Input Website" value={this.state.inputWebsite}/>
							</form>
							
							{this.displayAlert()}
							
							<DropdownButton
									bsStyle="default"
									title={this.state.selectedWebsite === '' ? "Website":this.state.selectedWebsite}
									key={0}
									id={`dropdown-basic-${0}`}
								>{	
									myWebsites.map((item, i) => {
										return <MenuItem  onClick={() => this.selectedWebsite(item)} key={i} eventKey={i}>{item}</MenuItem>
									})
								}
							</DropdownButton>	
							
							<Button onClick={this.importable} type="submit">Submit</Button>
						</Col>
			
						<Col md={8}>
							<Card
								title="Importer"
								content={
									<FormGroup controlId="formControlsTextarea">
										<ControlLabel>Wordpress Importer</ControlLabel>
										<FormControl
											rows="5"
											componentClass="textarea"
											bsClass="form-control"
											placeholder="Here can be your description"
											defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
										/>
									</FormGroup>
									}
							/>
						</Col>
					</Row>
        </Grid>
      </div>
    );
  }
}

export default Importer;

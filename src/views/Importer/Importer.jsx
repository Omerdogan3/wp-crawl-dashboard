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

import { Tasks } from "components/Tasks/Tasks.jsx";


import {myWebsites} from '../../myData/myWebsites';
import checkIfValidInput from '../../helpers/checkIfValidInput';

const util = require('util');

class Importer extends Component {
	constructor(props){
    super(props);
    this.state = {
			selectedWebsite:'',
			inputWebsite: '',
			inputDisabled: false,
			isAlert: false,
			isRequested: false,
			howMany: '',
			padding: '',
			importedWebsites: []
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

	handleHowMany = (event) => {
    this.setState({howMany: event.target.value});
	}

	handlePadding = (event) => {
    this.setState({padding: event.target.value});
	}
	
	_handleKeyPress = (event) => {
		if(event.key === 'Enter'){
			this.importable()
		}
	}
	// =======================Handlers=======================

	componentDidMount = () => {
		
	}

	displayAlert = () => {
		return (
			this.state.isAlert ? 
			<Alert bsStyle="danger">
				<span>Please Enter A valid Adress</span>
			</Alert> : null
		)
	}

	importable = () => {
		if(checkIfValidInput(this.state.selectedWebsite, this.state.inputWebsite, this.state.howMany, this.state.padding)){
			//Set state yerine api cagirirken replace edilmis halini cagir.	
			this.setState({
				inputWebsite: this.state.inputWebsite.replace(/(^\w+:|^)\/\//, ''),
				isAlert: false
			},()=>{
				// this.makeRequest();
				this.insertRequests(0)
			})
		}else{
			this.setState({
				isAlert: true
			})	
		}
	}

	insertRequests = (i) => {
		let padding = parseInt(this.state.padding) + parseInt(i);
		if(i< this.state.howMany) {
			this.makeRequest(padding, (result)=>{
				console.log(padding);
				this.insertRequests(i+1);
			});
		}else{
			console.log("Done!")
		}
	};

	makeRequest = async (padding) => {
		this.setState({
			isRequested: true
		})
		axios.get(util.format('https://wpcrawlapi.herokuapp.com/%s/%s%s/%s', 
				this.state.selectedWebsite , this.state.inputWebsite, 1, padding
			))
		.then((response) => {
			var newArray = this.state.importedWebsites.slice();    
			newArray.push(response.data.title);   
			this.setState({
				importedWebsites:newArray,
				isRequested: false
			})
			console.log(this.state.importedWebsites);
			console.log(util.format('https://wpcrawlapi.herokuapp.com/%s/%s%s/%s', 
			this.state.selectedWebsite , this.state.inputWebsite, this.state.howMany, padding
		));
		}).catch(function (error) {
			console.log(error);
		});
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

	
		const apiAdress = "https://wpcrawlapi.herokuapp.com/";

	  return (
      <div className="content">
        <Grid fluid>
					<Row>
						<Col md={5}>
							<h1>{this.state.selectedWebsite}</h1>
							<form>
									<FormControl type="text" onChange={this.handleInputValue} onKeyPress={this._handleKeyPress} placeholder="Input Website" value={this.state.inputWebsite}/>
							</form>

							<Col md={6}>
							<form>
									<FormControl type="number" onChange={this.handleHowMany} placeholder="How Many Content?" value={this.state.howMany}/>
							</form>
							</Col>

							<Col md={6}>
							<form>
									<FormControl type="number" onChange={this.handlePadding} placeholder="Padding" value={this.state.padding}/>
							</form>
							</Col>
							
							<br/>
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
							
							<Button disabled={this.state.isRequested} onClick={this.importable} type="submit">Submit</Button>
						</Col>

						
			
					<Col md={7}>
						<Card
							title="Successfuly Imported"
							category="Successfuly imported posts will be displayed in here."
							stats="Everything Seems OKAY!"
							statsIcon="fa pe-7s-like2"
							content={
								<div className="table-full-width">
									<table className="table">
										<Tasks importedWebsites={this.state.importedWebsites}/>
									</table>
								</div>
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

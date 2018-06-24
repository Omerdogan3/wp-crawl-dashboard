import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
	FormControl,
	DropdownButton,
	MenuItem,
	Alert
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import { Tasks } from "components/Tasks/Tasks.jsx";
import {myWebsites} from '../../myData/myWebsites';
import checkIfValidInput from '../../helpers/checkIfValidInput';

import {importedToday} from '../../myData/myWebsites';

const util = require('util');

class Importer extends Component {
	constructor(props){
    super(props);
    this.state = {
			selectedWebsite:'',
			inputWebsite: '',
			inputDisabled: false,
			isAlert: false,
			isDone: false,
			isRequested: false,
			howMany: '',
			padding: '',
			importedWebsites: [],
			responseToDisplay: ''
		};
	}

	// =======================Handlers=======================
	selectedWebsite = (item) => {
		this.setState({
			selectedWebsite: item
		})
	}

	clearItems = (event) =>{
		this.setState({importedWebsites: []});
	}

	displayDone = () => {
		return (
			this.state.isDone ? 
			<Alert bsStyle="success">
				<span>Imported Successfuly!</span>
			</Alert> : null
		)
	}

	displayAlert = () => {
		return (
			this.state.isAlert ? 
			<Alert bsStyle="danger">
				<span>Please Enter A valid Adress</span>
			</Alert> : null
		)
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
		let padding = parseInt(this.state.padding,10) + parseInt(i,10);
		if(i < this.state.howMany) {
			this.makeRequest(padding, (result)=>{
				
				this.insertRequests(i+1);
			});
		}else{
			this.setState({
				isDone: true
			})
		}
	};

	makeRequest = (padding, callback) => {
		this.setState({
			isRequested: true,
			isDone: false
		})
		axios.get(util.format('https://wpcrawlapi.herokuapp.com/%s/%s/%s/%s', 
			this.state.selectedWebsite , this.state.inputWebsite, padding, 1
		)).then((response) => {
			var newArray = this.state.importedWebsites.slice();  
			if(response.data.title){
				newArray.push(response.data.title); 
			}else{
				newArray.push("Imported Without Thumbnail");
			}  
			this.setState({
				importedWebsites:newArray,
				isRequested: false,
			})
			// console.log(this.state.importedWebsites)
			console.log(util.format('https://wpcrawlapi.herokuapp.com/%s/%s/%s/%s', 
			this.state.selectedWebsite , this.state.inputWebsite, padding, 1));
			callback(padding);
		}).catch(function (error) {
			console.log(error);
			callback(padding);
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
							{this.displayDone()}
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
										return <MenuItem  onClick={() => this.selectedWebsite(item.name)} key={i} eventKey={i}>{item.name}</MenuItem>
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
						<Button onClick={this.clearItems}>Clear</Button>
						
					</Col>
					</Row>

					<Row>
						{this.state.responseToDisplay}
					</Row>
        </Grid>
      </div>
    );
  }
}

export default Importer;

const isUrl = require('./isUrl');

module.exports = function checkIfValidInput(selectedWebsite, inputWebsite, howMany, padding){
	console.log(inputWebsite);
	if(selectedWebsite !== '' &&  isUrl(inputWebsite)	&& (howMany !== (''|| 0)) && (padding !== ('' || 0))){
		return true;
	}else{
		return false;
	}
}
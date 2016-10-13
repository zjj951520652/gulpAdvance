var date = require("../commom/utils/dataUtil.js");

function say(msg){
	console.log(date.getDate());
	return "say list" + msg;
}

module.exports=say;
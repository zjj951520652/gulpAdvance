var date = require("../commom/utils/dataUtil.js");

function Detail(){}

Detail.prototype={
	constructor:Detail,
	say:function(msg){
	console.log(date.getDate());
	return "show detail" + msg;
	}
}

module.exports= Detail;
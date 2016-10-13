var DateUtil={
	getDate:function(){
		return new Date().toLocaleDateString();
	}
}

module.exports = DateUtil;    //接口暴露;

console.log("DateUtil is required");

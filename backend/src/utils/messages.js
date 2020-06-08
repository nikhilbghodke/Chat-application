const generateMessage= function(sender,msg){
	var options = {hour:"2-digit",minute:"2-digit", second:"2-digit", weekday: 'long' };
	var today  = new Date();

	var time=today.toLocaleDateString("hi-IN", options);
	return {
		sender,
		text:msg,
		time
	}
}


module.exports={
	generateMessage:generateMessage
}
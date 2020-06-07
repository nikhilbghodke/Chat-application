var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nikhilghodke12101999@gmail.com',
    pass: 'Pradip@12'
  }
});

var mailOptions = {
  from: 'nikhilghodke12101990@gmail.com',
  to: 'nikhilghodke1210@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

var send=async function(to,msg){
  var mailOptions = {
    from: 'nikhilghodke12101990@gmail.com',
    to: to,
    subject: 'Invitation to Join Chat App',
    text: msg.sender+" has invited to join "+msg.roomName+" room on Chat Application"
  };
  const ans=await transporter.sendMail(mailOptions);
  console.log(ans)
}
module.exports=send
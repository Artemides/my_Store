const nodemailer= require('nodemailer');
const boom= require('@hapi/boom');
const {config}=require('../config/config');
const userService=require('../services/user.services');
const jwt=require('jsonwebtoken');
const service= new userService();
class MailService{
    async sendMailPasswordReset(email){
        const user= await service.findByEmail(email);
        if(!user){
            throw boom.unauthorized();
        }
        const payload={
            sub:user.id
        }
        const token=jwt.sign(payload,config.jwtSecret,{expiresIn:'15min'});
        const link=`https://frontend.com/reset-password?token=${token}`;
        await service.update(user.id,{recoveryToken:token});
        const mail={
            from: config.emailAcc,
            to: user.email,
            subject: `Email de restauración de contraseña`,
            text: "Here you can restore your password",
            html: `<b>Ingresar a: ${link}</b>`,
        }
        const response=await this.sendMail(mail);
        return response;
    }

    async sendMail(mail){
        
        let transporter=nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure:true,
            auth: {
                user: config.emailAcc,
                pass: config.emailPass,
            }
        });
        await transporter.sendMail(mail);
        return ({
            message: "mail sent"
        })
    }
    
}
module.exports=MailService;
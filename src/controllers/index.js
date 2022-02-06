import configureUserController from "./userController";

const configure=(app)=>{
    console.log('configure')
    configureUserController(app);
}

export default configure;
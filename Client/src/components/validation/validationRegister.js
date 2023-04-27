const validationRegister = (userData) => {
    const errors = {};

    if(!userData.name){
        errors.name = "Enter an name."
    };
    if(!userData.lastname){
        errors.lastname = "Enter an lastname."
    };
    
    if(!/\S+@\S+\.\S+/.test(userData.email)){
        errors.email = 'Please check your email.'
    };
    if(!userData.email){
        errors.email = "Enter an email."
    };
    if(userData.email.length > 35){
        errors.email = "The email exceeds 35 characters."
    };

    if(!/.*\d+.*/.test(userData.password)){
        errors.password = 'It has to have at least one number.'
    }
    if(userData.password.length < 6 || userData.password.length > 10){
        errors.password = "It has to have 6 to 10 characters."
    }

    return errors;
};

export default validationRegister;
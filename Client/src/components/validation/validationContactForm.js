const validationContact = (contactForm) => {
    const errors = {};

    if(!contactForm.name){
        errors.name = "Enter an name."
    };

    if(!/\S+@\S+\.\S+/.test(contactForm.email)){
        errors.email = 'Please check your email.'
    };
    if(!contactForm.email){
        errors.email = "Enter an email."
    };
    if(contactForm.email.length > 35){
        errors.email = "The email exceeds 35 characters."
    };

    if(!contactForm.message){
        errors.message = "Enter an message."
    };
    if(contactForm.message.length > 255){
        errors.message = "Exceeded characters"
    };

    return errors;
};

export default validationContact;
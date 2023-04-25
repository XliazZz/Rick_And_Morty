const users = require("../utils/users");

const login = (req, res) => {
    const { email, password } = req.query;

    const user = users.find((user) => user.email === email && user.password === password);

    if(user){
        return res.status(200).json({access: true})
    }
    else{
        return res.status(404).json({access: false})
    }
}

module.exports = {
    login,
}
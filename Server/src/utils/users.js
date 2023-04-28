let users = [
    {email: 'ejemplo10@gmail.com', password: "Contra1@"},
]
console.log(users)

const createUser = (user) => {
    const { name, lastname, email, password, gender } = user;

    // Generar un nuevo ID único para el usuario

    // Hashear la contraseña del usuario

    // Crear el objeto del nuevo usuario
    let id = 1
    const newUser = {
        id: ++id,
        name,
        lastname,
        email,
        password,
        gender,
    };

    // Agregar el nuevo usuario al array de usuarios
    users.push(newUser);
};

const getAllUsers = () => {
    return users;
};
console.log(users)

const getUserById = (id) => {
    return users.find((user) => user.id == id)
}

const updateUser = (id, updatedUser) => {
    users = users.map((user) => {
        if (user.id === id) {
            return { ...user, ...updatedUser };
        }
        return user;
    });
};

const deleteUser = (id) => {
    users = users.filter((user) => user.id !== id);
};


const getUserByEmail = (email) => {
    return users.find((user) => user.email === email);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
};


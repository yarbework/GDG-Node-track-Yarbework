import { userSchema } from "../utils/validator";

const users = [
    {
        id: 1,
        name: "John Doe",
        age: 30,
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 25,
    }
] 
export const getAllUsers = (req, res) => {
    
    res.status(200).json(users)

}

export const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
}

export const createUser = (req, res) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    users.push(newUser)
    res.status(201).json(newUser)
}

export const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    user.name = req.body.name
    user.age = req.body.age
    res.status(200).json(user)   
}

export const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" })
    }
    users.splice(userIndex, 1)
    res.status(204).send()
}

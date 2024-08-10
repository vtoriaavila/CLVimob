import mongoose from 'mongoose';
import userService from '../services/user.service.js'; // Verifique o caminho e a extensão do arquivo

const validId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Id" });
    }

    next();
};

const validUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await userService.findIdService(id);
        
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        req.id = id;
        req.user = user

        next();
    } catch (error) {
        res.status(500).send({ message: "Server error" });
    }

    
    
    
};

export default { validId, validUser };

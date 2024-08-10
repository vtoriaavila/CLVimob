import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Definição do esquema do usuário
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    estado: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    bairro: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    documento: {
        type: String,
        required: true,
        unique: true,
    },
    data_nascimento: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'proprietario', 'locatario'],
        default: 'locatario',
    },
    banco: {
        type: String,
        required: function() { return this.role === 'proprietario'; }, // Apenas para 'proprietario'
    },
    agencia: {
        type: String,
        required: function() { return this.role === 'proprietario'; }, // Apenas para 'proprietario'
    },
    conta: {
        type: String,
        required: function() { return this.role === 'proprietario'; }, // Apenas para 'proprietario'
    }
});

// Middleware para hashear a senha antes de salvar o usuário
UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next(); // Se a senha não foi modificada, continue

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next(); // Continue para a próxima etapa do middleware ou o salvamento
    } catch (err) {
        next(err); // Passe o erro para o próximo middleware de erro
    }
});

// Criação do modelo de usuário
const User = mongoose.model("User", UserSchema);

export default User;

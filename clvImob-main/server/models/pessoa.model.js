import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nome_user: {
      type: String,
      required: true,
      min: 2,
      max: 60,
    },
    googleId: {
      type: String,
      unique: true, 
      sparse: true,
    },
    email_user: {
      type: String,
      required: true,
      max: 60,
      unique: true
    },
    password: {
      type: String,
      minlength: 8,
      required: function () {
        return !this.googleId;
      }
    },
    picturePathLogo: {
      type: String,
      required: true
    },
    cnpj_user: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: function (value) {
          // Expressão regular para validar o formato do CNPJ
          return !value || /^\d{14}$/.test(value);
        },
        message: props => `${props.value} não é um CNPJ válido!`
      }
    },
    nome_empresa: {
      type: String,
      max: 60,
    },
    endereco_userEmpresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Endereco',
    },
    contato_userEmpresa: {
      type: String,
    },
    oss: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrdemDeServico',
    }],
    clientes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
    }],
    funcionarios: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Funcionario',
    }],
    servicos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servico',
    }],
    pecas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Peca',
    }],
  }, { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
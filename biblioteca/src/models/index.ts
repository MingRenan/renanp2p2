import mongoose from "mongoose";
const { Schema } = mongoose;


// Schema de Funcionario
const FuncionarioSchema = new Schema ({
    nome: {
      type: String,
      required: [true, 'O campo nome é obrigatório.'], // Não pode ser nulo
    },
    idade: {
      type: Number,
      min: [14, 'A idade mínima é 14 anos.'], // Valor mínimo 14
      required: [true, 'O campo idade é obrigatório.'],
    },
    email: {
      type: String,
      required: [true, 'O campo email é obrigatório.'], // Não pode ser nulo
      unique: true, // Deverá ser único
      match: [/.+@.+\..+/, 'Por favor, insira um email válido.'], // Validação de email
    },
    fone: {
      type: String,
      required: [true, 'O campo fone é obrigatório.'], // Não pode ser nulo
      unique: true, // Deverá ser único
    },
  });

   const Funcionario = mongoose.model('Funcionario', FuncionarioSchema);

   // Interface para o documento Mensalista
export interface IMensalista extends Document {
    matricula: string;
    salario: number;
    funcionario: mongoose.Types.ObjectId;
  }
  
  // Schema de Mensalista
  const MensalistaSchema = new Schema({
    matricula: {
      type: String,
      required: [true, 'O campo matrícula é obrigatório.'], // Não pode ser nulo
      unique: true, // Deverá ser único
    },
    salario: {
      type: Number,
      min: [0.01, 'O salário deve ser maior que 0.'], // Valores reais > 0
      required: [true, 'O campo salário é obrigatório.'],
    },
    funcionario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Funcionario', // Referência ao schema de Funcionario
      required: [true, 'O campo funcionário é obrigatório.'], // Não poderá ser nulo
      unique: true, // Deverá ser único
    },
  });
  
   const Mensalista = mongoose.model('Mensalista', MensalistaSchema);
  
   // Interface para o documento Cargo
export interface ICargo extends Document {
    cbo: string;
    descricao: string;
  }
  
  // Schema de Cargo
  const CargoSchema = new Schema({
    cbo: {
      type: String,
      required: [true, 'O campo CBO é obrigatório.'], // Não pode ser nulo
    },
    descricao: {
      type: String,
      required: [true, 'O campo descrição é obrigatório.'], // Não pode ser nulo
    },
  });
  
   const Cargo = mongoose.model('Cargo', CargoSchema);
  



export {  Funcionario , Mensalista , Cargo };
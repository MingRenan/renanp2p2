class FuncionarioModel {
    id:string = ""
    nome:string;
    idade: number;
    fone: string;
    email:string;

    constructor(nome:string, idade: number, fone: string, email:string){
        this.nome = nome;
        this.idade = idade;
        this.fone = fone;
        this.email = email;
    }
}

export default FuncionarioModel;
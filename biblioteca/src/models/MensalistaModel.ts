class MensalistaModel {
    id:string = ""
    matricula: number;
    salario:number;
    funcionario: string;
    
//    nome:string;
//    idade: number;
//    fone: string;
//    email:string;

    constructor(matricula:number,salario:number, funcionario:string 
        // ,nome:string, idade: number, fone: string, email:string
    ){
        this.matricula = matricula;
        this.funcionario = funcionario;
        this.salario = salario; 

    //    this.nome = nome;
    //     this.idade = idade;
    //     this.fone = fone;
    //     this.email = email;
        
    }
}

export default MensalistaModel;
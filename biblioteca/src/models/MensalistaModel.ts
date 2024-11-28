class MensalistaModel {
    id:string = ""
    matricula: number;
    salario:number;
    funcionario: string;
   

    constructor(matricula:number,salario:number, funcionario:string){
        this.matricula = matricula;
        this.funcionario = funcionario;
        this.salario = salario; 
        
    }
}

export default MensalistaModel;
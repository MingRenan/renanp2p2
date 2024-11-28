class CargoModel {
    id:string = ""
    cbo:string;
    descricao: string;
   

    constructor(cbo:string,codigo:string){
        this.cbo = cbo;
        this.descricao = codigo;
        
    }
}

export default CargoModel;
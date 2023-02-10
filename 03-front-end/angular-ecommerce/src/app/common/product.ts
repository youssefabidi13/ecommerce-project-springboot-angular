export class Product {
    id: string = '';
    sku: string ='';
    name: string ='';
    description: string ='';
    unitPrice: number= 0;
    imageUrl: string ='';
    active: boolean= false;
    unitsInStock: string ='';
    dateCreated: Date= new Date();
    lastUpdate: Date= new Date();
}

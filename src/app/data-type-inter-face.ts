export interface signup {
  fullName: string;
  emai: string;
  password: string;
  
}

export interface login {
  email: string;
  password: string;
}

export interface product {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: string;
  quantity:undefined | number;
  product_Id:undefined| string
}

export interface cart{
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: string | undefined;
  quantity:undefined | number;
  userId:string;
  productId:string;

}

export interface priceSummery{
  price:number;
  discount:number;
  tex:number;
  deliver:number;
  total:number;
}

export interface order{
  email:string,
  address:string,
  contact:number,
  totalPrice:number,
  userId:string


}
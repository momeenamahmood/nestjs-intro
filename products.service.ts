import { Injectable, NotFoundException } from "@nestjs/common";

import {Product} from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        const prodID = Math.random().toString();
        const newProduct = new Product(prodID, title, desc, price);
        this.products.push(newProduct);
        return prodID;
    }

    getProducts(){
        return [...this.products];
    }

    getSingleProduct(productID: string){
        const product = this.findProduct(productID)[0];
        return {...product};
    }


    updateProduct(prodID: string, title: string, description: string, price: number){
        const [product, index] = this.findProduct(prodID);
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title; 
        }
        if(description){
            updatedProduct.description = description; 
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }


    deleteProduct(prodId: string){
        const [product, index] = this.findProduct(prodId);
        this.products.splice(index, 1);
    }

    private findProduct(prodID: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === prodID);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }

    


}
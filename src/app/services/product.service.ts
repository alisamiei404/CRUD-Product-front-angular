import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = "http://localhost:8000/api";
  constructor(private http: HttpClient) {}

  allProduct() {
    return this.http.get(`${this.url}/product/all`);
  }

  singleProduct(id: number) {
    return this.http.get(`${this.url}/product/single/${id}`);
  }

  addProduct(productData: any) {
    return this.http.post(`${this.url}/product/create`,productData);
  }

  updateProduct(productData: any, id:number) {
    return this.http.put(`${this.url}/product/update/${id}`,productData);
  }

  updateProductImage(productData: any, id:number) {
    return this.http.post(`${this.url}/product/updateImage/${id}`,productData);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/product/delete/${id}`);
  }
}
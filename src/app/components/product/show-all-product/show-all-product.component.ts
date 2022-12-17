import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-show-all-product',
  templateUrl: './show-all-product.component.html',
  styleUrls: ['./show-all-product.component.scss']
})
export class ShowAllProductComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  allProductSub!: Subscription;
  deleteItemSub!: Subscription;
  products: any;
  disable: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.allProductSub = this.productService.allProduct().subscribe(
      (res: any) => {
        this.loading = false;
        this.products = res.products;
      }
    );
  }

  onDelete(id: number){
    this.disable = true;

    this.deleteItemSub = this.productService.deleteProduct(id).subscribe({
      next : res => {
        this.disable = false;
        this.products = this.products.filter((product:any) => product.id != id);
      },
      error : err => {
        this.disable = false;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.allProductSub){
        this.allProductSub.unsubscribe();
    }

    if(this.deleteItemSub){
      this.deleteItemSub.unsubscribe();
    }
  }

}
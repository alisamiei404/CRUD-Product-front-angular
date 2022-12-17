import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent {
  loading: boolean = false;
  singleItemSub!: Subscription;
  id: number = 0;
  product!: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.params['id'];

    this.singleItemSub = this.productService.singleProduct(this.id).subscribe(
      (res: any) => {
        this.loading = false;
        this.product = res.product;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.singleItemSub){
        this.singleItemSub.unsubscribe();
    }
  }
}
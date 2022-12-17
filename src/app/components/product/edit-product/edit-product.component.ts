import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  loading: boolean = false;
  id: number = 0;
  itemForm!: FormGroup;
  updateProductSub!: Subscription;
  singleProductSub!: Subscription;
  errors: any = null;
  btnLoading: boolean = false;
  product!: any;
  counts: any = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  constructor(private builder: FormBuilder, private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

    ngOnInit(): void {
      this.loading = true;
      this.id = this.route.snapshot.params['id'];

      this.singleProductSub = this.productService.singleProduct(this.id).subscribe(
        (res: any) => {
          this.loading = false;
          this.product = res.product;

          this.itemForm = this.builder.group({
            title: [this.product.title, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            slug: [this.product.slug, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9-]+$'), Validators.maxLength(255)]],
            price: [this.product.price],
            count: [this.product.count],
            status: [this.product.status]
          });
        }
      );
    }

    onSubmit() {
      if(!this.itemForm.valid){
        return;
      }
  
      this.btnLoading = true;
  
      this.updateProductSub = this.productService.updateProduct(this.itemForm.value, this.id).subscribe({
        next : (value: any) => {
          this.btnLoading = false;
          this.router.navigate(['/showAllProduct']);
        },
        error : (error: any) => {
          this.btnLoading = false;
          if(error.status === 422){
            this.errors = error.error.errors;
          }
        }
      });
    }

    ngOnDestroy(): void {
      if(this.updateProductSub){
          this.updateProductSub.unsubscribe();
      }
      if(this.singleProductSub){
        this.singleProductSub.unsubscribe();
    }
    }
  }
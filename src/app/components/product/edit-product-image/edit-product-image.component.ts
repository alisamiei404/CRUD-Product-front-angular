import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-edit-product-image',
  templateUrl: './edit-product-image.component.html',
})
export class EditProductImageComponent {
  loading: boolean = false;
  id: number = 0;
  itemForm!: FormGroup;
  updateProductSub!: Subscription;
  singleProductSub!: Subscription;
  errors: any = null;
  btnLoading: boolean = false;
  product!: any;
  selectedFiles?: FileList;
  currentFile?: File;
  preview: any = '';
  imageError!: string;

  constructor(private builder: FormBuilder, private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

    ngOnInit(): void {
      this.loading = true;
      this.id = this.route.snapshot.params['id'];

      this.singleProductSub = this.productService.singleProduct(this.id).subscribe(
        (res: any) => {
          this.loading = false;
          this.product = res.product;

          this.itemForm = this.builder.group({
            image: ['', [Validators.required]]
          });
        }
      );
    }

    selectFile(event: any): any {
      const max_size = 200*1024;
      const allowed_types = ['image/png', 'image/jpeg'];
  
      if(event.target.files[0].size > max_size) {
        this.imageError = "حداکثر حجم 200 کیلوبایت";
        this.itemForm.setErrors({ valid: false });
        return false;
      }else{
        this.imageError = "";
      }
  
      if (!allowed_types.includes(event.target.files[0].type)) {
          this.imageError = "عکس وارد کنید";
          this.itemForm.setErrors({ valid: false });
          return false;
      }else{
        this.imageError = "";
      }
  
      this.selectedFiles = event.target.files;
  
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
    
        if (file) {
          this.preview = '';
          this.currentFile = file;
    
          const reader = new FileReader();
    
          reader.onload = (e: any) => {
            this.preview = e.target.result;
          };
    
          reader.readAsDataURL(this.currentFile);
        }
      }
    }

    onSubmit() {
      if(!this.itemForm.valid){
        return;
      }

      const formData: any = new FormData();

      if(this.currentFile){
        formData.append('image', this.currentFile);
      }
  
      this.btnLoading = true;
  
      this.updateProductSub = this.productService.updateProductImage(formData, this.id).subscribe({
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
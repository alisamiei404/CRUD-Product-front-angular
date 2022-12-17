import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  itemForm!: FormGroup;
  addProductSub!: Subscription;
  errors: any = null;
  btnLoading: boolean = false;
  selectedFiles?: FileList;
  currentFile?: File;
  preview: any = '';
  counts: any = [0,10, 20, 30, 40, 50, 60, 70, 80, 90];
  imageError: string = "";

  constructor(private builder: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.itemForm = this.builder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9-]+$'), Validators.maxLength(255)]],
      price: [0],
      image: ['', [Validators.required]],
      count: [10],
      status: [true]
    });
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
    this.preview = this.selectedFiles?.item(0);

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
    formData.append('title', this.itemForm.value.title);
    formData.append('slug', this.itemForm.value.slug);
    if(this.currentFile){
      formData.append('image', this.currentFile);
    }
    formData.append('price', this.itemForm.value.price);
    formData.append('count', this.itemForm.value.count);
    formData.append('status', this.itemForm.value.status);    

    this.btnLoading = true;

    this.addProductSub = this.productService.addProduct(formData).subscribe({
      next : (value: any) => {
        this.btnLoading = false;
        this.router.navigate(['/showAllProduct']);
      },
      error : (error: any) => {
        console.log(error);
        this.btnLoading = false;
        if(error.status === 422){
          this.errors = error.error.errors;
        }
      }
    });

  }

  ngOnDestroy(): void {
    if(this.addProductSub){
        this.addProductSub.unsubscribe();
    }
  }
}
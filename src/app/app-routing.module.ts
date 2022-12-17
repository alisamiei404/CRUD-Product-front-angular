import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductImageComponent } from './components/product/edit-product-image/edit-product-image.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ShowAllProductComponent } from './components/product/show-all-product/show-all-product.component';
import { ShowProductComponent } from './components/product/show-product/show-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'showAllProduct', component: ShowAllProductComponent },
  { path: 'showProduct/:id', component: ShowProductComponent },
  { path: 'editProduct/:id', component: EditProductComponent },
  { path: 'editProductImage/:id', component: EditProductImageComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

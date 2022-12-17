import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinnercomponent';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { EditProductImageComponent } from './components/product/edit-product-image/edit-product-image.component';
import { AppInterceptorService } from './services/app-interceptor.service';
import { ShortenPipe } from './pipes/shorten.pipe';
import { ShowAllProductComponent } from './components/product/show-all-product/show-all-product.component';
import { ShowProductComponent } from './components/product/show-product/show-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    ShowAllProductComponent,
    ShowProductComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
    EditProductComponent,
    EditProductImageComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

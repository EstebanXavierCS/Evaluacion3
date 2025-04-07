import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Provider } from '../../models/provider.model';
import { Product } from '../../models/product.model';
import { ProviderService } from '../../services/provider.service';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-provider-products',
  standalone: true,
  imports: [FormsModule, CommonModule,NavbarComponent],
  templateUrl: './provider-products.component.html',
  styleUrl: './provider-products.component.css'
})
export class ProviderProductsComponent {
  providers: any[] = [];
  products: any[] = [];
  selectedProvider = new Provider();
  newProduct = new Product();
  productMessage: string | null = null; 
  providerMessage: string | null = null;

  
  constructor(
    private providerService: ProviderService,
    private productService: ProductService
  ) {
    this.getProviders();
  }

  async getProviders() {
    this.providers = await firstValueFrom(this.providerService.getProviders());
  }

  async getProductsByProvider(providerId: string) {
    this.products = await firstValueFrom(this.productService.getProductsByProvider(providerId));
  }

  async selectProvider(provider: Provider) {
    this.selectedProvider = provider;
    await this.getProductsByProvider(provider.id);
    this.newProduct = new Product();
    this.newProduct.providerId = provider.id;
  }

  cleanProvider() {
    this.selectedProvider = new Provider(); // Restablece el proveedor
  }

  async submitProvider() {
    if (this.selectedProvider.nombre && this.selectedProvider.email && this.selectedProvider.direccion) {
      if (this.selectedProvider.id) {
        await this.updateProvider();
        this.providerMessage = 'Proveedor actualizado con éxito';
      } else {
        await this.addProvider();
        this.providerMessage = 'Proveedor agregado con éxito';
      }
      setTimeout(() => this.providerMessage = null, 3000);
    }
  }

  async addProvider() {
    await this.providerService.addProvider(this.selectedProvider);
    this.selectedProvider = new Provider();
    await this.getProviders();
  }

  async updateProvider() {
    await this.providerService.updateProvider(this.selectedProvider);
    await this.getProviders();
  }

  async deleteProvider() {
    await this.providerService.deleteProvider(this.selectedProvider);
    this.selectedProvider = new Provider();
    this.products = [];
    await this.getProviders();
  }

  async addProduct() {
    await this.productService.addProduct(this.newProduct);
    this.newProduct = new Product();
    this.newProduct.providerId = this.selectedProvider.id;
    await this.getProductsByProvider(this.selectedProvider.id);
  }

  async updateProduct(product: Product) {
    await this.productService.updateProduct(product);
    await this.getProductsByProvider(this.selectedProvider.id);
  }

  async deleteProduct(product: Product) {
    await this.productService.deleteProduct(product);
    await this.getProductsByProvider(this.selectedProvider.id);
  }

  selectProduct(product: Product) {
    this.newProduct = { ...product };
  }

  cleanProduct() {
    this.newProduct = new Product();
    this.newProduct.providerId = this.selectedProvider.id;
  }

  async submitProduct() {
    if (this.newProduct.nombre && this.newProduct.descripcion && this.newProduct.precio && this.newProduct.cantidad) {
      if (this.newProduct.id) {
        await this.updateProduct(this.newProduct);
        this.productMessage = 'Producto actualizado con éxito';
      } else {
        await this.addProduct();
        this.productMessage = 'Producto agregado con éxito';
      }
      setTimeout(() => this.productMessage = null, 3000);
    }
  }
}

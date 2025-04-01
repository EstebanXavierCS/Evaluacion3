import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Provider } from '../../models/provider.model';
import { Product } from '../../models/product.model';
import { ProviderService } from '../../services/provider.service';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-provider-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './provider-products.component.html',
  styleUrl: './provider-products.component.css'
})
export class ProviderProductsComponent {
  providers: any[] = [];
  products: any[] = [];
  selectedProvider = new Provider();
  newProduct = new Product();
  
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
}

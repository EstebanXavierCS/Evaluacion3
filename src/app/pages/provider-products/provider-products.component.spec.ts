import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderProductsComponent } from './provider-products.component';

describe('ProviderProductsComponent', () => {
  let component: ProviderProductsComponent;
  let fixture: ComponentFixture<ProviderProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

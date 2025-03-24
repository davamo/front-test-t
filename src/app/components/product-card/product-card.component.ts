import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() delete = new EventEmitter<Product>();

  selectedImageIndex = 0;

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = '/images/paisajeamarillo.png';
  }

  onDelete(): void {
    this.delete.emit(this.product);
  }

  getSafeImage(url: string): string {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  
    if (!url) return '/images/paisajeamarillo.png';
  
    const extension = url.split('.').pop()?.toLowerCase().split('?')[0] ?? '';
    const isValid = validExtensions.some(ext => extension.includes(ext));
  
    return isValid ? url : '/images/paisajeamarillo.png';
  }
  
}

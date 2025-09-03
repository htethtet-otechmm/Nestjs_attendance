import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: uuidv4(),
      name: 'Product 1',
      price: 10,
    },
    {
      id: uuidv4(),
      name: 'Product 2',
      price: 20,
    },
    {
      id: uuidv4(),
      name: 'Product 3',
      price: 30,
    },
  ];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  findProductsByPrice(minPrice: string) {
    const products = this.products.filter(
      (product) => product.price >= Number(minPrice),
    );
    if (!products.length) {
      throw new NotFoundException();
    }
    return products;
  }

  createProduct(product: CreateProductDto) {
    const newProduct = {
      id: uuidv4(),
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (updateProductDto.name) product.name = updateProductDto.name;
    if (updateProductDto.price) product.price = updateProductDto.price;
    return product;
  }

  deleteProduct(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    this.products = this.products.filter((product) => product.id !== id);
  }
}

from django.db import models
from django.core.validators import MinValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name

class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=100)
    
    def __str__(self):
        return self.alt_text

class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    stock = models.PositiveIntegerField(default=0)
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE,
        related_name='products'
    )
    images = models.ManyToManyField(ProductImage)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class Variant(models.Model):
    VARIANT_TYPES = [
        ('size', 'Size'),
        ('color', 'Color'),
    ]
    
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE,
        related_name='variants'
    )
    type = models.CharField(max_length=20, choices=VARIANT_TYPES)
    value = models.CharField(max_length=50)
    stock = models.PositiveIntegerField(default=0)
    price_adjustment = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    
    class Meta:
        unique_together = ['product', 'type', 'value']
    
    def __str__(self):
        return f"{self.product.name} - {self.type}: {self.value}"
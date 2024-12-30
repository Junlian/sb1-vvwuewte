from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product, Variant

User = get_user_model()

class Cart(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    session_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    @property
    def total_amount(self):
        return sum(item.subtotal for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(
        Variant,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    quantity = models.PositiveIntegerField(default=1)
    
    @property
    def subtotal(self):
        base_price = self.product.price
        if self.variant:
            base_price += self.variant.price_adjustment
        return base_price * self.quantity
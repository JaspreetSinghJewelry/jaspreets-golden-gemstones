import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { ArrowLeft, MapPin, ShoppingBag, CreditCard, Truck, Shield, User, Mail, Phone, Home, Plus, Minus, Trash2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, getCartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });

  console.log('Checkout page rendered - Cart items:', cartItems);
  console.log('Checkout page rendered - Cart total:', getCartTotal());
  console.log('Checkout page rendered - Cart items length:', cartItems.length);

  const subTotal = getCartTotal();
  const taxes = Math.round(subTotal * 0.18); // 18% GST
  const totalAmount = subTotal + taxes;

  useEffect(() => {
    console.log('Checkout useEffect - Cart items changed:', cartItems);
    requestLocation();
  }, [cartItems]);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinueToPayment = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'pincode', 'state'];
    const isValid = requiredFields.every(field => formData[field as keyof typeof formData].trim() !== '');
    
    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Navigate to payment page with customer data
    navigate('/payment', { 
      state: { 
        customerData: { ...formData, location } 
      }
    });
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-[#0D0C29] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-[#0D0C29]">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some beautiful jewelry to your cart to proceed with checkout</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0D0C29] hover:from-yellow-500 hover:to-amber-600 font-bold"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100">
      {/* Header Section */}
      <div className="bg-[#0D0C29] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:text-yellow-400 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </div>
          <div className="mt-4">
            <FancyText variant="gradient" size="xl" className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text">
              Secure Checkout
            </FancyText>
            <p className="text-yellow-200 mt-2">Complete your order with confidence</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-yellow-200">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-[#0D0C29] font-semibold">
              <ShoppingBag className="h-4 w-4" />
              <span>Cart</span>
            </div>
            <div className="h-1 w-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-[#0D0C29] font-semibold">
              <Truck className="h-4 w-4" />
              <span>Shipping</span>
            </div>
            <div className="h-1 w-8 bg-gray-300 rounded"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-300 rounded-full text-gray-600 font-semibold">
              <CreditCard className="h-4 w-4" />
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contact Information */}
            <Card className="border-2 border-yellow-200 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0D0C29] rounded-t-lg">
                <CardTitle className="flex items-center gap-2 font-bold">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-[#0D0C29] font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-[#0D0C29] font-semibold">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#0D0C29] font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[#0D0C29] font-semibold flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Access */}
            <Card className="border-2 border-yellow-200 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0D0C29] rounded-t-lg">
                <CardTitle className="flex items-center gap-2 font-bold">
                  <MapPin className="h-5 w-5" />
                  Location Services
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {location ? (
                  <div className="flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-lg border border-green-200">
                    <Shield className="h-5 w-5" />
                    <p className="font-medium">✓ Location accessed for accurate delivery estimation</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[#0D0C29] font-medium">
                      Enable location access for faster delivery and better service
                    </p>
                    <Button 
                      onClick={requestLocation}
                      className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0D0C29] hover:from-yellow-500 hover:to-amber-600 font-semibold"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Enable Location Access
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="border-2 border-yellow-200 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0D0C29] rounded-t-lg">
                <CardTitle className="flex items-center gap-2 font-bold">
                  <Home className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-[#0D0C29] font-semibold">
                      Complete Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House no, Street, Landmark"
                      className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-[#0D0C29] font-semibold">
                        City *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-[#0D0C29] font-semibold">
                        State *
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-[#0D0C29] font-semibold">
                        Pincode *
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-yellow-200 bg-white/90 backdrop-blur-sm shadow-xl sticky top-8">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0D0C29] rounded-t-lg">
                <CardTitle className="flex items-center gap-2 font-bold">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary ({cartItems.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-[#0D0C29] text-sm">{item.name}</p>
                          <p className="font-bold text-[#0D0C29]">{item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-3 pt-4 border-t-2 border-yellow-200">
                    <div className="flex justify-between text-[#0D0C29]">
                      <span className="font-medium">Sub Total</span>
                      <span className="font-semibold">₹{subTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#0D0C29]">
                      <span className="font-medium">GST (18%)</span>
                      <span className="font-semibold">₹{taxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t-2 border-yellow-200 pt-3 text-[#0D0C29]">
                      <span>TOTAL (Incl of all Taxes.)</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text border-t-2 border-yellow-300 pt-3">
                      <span>AMOUNT PAYABLE</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg border border-green-200 mt-4">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Secure SSL Encrypted Checkout</span>
                  </div>

                  {/* Continue to Payment Button */}
                  <Button 
                    onClick={handleContinueToPayment}
                    className="w-full bg-gradient-to-r from-[#0D0C29] to-purple-800 text-white hover:from-purple-900 hover:to-[#0D0C29] font-bold py-4 text-lg shadow-xl border-2 border-yellow-400 hover:border-yellow-300 transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

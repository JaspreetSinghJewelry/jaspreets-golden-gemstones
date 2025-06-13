function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AdminAuthProvider>
            <CartProvider>
              <WishlistProvider>
                <TooltipProvider>
                  <BrowserRouter basename={basename}>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/payment-failure" element={<PaymentFailure />} />
                        <Route path="/order-history" element={<OrderHistory />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route path="/rings" element={<Rings />} />
                        <Route path="/necklaces" element={<Necklaces />} />
                        <Route path="/earrings" element={<Earrings />} />
                        <Route path="/bracelets" element={<Bracelets />} />
                        <Route path="/bridal" element={<Bridal />} />
                        <Route path="/lab-grown-diamonds" element={<LabGrownDiamonds />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-conditions" element={<TermsConditions />} />
                        <Route path="/exchange-buyback-policy" element={<ExchangeBuybackPolicy />} />
                        <Route path="/defective-product-policy" element={<DefectiveProductPolicy />} />
                        <Route path="/fraud-warning" element={<FraudWarning />} />
                        <Route path="/jewelry-care-guide" element={<JewelryCareGuide />} />
                        <Route path="/diamond-solitaire-guide" element={<DiamondSolitaireGuide />} />
                        <Route path="/buying-price-guide" element={<BuyingPriceGuide />} />
                        <Route path="/certification-guide" element={<CertificationGuide />} />
                        <Route path="/gemstone-guide" element={<GemstoneGuide />} />
                        <Route path="/gifting-guide" element={<GiftingGuide />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </TooltipProvider>
              </WishlistProvider>
            </CartProvider>
          </AdminAuthProvider>
        </AuthProvider>
        <Toaster />
        <Sonner />
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

export default App;


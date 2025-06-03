
import Header from "@/components/Header";
import ProductCarousel from "@/components/ProductCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import UploadedImages from "@/components/UploadedImages";
import Categories from "@/components/Categories";
import LabGrownDiamonds from "@/components/LabGrownDiamonds";
import InstagramGallery from "@/components/InstagramGallery";
import LabGrownInstagramGallery from "@/components/LabGrownInstagramGallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductCarousel />
      <UploadedImages location="best-sellers" title="Best Sellers" />
      <FeaturedProducts />
      <UploadedImages location="featured-collection" title="Featured Collection" />
      <Categories />
      <LabGrownDiamonds />
      <UploadedImages location="lab-grown-diamonds" title="Lab Grown Diamond Collection" />
      <UploadedImages location="rings" title="Rings Collection" />
      <UploadedImages location="necklaces" title="Necklaces Collection" />
      <UploadedImages location="earrings" title="Earrings Collection" />
      <UploadedImages location="bracelets" title="Bracelets Collection" />
      <div className="grid lg:grid-cols-2 gap-0">
        <InstagramGallery />
        <LabGrownInstagramGallery />
      </div>
      <Footer />
    </div>
  );
};

export default Index;

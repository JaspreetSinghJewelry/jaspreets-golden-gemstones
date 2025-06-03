
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
      <UploadedImages location="rings" title="Rings" />
      <FeaturedProducts />
      <UploadedImages location="featured-collection" title="Featured Collection" />
      <Categories />
      <LabGrownDiamonds />
      <UploadedImages location="lab-grown-diamonds" title="Lab Grown Diamond Collection" />
      <UploadedImages location="rings" title="Rings" />
      <UploadedImages location="necklaces" title="Necklaces" />
      <UploadedImages location="earrings" title="Earrings" />
      <UploadedImages location="bracelets" title="Bracelets" />
      <div className="grid lg:grid-cols-2 gap-0">
        <InstagramGallery />
        <LabGrownInstagramGallery />
      </div>
      <Footer />
    </div>
  );
};

export default Index;

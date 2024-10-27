import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
// import myImage from "../assets/your-image.png"; // Update the path to your image

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      {/* <Header></Header> */}
      <main style={{ minHeight: "70vh", overflow: "hidden" }}>
        <Toaster />
        <div className="flex w-full">
          <div className="w-full flex items-center justify-center lg:w-1/2">
            {children}
          </div>
          <div className="hidden relative lg:flex h-full w-1/2 bg-gray-200 items-center justify-center">
            {/* Replace the Lottie component with an image */}
            <img src='/GoldenJubilee.jpg' alt="Descriptive Alt Text" style={{ height: "100vh", width: "auto", backgroundColor: "#111" }} />
            {/* <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" /> */}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

// These are default props
Layout.defaultProps = {
  title: "Convocation-Portal",
  description: "Convocation-Portal",
  keywords: "nothing",
  author: "NIT Kurukshetra",
};

export default Layout;

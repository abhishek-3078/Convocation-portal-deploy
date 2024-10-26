import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from "../helper/animation1.json";

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
      <Header></Header>
      <main style={{ minHeight: "70vh" , overflow : "hidden"}}>
        <Toaster />
        <div className="flex w-full">
          <div className="w-full flex items-center justify-center lg:w-1/2">
          {children}
          </div>
          <div className="hidden relative lg:flex h-full w-1/2 bg-gray-200 items-center justify-center">
            {/* <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin" /> */}
            <Lottie style={{height:"100vh" , backgroundColor:"#111"}} animationData={animationData}/>
            {/* <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" /> */}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

//  These are default props
Layout.defaultProps = {
  title: "Convocation-Portal",
  description: "Convocation-Portal",
  keywords: "nothing",
  author: "NIT Kurukshetra",
};

export default Layout;

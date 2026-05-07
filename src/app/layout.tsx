import Navbar from "@/components/layout/Navbar";
import Providers from "./providers";

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <html>
      {/* <head>
        <title>여기는타이틀</title>
        <meta name="description" content="설명입니다" />
        </head> */}
        <body>
          {/* <p>여기는 변하지 않아!</p> */}
      <Navbar />
      <Providers>
        {children}
      </Providers>
    </body></html>
  );
};

export default RootLayout;
import Navbar from "@/components/layout/Navbar";
import Providers from "./providers";
import "./globals.css"; // globals.css가 있다면 반드시 임포트

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        {/* 전체를 감싸는 컨테이너를 flex로 설정 */}
        <div style={{ display: "flex" }}>
          
          {/* 1. 왼쪽 사이드바 영역 */}
          <Navbar />

          {/* 2. 오른쪽 메인 콘텐츠 영역 */}
          {/* Navbar의 width가 250px이므로, marginLeft를 250px 줘서 겹치지 않게 합니다. */}
          <main style={{ 
            flex: 1, 
            marginLeft: "250px", 
            padding: "20px",
            minHeight: "100vh" 
          }}>
            <Providers>
              {children}
            </Providers>
          </main>
          
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
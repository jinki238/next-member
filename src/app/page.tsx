import React from "react";

const Homepage = () => {
  const skills = [
    {
      title: "React",
      icon: "💠",
      color: "#00a8cc",
      bg: "#f0f9ff", // 연한 하늘색
      borderColor: "#e0f2fe",
      description: "UI 컴포넌트 기반의 JavaScript 라이브러리",
      details: ["컴포넌트 기반 UI 개발", "가상 DOM으로 빠른 렌더링", "재사용 가능한 컴포넌트 주소"],
      roadmap: ["JSX 문법 이해", "컴포넌트와 Props", "State와 이벤트 처리", "컴포넌트 생명주기"]
    },
    {
      title: "Next.js",
      icon: "N",
      color: "#111827",
      bg: "#f3f4f6", // 연한 회색
      borderColor: "#e5e7eb",
      description: "React 기반의 풀스택 프레임워크",
      details: ["서버 사이드 렌더링(SSR)", "정적 사이트 생성(SSG)", "API 라우트 및 파일 기반 라우팅"],
      roadmap: ["페이지 및 라우팅", "SSR / SSG", "API Routes", "배포하기"]
    },
    {
      title: "Redux",
      icon: "⚛️",
      color: "#7c3aed",
      bg: "#f5f3ff", // 연한 보라색
      borderColor: "#ede9fe",
      description: "예측 가능한 상태 관리를 위한 라이브러리",
      details: ["중앙 집중식 상태 관리", "예측 가능한 상태 변경(Reducer)", "상태 변화에 따른 UI 업데이트"],
      roadmap: ["Store, Action, Reducer", "상태 조회 및 변경", "React-Redux 연동", "미들웨어 (Thunk)"]
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#ffffff", fontFamily: "'Pretendard', sans-serif" }}>
      
      <main style={{ flex: 1, padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* 헤더 */}
        <header style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>
            
            <span style={{ color: "#1e293b" }}>Mastering the Core: React · Next.js · Redux</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>각 기술의 특징과 역할을 이해하고, 함께 탄탄한 웹 애플리케이션을 만들어보세요</p>
        </header>

        {/* 1. 개념 한눈에 보기 문구를 위로 이동 */}
        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>개념 한눈에 보기</h3>

        {/* 2. 기술 카드 섹션 (기존 '개념 한눈에 보기' 위치에 있던 카드들) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "50px" }}>
          {skills.map((skill) => (
            <div key={skill.title} style={{ background: skill.bg, padding: "30px", borderRadius: "24px", border: `1px solid ${skill.borderColor}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                <div style={{ width: "55px", height: "55px", borderRadius: "15px", background: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "30px", color: skill.color, boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                  {skill.icon}
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1e293b" }}>{skill.title}</h2>
              </div>
              <p style={{ fontSize: "14px", color: "#475569", marginBottom: "20px", fontWeight: "500" }}>{skill.description}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {skill.details.map((detail) => (
                  <li key={detail} style={{ fontSize: "14px", color: "#334155", display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" }}>
                    <span style={{ color: skill.color }}>✔</span> {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. 학습 로드맵 섹션 */}
        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>학습 로드맵</h3>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
          {skills.map((skill, idx) => (
            <React.Fragment key={skill.title}>
              <div style={{ flex: 1, background: skill.bg, padding: "25px", borderRadius: "20px", border: `1px solid ${skill.borderColor}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: skill.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px" }}>
                    {idx + 1}
                  </div>
                  <div style={{ fontWeight: "800", fontSize: "16px", color: skill.color }}>{skill.title} {idx === 0 ? "기초 학습" : idx === 1 ? "활용" : "상태 관리"}</div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {skill.roadmap.map((step, i) => (
                    <li key={i} style={{ fontSize: "13px", color: "#475569", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ color: skill.color, fontSize: "10px" }}>●</span> {step}
                    </li>
                  ))}
                </ul>
              </div>
              {idx < 2 && <div style={{ alignSelf: "center", color: "#cbd5e1", fontSize: "24px" }}>➔</div>}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
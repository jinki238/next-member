import React from "react";

const Homepage = () => {
  const skills = [
    {
      title: "React",
      icon: "⚛",
      color: "#2563eb",
      border: "#2563eb",
      description: "UI 컴포넌트 기반 JavaScript 라이브러리",
      details: [
        "컴포넌트 기반 UI 개발",
        "빠른 렌더링과 효율적 업데이트",
        "재사용 가능한 컴포넌트 구조",
        "풍부한 생태계와 커뮤니티",
      ],
      roadmap: [
        "JSX 문법 이해",
        "컴포넌트와 Props",
        "State와 이벤트 처리",
        "컴포넌트 생명주기",
        "Hooks 기초",
      ],
    },
    {
      title: "Next.js",
      icon: "N",
      color: "#7c3aed",
      border: "#7c3aed",
      description: "React 기반 풀스택 프레임워크",
      details: [
        "서버 사이드 렌더링 (SSR)",
        "검색 엔진 최적화 (SEO)",
        "API 라우트 및 파일 기반 라우팅",
        "자동 코드 분할 및 최적화",
      ],
      roadmap: [
        "페이지 및 라우팅",
        "서버 사이드 렌더링",
        "API Routes",
        "데이터 패칭",
        "배포하기",
      ],
    },
    {
      title: "Redux",
      icon: "◎",
      color: "#ff2d7a",
      border: "#ff2d7a",
      description: "예측 가능한 상태 관리를 위한 라이브러리",
      details: [
        "중앙 집중식 상태 관리",
        "예측 가능한 상태 변경",
        "상태 변화에 따른 UI 업데이트",
        "미들웨어를 통한 확장성",
      ],
      roadmap: [
        "Store, Action, Reducer",
        "상태 조회 및 변경",
        "React-Redux 연동",
        "미들웨어 (Saga, Thunk)",
        "비동기 상태 관리",
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Pretendard', sans-serif",
        padding: "40px",
      }}
    >
      {/* 메인 컨텐츠 */}
      <main style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* 헤더 */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "900",
              marginBottom: "12px",
              color: "#0f172a",
              lineHeight: "1.1",
            }}
          >
            Mastering the Core
          </h1>

          <div
            style={{
              fontSize: "58px",
              fontWeight: "900",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: "#2563eb" }}>React</span>{" "}
            <span style={{ color: "#7c3aed" }}>· Next.js</span>{" "}
            <span style={{ color: "#ff2d7a" }}>· Redux</span>
          </div>

          <p style={{ fontSize: "20px", color: "#475569" }}>
            각 기술의 특징과 역할을 이해하고, 함께 탄탄한 웹 애플리케이션을
            만들어보세요.
          </p>
        </div>

        {/* 기술 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill.title}
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "30px",
                border: `2px solid ${skill.border}`,
                boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
              }}
            >
              <h2
                style={{
                  fontSize: "34px",
                  fontWeight: "900",
                  color: skill.color,
                  marginBottom: "14px",
                }}
              >
                {skill.icon} {skill.title}
              </h2>

              <p
                style={{
                  color: "#475569",
                  fontSize: "17px",
                  marginBottom: "18px",
                }}
              >
                {skill.description}
              </p>

              {skill.details.map((item) => (
                <div
                  key={item}
                  style={{
                    marginBottom: "10px",
                    fontSize: "16px",
                    color: "#1e293b",
                    fontWeight: "600",
                  }}
                >
                  ✔ {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 학습 로드맵 */}
        <h3
          style={{
            fontSize: "34px",
            fontWeight: "900",
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          📘 학습 로드맵
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "24px",
          }}
        >
          {skills.map((skill, idx) => (
            <div
              key={skill.title}
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "28px",
                border: `2px solid ${skill.border}`,
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "900",
                  color: skill.color,
                  marginBottom: "18px",
                }}
              >
                0{idx + 1} {skill.title}
              </div>

              {skill.roadmap.map((step) => (
                <div
                  key={step}
                  style={{
                    marginBottom: "10px",
                    fontSize: "16px",
                    color: "#334155",
                    fontWeight: "600",
                  }}
                >
                  • {step}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 하단 멘트 */}
        <div
          style={{
            marginTop: "30px",
            background: "#ffffff",
            borderRadius: "24px",
            padding: "30px",
            border: "2px solid #cbd5e1",
            fontSize: "26px",
            fontWeight: "800",
            color: "#111827",
          }}
        >
          💬 작은 꾸준함이 큰 성장을 만듭니다.
          <div
            style={{
              marginTop: "10px",
              fontSize: "18px",
              color: "#64748b",
              fontWeight: "500",
            }}
          >
            오늘의 학습이 내일의 당신을 만듭니다.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
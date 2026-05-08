const Homepage = () => {

  const skills = [
    {
      title: "NEXT.JS",
      icon: "▲",
      description:
        "React 기반의 FullStack Framework",
      details: [
        "App Router 기반 라우팅",
        "SSR / SSG 지원",
        "서버 컴포넌트 기반 렌더링",
        "실무형 프로젝트 구조 제공",
      ],
    },
    {
      title: "REACT",
      icon: "⚛",
      description:
        "컴포넌트 기반 UI 라이브러리",
      details: [
        "재사용 가능한 컴포넌트 설계",
        "Virtual DOM 기반 렌더링",
        "상태 기반 화면 제어",
        "SPA(Single Page Application) 구현",
      ],
    },
    {
      title: "REDUX",
      icon: "⬢",
      description:
        "전역 상태(State) 관리 라이브러리",
      details: [
        "중앙 집중형 데이터 관리",
        "Redux Toolkit 기반 상태 관리",
        "Redux-Saga 비동기 처리",
        "예측 가능한 상태 흐름 구성",
      ],
    },
  ];

  return (
    <main
      style={{
        padding: "40px",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >

      {/* 상단 헤더 */}
      <div style={{ marginBottom: "40px" }}>

        <h1
          style={{
            fontSize: "42px",
            fontWeight: 800,
            marginBottom: "12px",
            color: "#111827",
          }}
        >
          NEXT MEMBER ADMIN
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            lineHeight: 1.6,
          }}
        >
          Next.js + React + Redux 기반의
          실습용 관리자 시스템입니다.
          <br />
          회원관리 / 사원관리 / 제품관리 기능을 중심으로
          CRUD 및 상태관리 구조를 학습합니다.
        </p>

      </div>

      {/* 기술 카드 영역 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >

        {skills.map((skill) => (

          <div
            key={skill.title}
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >

            {/* 카드 헤더 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >

              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "18px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: 700,
                }}
              >
                {skill.icon}
              </div>

              <div>
                <h2
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  {skill.title}
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "15px",
                  }}
                >
                  {skill.description}
                </p>
              </div>

            </div>

            {/* 상세 항목 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >

              {skill.details.map((detail, index) => (

                <div
                  key={index}
                  style={{
                    background: "#f9fafb",
                    border: "1px solid #f3f4f6",
                    borderRadius: "14px",
                    padding: "14px 18px",
                    fontSize: "15px",
                    color: "#374151",
                  }}
                >
                  {detail}
                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </main>
  );
};

export default Homepage;
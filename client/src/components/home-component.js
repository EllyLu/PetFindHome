import React from "react";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-5">
        <div
          className="p-5 mb-4 rounded-3 col-md-10"
          style={{ backgroundColor: "	#FFB450" }}
        >
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">佩特找家</h1>
            <p className="col-md-8 fs-4">
              這是一個流浪動物認養平台，我們希望每隻毛孩都能夠有個溫暖的歸宿。

            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-5">
            <div
              className="h-100 p-5 rounded-3"
              style={{ borderColor: "#FFAC55", borderStyle: "dashed" }}
            >
              <h3>領養人</h3>
              <p>
                你可以透過佩特找家找到理想中的毛孩，有了牠的陪伴生活不再無聊!
              </p>
            </div>
          </div>
          <div className="col-md-5">
            <div
              className="h-100 p-5 rounded-3"
              style={{ borderColor: "#FFAC55", borderStyle: "dashed" }}
            >
              <h3>送養人</h3>
              <p>
                想幫毛孩找家人嗎? 佩特找家提供您領養者的資訊，讓您輕鬆找到合適的領養者。
              </p>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top"></footer>
      </div>
    </main>
  );
};

export default HomeComponent;

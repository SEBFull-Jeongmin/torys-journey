import React from "react";
import MyPageMenu from "../component/MyPageMenu";
import { MyPageDiv } from "../style/Mypage";
const MyPage = () => {
  return (
    <div>

      <div>
        <MyPageMenu />
      </div>
      <div>마이페이지 북마크</div>

    </div>
  );
};

export default MyPage;

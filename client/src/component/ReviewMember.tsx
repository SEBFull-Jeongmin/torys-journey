import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

import { useParams } from "react-router-dom";
import store from "../redux/Store";
import ReviewList from "./ReviewList";

export type RootState = ReturnType<typeof store.getState>;

const ReviewMember = () => {
  const params = useParams();
  // const localId = useSelector((localId: RootState) => localId.Reducer.id);
  const localStorageTokenCheck: any = localStorage.getItem("KEY");

  //! 평점-----------------------------------------------------------------------------
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      if (i <= index) clickStates[i] = true;
      else clickStates[i] = false;
    }

    setClicked(clickStates);
    setRating(index + 1);
  };
  //! 평점-----------------------------------------------------------------------------
  const [review, setReview] = useState(); //리뷰 작성 state
  const [getReview, setGetReview] = useState<any>([]); //get으로 요청한 전체 review state

  const handleReview = (e: { target: { value: any } }) => {
    setReview(e.target.value);
  };

  const enrollReview = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/restaurant/${params.id}/review`,
        {
          rating: rating,
          comment: review,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            authorization: `Bearer ${localStorageTokenCheck}`,
          },
        }
      )
      .then(getReviews)
      .catch(() => alert("리뷰 등록이 실패하였습니다."));
  }; //리뷰 등록

  const getReviews = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/restaurant/${params.id}/review`, {
        headers: {
          "Content-Type": `application/json`,
          authorization: `Bearer ${localStorageTokenCheck}`,
        },
        withCredentials: true,
      })
      .then((res) => setGetReview(res.data))
      .catch(() => alert("리뷰 불러오기가 실패하였습니다."));
  }; //리뷰 등록 후 요청

  return (
    <div>
      <h5>여기는 멤버용 리뷰</h5>
      <input type="text" onChange={handleReview} />
      <div className="Star">
        <FaStar
          onClick={(e) => handleStarClick(e, 0)}
          color={clicked[0] ? "gold" : "gray"}
        />
        <FaStar
          onClick={(e) => handleStarClick(e, 1)}
          color={clicked[1] ? "gold" : "gray"}
        />
        <FaStar
          onClick={(e) => handleStarClick(e, 2)}
          color={clicked[2] ? "gold" : "gray"}
        />
        <FaStar
          onClick={(e) => handleStarClick(e, 3)}
          color={clicked[3] ? "gold" : "gray"}
        />
        <FaStar
          onClick={(e) => handleStarClick(e, 4)}
          color={clicked[4] ? "gold" : "gray"}
        />
        평점:{rating}
      </div>
      <button onClick={enrollReview}>작성하기</button>
      <div>
        {getReview.map((el: any) => (
          <ReviewList key={el.reviewId} data={el} />
        ))}
      </div>
    </div>
  );
};

export default ReviewMember;

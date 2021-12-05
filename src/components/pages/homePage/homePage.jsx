import React, { useEffect, useRef, useState } from "react";
import "./homePage.css";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SecondBar from "./secondBar";
import { mixUserCard as getMyHomeRecommend } from "../../../services/homeService";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, Link } from "react-router-dom";

const HomePage = ({ siderBarState }) => {
  const [mixUserCard, setMixUserCard] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const index = useRef(20);
  let location = useLocation();

  useEffect(() => {
    setMixUserCard(getMyHomeRecommend.slice(0, index.current));
  }, []);

  const fetchMoreData = () => {
    if (mixUserCard.length >= getMyHomeRecommend.length) {
      setHasMore(false);
      return;
    }

    const addCards = getMyHomeRecommend.slice(index.current, index.current * 2);

    setTimeout(() => {
      setMixUserCard((card) => card.concat(addCards));
    }, 2000);
  };

  return (
    <div>
      <SecondBar />
      <div style={{ minHeight: 55 }} />
      <div className="cardBackground">
        <InfiniteScroll
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          dataLength={mixUserCard.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
          scrollableTarget="scrollableDiv"
        >
          {mixUserCard.map((card) => (
            <Link
              // onClick={() => handlePopupData(card)}
              className="cardLink"
              key={card.user.id}
              to={{
                pathname: `/gallery/${card.user.username}`,
                state: { background: location },
                popupdata: card,
              }}
            >
              <div
                className={`
        cardRoot 
        ${siderBarState ? "cardRoot-sideHidden" : ""}
        `}
              >
                <div className="cardContent">
                  <div
                    className={`cardImg-gradient
            ${siderBarState ? "cardImg-gradient-hidden" : ""}`}
                  >
                    <img
                      className={`
              cardImg
              ${siderBarState ? "cardImg-hidden" : ""}
              `}
                      src={card.recommed.cardImage}
                      alt=""
                    />
                    <div className="cardCategory-container">
                      <PhotoSizeSelectActualOutlinedIcon className="cardCategory" />
                    </div>
                    <div className="cardhandle-click">
                      <MoreHorizIcon className="cardhandle" />
                    </div>
                  </div>
                  <div className="cardTitle-Container">
                    <p className="cardTitle">{card.recommed.cardTitle}</p>
                  </div>
                </div>
                <div className="cardBottom">
                  <div className="cardAvatar-Container">
                    <Avatar className="cardAvatar" src={card.user.avatar} />
                    <span className="cardAvatar-Name">
                      {card.user.username}
                    </span>
                  </div>
                  <div className="goodAndView">
                    <VisibilityIcon className="cardIcon" />
                    <span className="goodAndView-span">
                      {card.recommed.watch}
                    </span>
                    <FavoriteIcon className="cardIcon cardIcon-heart" />
                    <span className="goodAndView-span">
                      {card.recommed.like}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomePage;

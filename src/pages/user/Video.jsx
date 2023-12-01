import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Card } from "../../components/user";
import { cardsData } from "../../utility/data";
import { Play, lockscreen } from "../../assets/icons/user";
import { CheckoutForm, CustomModal, Input } from "../../components/common";
import { useLocation } from "react-router";
import { useModal } from "../../utility/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecommendedPrograms,
  getUserProgramList,
  userViewCount,
} from "../../redux/thunk/user/usrPrograms";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from "react-share";
import "../../styles/user/video.scss";
import { loadStripe } from "@stripe/stripe-js";
import { FieldArray } from "formik";

const stripePromise = loadStripe(
  "pk_test_51NsgDPSGZG5DL3XoTSBKwQDGmbwM1ZVynvfuy5gqwnrlzfScPgsXpWHqDhv6ClIUZpJkDlJZBM4Qai0qUlRsCJHU004QV7HMdi"
);

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [IsExpanded, setIsExpanded] = useState(false);
  const [itemsToLoad, setItemsToLoad] = useState(5);
  const [startTime, setStartTime] = useState(0);

  //Redux state
  const {
    userAuthtoken,
    userData: { user_id },
  } = useSelector((state) => state.userAuth);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Router functions
  const location = useLocation();
  const { state } = location;
  const { data2send } = state;
  const {
    thumbnail_url,
    description,
    title,
    videoId,
    speaker,
    price,
    course_type,
    video_duration,
    views,
    episodes,
    category,
  } = data2send.values;

  const { userRecommendedPrograms } = useSelector(
    (state) => state.userPrograms
  );

  const { data: recommendedList } = userRecommendedPrograms;

  const data = {
    categories: category,
    userAuthtoken,
  };

  let shareUrl = window.location;

  useEffect(() => {
    dispatch(getRecommendedPrograms(data));
  }, []);

  //Ref
  const playerRef = React.useRef();

  //Custom hooks
  const {
    show,
    handleClose,
    handleShow,
    shareShow,
    handleShareClose,
    handleShareShow,
  } = useModal();

  //Methods
  const toggleExpand = () => {
    setIsExpanded(!IsExpanded);
  };

  const loadMore = () => {
    setItemsToLoad(itemsToLoad + 5);
  };
  const loadLess = () => {
    setItemsToLoad(itemsToLoad - 5);
  };

  const handlePlayPause = () => {
    const data = {
      userAuthtoken,
      values: {
        videoId: videoId,
        userId: user_id,
      },
    };
    dispatch(userViewCount(data)).then(({ payload }) => {
      if (payload) {
        setIsPlaying(!isPlaying);
      }
    });
    // dispatch(getUserProgramList(data));
  };

  const calculateSeekTime = (start) => {
    const startTime = start || start;
    console.log("Seeking to time:", startTime);
    const midpoint = startTime;
    return Number.isFinite(midpoint) ? midpoint : startTime;
  };

  const handleSetStartTime = (start) => {
    console.log("Setting start time to:", start);

    // Convert start to seconds
    const startTimeInSeconds = convertTimeStringToSeconds(start);

    if (isPlaying && Number.isFinite(startTimeInSeconds)) {
      console.log("Seeking to time:", startTimeInSeconds);
      playerRef?.current?.seekTo(startTimeInSeconds);
    } else {
      console.error(
        "Invalid time value or video is not playing:",
        start,
        isPlaying
      );
    }

    setStartTime(start);
  };
  const handleSetTimeRange = (start, end) => {
    console.log("Setting time range:", start, "to", end);

    // Convert start and end to seconds
    const startTimeInSeconds = convertTimeStringToSeconds(start);
    const endTimeInSeconds = convertTimeStringToSeconds(end);

    if (
      isPlaying &&
      Number.isFinite(startTimeInSeconds) &&
      Number.isFinite(endTimeInSeconds)
    ) {
      console.log(
        "Seeking to time range:",
        startTimeInSeconds,
        "to",
        endTimeInSeconds
      );

      // Seek to the start time
      playerRef?.current?.seekTo(startTimeInSeconds);

      // You may also want to play the video here
      // playerRef?.current?.seekTo(startTimeInSeconds, 'seconds');
      // playerRef?.current?.play();

      // You can set up an event listener to pause the video when it reaches the end time
    } else {
      console.error(
        "Invalid time values or video is not playing:",
        start,
        end,
        isPlaying
      );
    }

    // Set the start time in the state
    setStartTime(start);
  };

  // Function to convert time string (e.g., "00:10") to seconds
  const convertTimeStringToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  };
  const handleVideoProgress = (progress) => {
    // Your logic based on the progress object
    console.log("Current played seconds:", progress.playedSeconds);
  };

  return (
    <>
      <CustomModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        modalHead="Payment Screen"
        className="user_modal"
      >
        <CheckoutForm
          amount={price}
          programId={videoId}
          onCancel={() => handleClose()}
        />
      </CustomModal>

      <section
        style={{
          borderBottom: 1,
          borderWidth: 1,
          borderColor: "red",
        }}
        className="videoWrapper py-5"
      >
        <Container>
          <Row>
            <Col md={7}>
              <div
                className="videoWrapper__left"
                style={{
                  position: "relative",
                }}
              >
                {course_type === "Paid" ? (
                  <>
                    <Image src={lockscreen} className="lock-screen" />
                    <Image src={thumbnail_url} className="videoImg img-fluid" />
                  </>
                ) : (
                  <ReactPlayer
                    playing={true}
                    // onPlay={handleClick}
                    // onStart={handlePlayPause}
                    ref={playerRef}
                    // playing={isPlaying}
                    controls={true}
                    url={`http://dummyapi.xyz/user/web/video_stream/${videoId}`}
                    onStart={() => playerRef?.current?.seekTo(startTime)}
                    // onProgress={(progress) => handleVideoProgress(progress)}
                  />
                )}
                {/* <button onClick={handlePlayPause}>
                  {isPlaying ? "Pause" : "Play"}
                </button> */}
              </div>
            </Col>

            <Col md={5}>
              <div className="videoWrapper__right">
                <div className="videoWrapper__caption">
                  <small>{speaker} | Interface, Experience</small>
                  <h1>{title}</h1>

                  <div className="videoWrapper__caption__descp">
                    <h4>Description</h4>
                    <p>{description}</p>
                    <button onClick={toggleExpand}>
                      {IsExpanded ? "Read Less" : "Read More"}
                    </button>
                  </div>

                  <div className="videoWrapper__caption__midbuttons">
                    <div className="midbuttons__left">
                      <span className="videoLength">{video_duration}</span>
                      <span className="videoViews">{views} views</span>
                    </div>
                    <div className="midbuttons__right">
                      <button className="mid--btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="me-2"
                        >
                          <g opacity="0.5">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.8332 15.8046L11.1575 15.5544C11.5219 15.2733 12.0452 15.3408 12.3263 15.7052C12.6074 16.0696 12.5399 16.5929 12.1755 16.874L10.523 18.1489C10.4727 18.1894 10.4186 18.2235 10.3617 18.2508C10.3171 18.2733 10.2573 18.2954 10.1948 18.3104C10.1144 18.3292 10.0372 18.336 9.96063 18.3324C9.84314 18.3269 9.73201 18.2972 9.63215 18.248C9.57742 18.2211 9.52523 18.1881 9.47672 18.1489L7.82416 16.874C7.45976 16.5929 7.39224 16.0696 7.67336 15.7052C7.95448 15.3408 8.47778 15.2733 8.84218 15.5544L9.1665 15.8046V7.04755C9.1665 6.58731 9.5396 6.21421 9.99984 6.21421C10.4601 6.21421 10.8332 6.58731 10.8332 7.04755V15.8046ZM10.4165 1.66663C12.5506 1.66663 14.3645 3.13417 14.8639 5.14359C16.8695 5.64459 18.3332 7.46169 18.3332 9.59829C18.3332 11.9438 16.5689 13.9056 14.2583 14.1616C13.8008 14.2122 13.3889 13.8825 13.3382 13.425C13.2876 12.9676 13.6173 12.5557 14.0747 12.505C15.5427 12.3424 16.6665 11.0928 16.6665 9.59829C16.6665 8.0978 15.5339 6.84497 14.0587 6.68982C13.6673 6.64865 13.358 6.33927 13.317 5.94786C13.1621 4.46815 11.9121 3.33329 10.4165 3.33329C8.9196 3.33329 7.66894 4.47008 7.5156 5.95138C7.46779 6.41326 7.05169 6.74696 6.59045 6.69333C6.47812 6.68027 6.36448 6.67368 6.24984 6.67368C4.6394 6.67368 3.33317 7.98268 3.33317 9.59829C3.33317 11.0928 4.45702 12.3424 5.92492 12.505C6.38236 12.5557 6.71211 12.9676 6.66144 13.425C6.61076 13.8825 6.19886 14.2122 5.74142 14.1616C3.4308 13.9056 1.6665 11.9438 1.6665 9.59829C1.6665 7.14577 3.58636 5.14178 6.00346 5.01354C6.54738 3.0713 8.32858 1.66663 10.4165 1.66663Z"
                              fill="#BDB3C7"
                            />
                          </g>
                        </svg>
                        Download
                      </button>
                      <button className="mid--btn" onClick={handleShareShow}>
                        Share
                      </button>

                      <CustomModal
                        show={shareShow}
                        handleShow={handleShareShow}
                        handleClose={handleShareClose}
                        modalHead="Share"
                        className="user_modal"
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "200px",

                            gap: 20,
                          }}
                          className="Demo__container"
                        >
                          <div className="Demo__some-network">
                            <FacebookShareButton
                              url={shareUrl}
                              className="Demo__some-network__share-button"
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>

                            <div>
                              <FacebookShareCount
                                url={shareUrl}
                                className="Demo__some-network__share-count"
                              >
                                {(count) => count}
                              </FacebookShareCount>
                            </div>
                          </div>

                          <div className="Demo__some-network">
                            <FacebookMessengerShareButton
                              url={shareUrl}
                              appId="521270401588372"
                              className="Demo__some-network__share-button"
                            >
                              <FacebookMessengerIcon size={32} round />
                            </FacebookMessengerShareButton>
                          </div>

                          <div className="Demo__some-network">
                            <TwitterShareButton
                              url={shareUrl}
                              title={title}
                              className="Demo__some-network__share-button"
                            >
                              <XIcon size={32} round />
                            </TwitterShareButton>
                          </div>

                          <div className="Demo__some-network">
                            <WhatsappShareButton
                              url={shareUrl}
                              title={title}
                              separator=":: "
                              className="Demo__some-network__share-button"
                            >
                              <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                          </div>

                          <div className="Demo__some-network">
                            <LinkedinShareButton
                              url={shareUrl}
                              className="Demo__some-network__share-button"
                            >
                              <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                          </div>

                          <div className="Demo__some-network">
                            <MailruShareButton
                              url={shareUrl}
                              title={title}
                              className="Demo__some-network__share-button"
                            >
                              <MailruIcon size={32} round />
                            </MailruShareButton>
                          </div>

                          <div className="Demo__some-network">
                            <EmailShareButton
                              url={shareUrl}
                              subject={title}
                              body="body"
                              className="Demo__some-network__share-button"
                            >
                              <EmailIcon size={32} round />
                            </EmailShareButton>
                          </div>
                        </div>
                      </CustomModal>
                    </div>
                  </div>

                  <div className="videoWrapper__caption__timecodec">
                    <h4>Time Codes</h4>
                    {/* <FieldArray name="episodes"> */}
                    {/* {({ insert, remove, push }) => ( */}
                    <div>
                      {episodes.map(({ title, start, end }) => (
                        <div className="timecodec__list" key={title}>
                          <button
                            className="timecodecBtn"
                            onClick={() => handleSetTimeRange(start, end)}
                            // onClick={() => playerRef?.current?.seekTo(start)}
                          >
                            <figure>
                              <Play />
                            </figure>
                            <div className="timecodecBtn__caption">
                              <h2>{title}</h2>
                              <span>{start}</span>
                              <span>{end}</span>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {course_type === "Paid" && (
                      <button className="buyBtn" onClick={handleShow}>
                        Buy For ${parseInt(price) / 100}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="video-information"></div>
      </section>

      <section className="popular-section popular-section1">
        <Container>
          <div className="title-block title-block-border">
            <h1 className="text-white">You might also like</h1>

            <div className="d-flex justify-content-between align-items-center">
              <div className="text-block pe-5">
                <p className="text-white mb-0">
                  The Screeno ecosystem is designed to help you generate
                  profit.Setup complete sales and marketing funnels with ease
                  using the Screeno
                </p>
              </div>
              {itemsToLoad < cardsData.length && (
                <button onClick={loadMore} className="view-All-btn">
                  View All
                </button>
              )}

              {itemsToLoad > 5 && (
                <button onClick={loadLess} className="view-All-btn">
                  View Less
                </button>
              )}
            </div>
          </div>
          <Row className="popular-row">
            {console.log(recommendedList, "recomendedlist")}
            {recommendedList
              ?.slice(0, itemsToLoad)
              ?.map(
                (
                  {
                    id,
                    title,
                    image,
                    duration,
                    views,
                    description,
                    watched,
                    url,
                    subsType,
                    amount,
                    thumbnail_url,
                  },
                  index
                ) => (
                  <Card
                    url={url}
                    key={id}
                    title={title}
                    thumbnail_url={thumbnail_url}
                    duration={duration}
                    views={views}
                    watched={watched}
                    subsType={subsType}
                    amount={amount}
                    description={description}
                  />
                )
              )}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default VideoPlayer;

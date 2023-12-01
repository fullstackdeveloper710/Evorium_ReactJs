import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
// import ReactPlayer from "react-player";

import {
  bannner,
  tv,
  ecobank,
  orange,
  android,
  iphone,
  team1,
  video_homescreen,
} from "../../assets/images/user";

import {
  downarrow,
  insta,
  UploadIcon,
  MoneterizationIcon,
  StreamIcon,
  PlayStore,
  Apple,
} from "../../assets/icons/user";
import { Card, Slider } from "../../components/user";
import { cardsData } from "../../utility/data";
import { useDispatch, useSelector } from "react-redux";
import { getUserProgramList } from "../../redux/thunk/user/usrPrograms";
import { useTranslation } from "react-i18next";
import "../../styles/user/home.scss";

function Home() {
  const [itemsToLoad, setItemsToLoad] = useState(5);

  // i18n translator functions
  const { t, i18n } = useTranslation();

  //Redux state
  const { userAuthtoken } = useSelector((state) => state.userAuth);
  const { userFreePrograms } = useSelector((state) => state.userPrograms);
  const { data } = userFreePrograms;

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Methods
  useEffect(() => {
    const data = {
      userAuthtoken,
      values: {
        course_type: "Free",
      },
    };
    dispatch(getUserProgramList(data));
  }, [userAuthtoken, dispatch]);

  const loadMore = () => {
    setItemsToLoad(itemsToLoad + 5);
  };
  const loadLess = () => {
    setItemsToLoad(itemsToLoad - 5);
  };

  return (
    <>
      <section className="banner-home">
        <Image
          src={bannner}
          className="bannerImg img-fluid d-none d-md-block"
        />
        <Container>
          <Row>
            <Col md={6} sm={12}>
              <div className="text-block">
                <h1>{t("usrHomeHeading")}</h1>
                <p>{t("usrHomeSubHeading")}</p>
                <img
                  src={bannner}
                  class="bannerImg img-fluid d-block d-md-none mb-4"
                ></img>
                <div className="btns-group">
                  <a href="void 0" className="try-btn">
                    {t("tryForFree")}
                  </a>
                  <a href="void 0" target="_blank" className="aple">
                    {/* <Image src={appleStore} /> */}
                    <Apple />
                  </a>
                  <a href="void 0" target="_blank" className="gpay">
                    {/* <Image src={googleplay} /> */}
                    <PlayStore />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <main>
        <section className="platform-section">
          <Container>
            <div className="title-block">
              <h3>{t("platformHead")}</h3>
              <p>{t("platformSubHead")}</p>
            </div>
            <Row>
              <Col md={8}>
                <div className="video-wrapper">
                  {/* <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" /> */}
                  <Image src={video_homescreen} />
                </div>
              </Col>
              <Col md={4}>
                <div className="right-text">
                  <div className="card-all">
                    <h4>
                      <span className="cardIcon">
                        <UploadIcon />
                      </span>
                      {t("uploadAndOrganize")}
                    </h4>
                    <p>{t("uploaqInBulk")}</p>
                  </div>
                  <div className="card-all">
                    <h4>
                      <span className="cardIcon">
                        <MoneterizationIcon />
                      </span>
                      {t("monetization")}
                    </h4>
                    <p>{t("monetizationSub")}</p>
                  </div>
                  <div className="card-all">
                    <h4>
                      <span className="cardIcon">
                        <StreamIcon />
                      </span>
                      {t("streamOnDemand")}
                    </h4>
                    <p>{t("streamOnDemandSub")}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {data?.length > 0 && (
          <section className="popular-section">
            <Container>
              <div className="title-block">
                <h2 className="text-white" id="popular">
                  {t("mostPopular")}
                  <Image src={downarrow} />
                </h2>
                <a href="/programs" className="view-all-link">
                  {t("viewAll")}
                </a>
              </div>

              <Row className="popular-row">
                {data
                  .slice(0, itemsToLoad)
                  .map(
                    (
                      {
                        id,
                        title,
                        thumbnail_url,
                        video_duration,
                        views,
                        description,
                        watched,
                        url,
                        course_type,
                        price,
                      },
                      index
                    ) => (
                      <Card
                        url={url}
                        key={id}
                        title={title}
                        thumbnail_url={thumbnail_url}
                        duration={video_duration}
                        views={views}
                        watched={watched}
                        course_type={course_type}
                        price={price}
                        description={description}
                      />
                    )
                  )}
              </Row>
              <div className="text-center loadBtnWrap pt-5">
                {itemsToLoad < data.length && (
                  <button onClick={loadMore} className="load-more-btn">
                    {t("loadMore")}
                  </button>
                )}

                {itemsToLoad > 5 && (
                  <button
                    onClick={loadLess}
                    className="load-more-btn"
                    id="popular"
                  >
                    Load Less
                  </button>
                )}
              </div>
            </Container>
          </section>
        )}

        {/* slider here */}
        <Slider />
        <section className="our-star-team-section circle-right">
          <Container>
            <div className="title-block text-center text-white">
              <h3>{t("starTeam")}</h3>
              <p>
              {t("starTeamDescription")}
              </p>
            </div>
            <Row className="row-team pt-5">
              <Col md={3}>
                <div className="team-card">
                  <div className="card-head">
                    <Image src={team1} className="card-imgs" />
                    <a href="void 0" className="insta-link">
                      <Image src={insta} />
                    </a>
                  </div>
                  <div className="card-bottom text-center text-white">
                    <h5>
                      {t("starTeamName")}
                      <br /> {t("starTeamSurname")}
                    </h5>
                    <p>
                     {t("starTeamContent")}
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="team-card">
                  <div className="card-head">
                    <Image src={team1} className="card-imgs" />
                    <a href="void 0" className="insta-link">
                      <Image src={insta} />
                    </a>
                  </div>
                  <div className="card-bottom text-center text-white">
                    <h5>
                    {t("starTeamName")}
                      <br /> {t("starTeamSurname")}
                    </h5>
                    <p>
                    {t("starTeamContent")}
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="team-card">
                  <div className="card-head">
                    <Image src={team1} className="card-imgs" />
                    <a href="void 0" className="insta-link">
                      <Image src={insta} />
                    </a>
                  </div>
                  <div className="card-bottom text-center text-white">
                    <h5>
                    {t("starTeamName")}
                      <br /> {t("starTeamSurname")}
                    </h5>
                    <p>
                    {t("starTeamContent")}
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="team-card">
                  <div className="card-head">
                    <Image src={team1} className="card-imgs" />
                    <a href="void 0" className="insta-link">
                      <Image src={insta} />
                    </a>
                  </div>
                  <div className="card-bottom text-center text-white">
                    <h5>
                    {t("starTeamName")}
                      <br /> {t("starTeamSurname")}
                    </h5>
                    <p>
                    {t("starTeamContent")}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="our-partners-section">
          <Container>
            <div className="title-block text-center">
              <h2 className="text-white">{t("ourPartners")}</h2>
              <p className="text-white">
               {t("ourPartnersDescription")}
              </p>
            </div>
            <div className="row align-items-center pt-5">
              <div className="card-partner">
                <Image src={tv} />
              </div>
              <div className="card-partner">
                <Image src={orange} />
              </div>
              <div className="card-partner">
                <Image src={ecobank} />
              </div>
              <div className="card-partner">
                <Image src={iphone} />
              </div>
              <div className="card-partner">
                <Image src={android} />
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}

export default Home;

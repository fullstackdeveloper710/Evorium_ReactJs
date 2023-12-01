import React from "react";
import { Image } from "react-bootstrap";
import { checked, paused } from "../../assets/icons/user";

const Card = (props) => {
  const {
    onClick,
    title,
    video_duration,
    views,
    watched,
    description,
    course_type,
    price,
    thumbnail_url,
  } = props;
  return (
    <div onClick={onClick} className="subs-card free-card">
      <div className="card-wrapper">
        <div className="img-wrap">
          {/* <ReactPlayer url={url} width={'100%'} light={true} className="bg-img"  /> */}
          <div className="bg-img">
            <img src={thumbnail_url} alt="thumbnail" />
          </div>

          {course_type === "free" || course_type === "Free" ? (
            <span className="free-btn">{course_type}</span>
          ) : (
            <span className="premium-btn">{price}</span>
          )}

          <Image src={watched ? checked : paused} className="label-watch" />
        </div>
        <div className="bottom-details">
          <p className="name">{title}</p>
          <a href="void 0" className="link-card">
            {description}
          </a>
          <div className="time-view">
            <span className="mins">{video_duration} mins </span>
            <span className="views">{views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

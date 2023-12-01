import React, { useCallback, useState } from "react";
import { Image } from "react-bootstrap";
import { upload } from "../../assets/icons/admin";
import { useDropzone } from "react-dropzone";
import { dataURLtoFile } from "../../utility/methods";
import ReactPlayer from "react-player";

const VideoUploader = ({
  video,
  setFieldValue,
  thumbnails,
  disabled,
  videoUrl,
  videoTitle,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFieldValue("video", file);
      setLoading(true);

      const videoBlob = URL.createObjectURL(file);

      const video = document.createElement("video");
      video.src = videoBlob;

      video.addEventListener("loadeddata", async () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const thumbnailTimes = [0.25, 0.5];
        const thumbnails = [];

        const captureFrame = async (time) => {
          return await new Promise((resolve) => {
            video.currentTime = (time / 100) * video.duration;

            video.addEventListener("seeked", () => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnailDataUrl = canvas.toDataURL("image/png");
              thumbnails.push(thumbnailDataUrl);
              resolve();
            });

            video.addEventListener("error", () => resolve());
          });
        };

        let capturedFrames = 0;
        const totalFrames = thumbnailTimes.length;

        const updateProgress = () => {
          const progress = Math.floor((capturedFrames / totalFrames) * 100);
          setUploadProgress(progress);
        };

        for (const time of thumbnailTimes) {
          await captureFrame(time);
          capturedFrames++;
          updateProgress();
        }

        setFieldValue("thumbnails", thumbnails);
        video.pause();
        setLoading(false);
        setUploadProgress(0);
      });
    },
    [setFieldValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return !videoUrl ? (
    <>
      <div
        className="video_upload_wrap"
        {...getRootProps()}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={dropzoneStyles}
      >
        <div className="upload_input">
          <input
            type="file"
            id="video"
            className="d-none"
            {...getInputProps({ disabled })}
          />
          <label htmlFor="video">
            <Image src={upload} />
            <span className="upload_title">Upload Video</span>
          </label>
        </div>

        <div className={`uploaded_videos_wrap ${loading ? "" : "d-none"}`}>
          <Image src={video} />
          <div className="loader_block">
            <span className="loader">{`${uploadProgress}%`}</span>
          </div>
        </div>
      </div>
      {video && !loading && (
        <div className="select_thumbnail">
          <p>Select Thumbnail</p>
          <div className="select_thumbnail_imgs">
            {thumbnails.map((thumbnail, index) => (
              <button
                type="button"
                className="thumbnail_link"
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  const file = dataURLtoFile(
                    thumbnail,
                    `Thumbnail ${index + 1}`
                  );
                  setFieldValue("selectedThumbnail", file);
                }}
              >
                <Image src={thumbnail} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
          <button className="done_btn">Done</button>
        </div>
      )}
    </>
  ) : (
    <div className="video_upload_wrap">
      <div className="upload_input">
        <label htmlFor="video">
          <ReactPlayer
            width="100%"
            height="100%"
            controls={true}
            url={videoUrl}
          />
          <span className="upload_title">{videoTitle}</span>
        </label>
      </div>
    </div>
  );
};

const dropzoneStyles = {
  border: "none",
  borderRadius: "4px",
  textAlign: "center",
  padding: "20px",
  cursor: "pointer",
};

export default VideoUploader;

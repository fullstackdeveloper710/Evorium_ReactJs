import moment from "moment/moment";

export const totalItems = 12;
export const itemsPerPage = 4;

export const dateFormater = (value) => {
  const dateFormat = "DD/MM/YYYY";
  return moment(value).format(dateFormat);
};

export const getMinutes = (milliSeconds) => {
  let minutes = Math.floor(+milliSeconds / 60000);
  let seconds = ((milliSeconds % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const getStartAndEndTime = (type, data) => {
  if (type === "string") {
    return data.episodes.map((item) => {
      return {
        title: item.title,
        start: `${item.startTime.hours}:${item.startTime.minutes}:${item.startTime.seconds}`,
        end: `${item.endTime.hours}:${item.endTime.minutes}:${item.endTime.seconds}`,
      };
    });
  } else {
    return data.map((item, index) => {
      const start = item.start.trim().split(":");
      const end = item.end.trim().split(":");
      return {
        title: item.title,
        label: `episode ${index + 1}`,
        startTime: {
          hours: start[0],
          minutes: start[1],
          seconds: start[2],
        },
        endTime: {
          hours: end[0],
          minutes: end[1],
          seconds: end[2],
        },
      };
    });
  }
};

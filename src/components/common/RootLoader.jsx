import ReactDOM from "react-dom";
import { Circles } from "react-loader-spinner";
import { useSelector } from "react-redux";
function RootLoader() {
  const { rootLoader } = useSelector((state) => state.app);
  // Creating a portal
  if (rootLoader) {
    return ReactDOM.createPortal(
      <div className="main_loader">
        <Circles
          height="80"
          width="80"
          color="#1f043b"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>,
      document.getElementById("root-loader")
    );
  } else {
    return null;
  }
}

export default RootLoader;

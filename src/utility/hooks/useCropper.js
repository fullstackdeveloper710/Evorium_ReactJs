const useCropper = () => {
  const updateCroppedImg = (croppedImage) => {
    // setFormData((prev) => {
    //   return {
    //     ...prev,
    //     croppedImage: croppedImage,
    //   };
    // });
    // setShowCropper(false);
    console.log("update croper btn click");
  };

  const cancelCrop = () => {
    // setShowCropper(false);
    // setFormData((prev) => {
    //   return {
    //     ...prev,
    //     file: null,
    //   };
    // });
    console.log("cancel btn click");
  };
  return {
    updateCroppedImg,
    cancelCrop,
  };
};

export default useCropper;

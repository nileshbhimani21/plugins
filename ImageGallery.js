import { IconButton } from "@mui/material";
import { useState } from "react";
import { API_ROOT } from "../utils/config";
import MyDialog from "./MyDialog";
import { NavigateNextIcon, PDFFillIcon } from "./Icons";
import { useTheme } from "@emotion/react";

const ImageGallery = ({ open, images = [], setIsModal, active = 1 }) => {
  const { palette } = useTheme();
  const [slideIndex] = useState(active);

  const nextSlide = () => {
    if (active !== images.length) {
      setIsModal((prev) => {
        return { ...prev, active: active + 1 };
      });
    } else if (active === images.length) {
      setIsModal((prev) => {
        return { ...prev, active: 1 };
      });
    }
  };

  const prevSlide = () => {
    if (active !== 1) {
      setIsModal((prev) => {
        return { ...prev, active: active - 1 };
      });
    } else if (slideIndex === 1) {
      setIsModal((prev) => {
        return { ...prev, active: images.length };
      });
    }
  };

  return (
    <MyDialog
      maxWidth="md"
      open={open}
      handleClose={() => setIsModal({ type: "", open: false, active: 1 })}
      sx={{
        "& .MuiDialog-container .MuiPaper-root": {
          margin: 0,
          maxWidth: "100%",
          width: "100%",
          background: "#0006",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        },
        "& .MuiIconButton-root": {
          background: palette.white.main
        }
      }}
    >
      <div className="container-slider">
        {images.length > 0 &&
          images?.map((obj, index) => {
            return obj.type === "application/pdf" || obj.contentType === "application/pdf" ? (
              <a
                key={index}
                href={obj?.fileUrl ? API_ROOT + obj?.fileUrl : URL.createObjectURL(obj)}
                target="_blank"
                rel="noreferrer"
                className={active === index + 1 ? "slide active" : "slide"}
              >
                <PDFFillIcon width="100px" height="100px" color={palette.white.main} />
              </a>
            ) : (
              <div key={index} className={active === index + 1 ? "slide active" : "slide"}>
                <img src={obj?.fileUrl ? API_ROOT + obj?.fileUrl : URL.createObjectURL(obj)} alt="carosel docs" />
              </div>
            );
          })}
        <IconButton className="slider-btn next" onClick={nextSlide} sx={{ background: palette.white.main }}>
          <NavigateNextIcon color={palette.primary.main} />
        </IconButton>
        <IconButton className="slider-btn prev" onClick={prevSlide} sx={{ background: palette.white.main }}>
          <NavigateNextIcon color={palette.primary.main} />
        </IconButton>
      </div>
    </MyDialog>
  );
};

export default ImageGallery;
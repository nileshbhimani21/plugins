
import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";

export default function DropBox({ onChange, value, multiple, required, accept, acceptArry }) {
  const uploadRef = useRef(null);
  const { palette } = useTheme();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      uploadRef?.current.classList.add("active");
    } else if (e.type === "dragleave") {
      uploadRef?.current.classList.remove("active");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadRef?.current.classList.remove("active");
    if (e.dataTransfer.files) {
      handleUploader(e.dataTransfer.files);
    }
  };

  const handleUploader = async (e) => {
    let arr = [];
    await Object.values(e).forEach((x) => {
      if (acceptArry.includes(x.type.split("/")[1])) {
        if (x?.size <= 2000000) {
          arr.push(x);
        } else {
          toast.error("Please Select image of size max 2MB.");
        }
      } else {
        toast.error(`Only ${acceptArry.toString()} files are allowed!`);
      }
    });
    await onChange(arr);
  };

  return (
    <>
      <Box
        className="dragDropFile"
        ref={uploadRef}
        sx={{
          background: palette.background.default,
          p: 2,
          border: `2px dashed ${palette.grey.light}`,
          "&.active": {
            background: "#e9f4ff",
            border: `1px dashed #bdd7f1`
          }
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "600", fontStyle: "italic" }}>
          Drag & Drop here {required && <span className="danger mr-0">*</span>}
          <br />
          or <span style={{ color: palette.warning.main, textDecoration: "underline" }}>Browse files</span>
        </Typography>
        <input
          onDragEnter={(e) => handleDrag(e)}
          onDragLeave={(e) => handleDrag(e)}
          onDragOver={(e) => handleDrag(e)}
          onDrop={(e) => handleDrop(e)}
          title=" "
          type="file"
          value={value || ""}
          onChange={(e) => handleUploader(e.target.files)}
          multiple={multiple ? true : false}
          accept={accept}
        />
      </Box>
    </>
  );
}
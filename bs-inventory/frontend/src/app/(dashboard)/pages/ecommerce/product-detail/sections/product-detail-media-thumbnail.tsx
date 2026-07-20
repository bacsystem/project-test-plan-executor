import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Box, Button, Grid, Typography } from "@mui/material";

import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiPen from "@/icons/nexture/ni-pen";
import NiPlus from "@/icons/nexture/ni-plus";

export default function ProductDetailMediaThumbnail() {
  const [file, setFile] = useState<any & { preview: string }>({
    path: "/images/products/product-5-horizontal.jpg",
    relativePath: "./images/products/product-5-horizontal.jpg",
    preview: "/images/products/product-5-horizontal.jpg",
    name: "product-5-horizontal.jpg",
    size: 34208,
    type: "image/jpeg",
  });

  useEffect(() => {
    return () => file && URL.revokeObjectURL(file.preview);
  }, [file]);

  const handleRemoveImage = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const newFile = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      setFile(newFile);
    },
  });

  return (
    <Box className="mb-6">
      <Box className="flex flex-row items-start justify-between">
        <Typography variant="h6" component="h6" className="card-title">
          Thumbnail
        </Typography>
        <Button
          className="icon-only"
          size="small"
          color="grey"
          variant="text"
          startIcon={file ? <NiPen size={"small"} /> : <NiPlus size={"small"} />}
          onClick={open}
        />
      </Box>
      <Grid container size={12} spacing={2.5} {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Grid size={{ xs: 12, sm: 6, md: 4, xl: 12 }}>
          {file ? (
            <Box className="border-grey-50 rounded-lg border p-3">
              <img alt={file.name} src={file.preview} className="h-64 w-full rounded-sm object-cover" />
              <Box className="flex flex-row items-start justify-between p-4">
                <Box className="flex flex-col">
                  <Typography variant="body1" component="div">
                    {file.name}
                  </Typography>
                  <Typography variant="body1" component="div" className="text-text-secondary">
                    {Math.round(file.size / 1000)} KB
                  </Typography>
                </Box>
                <Button
                  className="icon-only"
                  size="small"
                  color="grey"
                  variant="text"
                  onClick={handleRemoveImage}
                  startIcon={<NiBinEmpty size={"small"} />}
                />
              </Box>
            </Box>
          ) : (
            <Box
              className="border-grey-200 hover:border-grey-500 flex min-h-22.5 cursor-pointer flex-row flex-wrap gap-2.5 rounded-md border p-4 transition-all"
              onClick={open}
            >
              <Typography variant="body1" className="pointer-events-none w-full self-center text-center">
                Add a Thumbnail
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

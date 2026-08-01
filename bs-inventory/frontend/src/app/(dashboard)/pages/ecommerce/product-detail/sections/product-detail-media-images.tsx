import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Box, Button, Grid, Typography } from "@mui/material";

import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiPlus from "@/icons/nexture/ni-plus";

export default function ProductDetailMediaImages() {
  const [files, setFiles] = useState<(any & { preview: string })[]>([
    {
      path: "/images/products/product-5-horizontal.jpg",
      relativePath: "./images/products/product-5-horizontal.jpg",
      preview: "/images/products/product-5-horizontal.jpg",
      name: "product-5-horizontal.jpg",
      size: 34208,
      type: "image/jpeg",
    },
    {
      path: "/images/products/product-6-horizontal.jpg",
      relativePath: "./images/products/product-6-horizontal.jpg",
      preview: "/images/products/product-6-horizontal.jpg",
      name: "product-6-horizontal.jpg",
      size: 35300,
      type: "image/jpeg",
    },
    {
      path: "/images/products/product-7-horizontal.jpg",
      relativePath: "./images/products/product-7-horizontal.jpg",
      preview: "/images/products/product-7-horizontal.jpg",
      name: "product-7-horizontal.jpg",
      size: 26400,
      type: "image/jpeg",
    },
    {
      path: "/images/products/product-8-horizontal.jpg",
      relativePath: "./images/products/product-8-horizontal.jpg",
      preview: "/images/products/product-8-horizontal.jpg",
      name: "product-8-horizontal.jpg",
      size: 28200,
      type: "image/jpeg",
    },
  ]);

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleRemoveImage = (file: any) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.name != file.name));
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const newFiles: any[] = [];
      acceptedFiles.map((file) => {
        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        newFiles.push(newFile);
      });
      setFiles([...files, ...newFiles]);
    },
  });

  return (
    <Box>
      <Box className="flex flex-row items-start justify-between">
        <Typography variant="h6" component="h6" className="card-title">
          Images
        </Typography>
        <Button
          className="icon-only"
          size="small"
          color="grey"
          variant="text"
          startIcon={<NiPlus size={"small"} />}
          onClick={open}
        />
      </Box>

      <Grid container size={12} spacing={2.5} {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {files.length > 0 ? (
          files.map((file) => {
            return (
              <Grid key={file.name} size={{ "3xl": 6, xs: 12, sm: 6, md: 4, xl: 12 }}>
                <Box className="border-grey-50 h-full rounded-lg border p-3">
                  <img alt={file.name} src={file.preview} className="h-32 w-full rounded-sm object-cover" />
                  <Box className="flex flex-row items-start justify-between p-4">
                    <Box className="flex flex-col">
                      <Typography variant="body1" component="div" className="line-clamp-2">
                        {file.name}
                      </Typography>
                      <Typography variant="body2" component="div" className="text-text-secondary">
                        {Math.round(file.size / 1000)} KB
                      </Typography>
                    </Box>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRemoveImage(file);
                      }}
                      startIcon={<NiBinEmpty size={"small"} />}
                    />
                  </Box>
                </Box>
              </Grid>
            );
          })
        ) : (
          <Box
            className="border-grey-200 hover:border-grey-500 flex min-h-22.5 w-full cursor-pointer flex-row flex-wrap gap-2.5 rounded-md border p-4 transition-all"
            onClick={open}
          >
            <Typography variant="body1" className="pointer-events-none w-full self-center text-center">
              Add Images
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
}

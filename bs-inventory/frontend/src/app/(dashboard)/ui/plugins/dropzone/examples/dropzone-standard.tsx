import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Box, Button, Card, CardContent, FormControl, FormLabel, Typography } from "@mui/material";

import NiBinEmpty from "@/icons/nexture/ni-bin-empty";

export default function DropzoneStandard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Standard
        </Typography>
        <Box component="form" className="mb-0 flex cursor-pointer flex-col">
          <DropzoneStandardEmpty />
          <DropzoneStandardFilled />
        </Box>
      </CardContent>
    </Card>
  );
}

function DropzoneStandardEmpty() {
  const [files, setFiles] = useState<(any & { preview: string })[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
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

  const handleRemoveImage = (file: any) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.name != file.name));
  };

  const thumbs = files.map((file) => (
    <Box
      key={file.name}
      className="border-grey-100 flex-non flex w-80 cursor-default flex-row items-start rounded-sm border p-1"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <img
        alt={file.name}
        src={file.preview}
        className="h-12 w-16 rounded-xs object-cover"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <Box className="flex flex-1 flex-row items-center justify-between gap-1 px-3 py-2">
        <Box className="flex flex-col">
          <Typography variant="body1" component="p" className="line-clamp-1 leading-3.5">
            {file.name}
          </Typography>
          <Typography variant="body2" component="p" className="text-text-secondary">
            {Math.round(file.size / 1000)} KB
          </Typography>
        </Box>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            handleRemoveImage(file);
          }}
          className="icon-only hover:text-primary! flex-none"
          size="tiny"
          color="grey"
          variant="pastel"
          startIcon={<NiBinEmpty size={"tiny"} />}
        />
      </Box>
    </Box>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <FormControl className="outlined" variant="standard" size="small">
      <FormLabel component="label">Basic</FormLabel>
      <Box
        {...getRootProps({ className: "dropzone" })}
        className="bg-grey-25 hover:bg-grey-50 flex min-h-22.5 flex-row flex-wrap gap-2.5 rounded-md p-4 transition-all"
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          thumbs
        ) : (
          <Typography variant="body1" className="pointer-events-none w-full self-center text-center">
            Drag and drop some files here, or click to select files
          </Typography>
        )}
      </Box>
    </FormControl>
  );
}

function DropzoneStandardFilled() {
  const [files, setFiles] = useState<(any & { preview: string })[]>([
    {
      path: "/images/products/product-1.jpg",
      relativePath: "./images/products/product-1.jpg",
      preview: "/images/products/product-1.jpg",
      name: "product-1.jpg",
      size: 34208,
      type: "image/jpeg",
    },
    {
      path: "/images/products/product-2.jpg",
      relativePath: "./images/products/product-2.jpg",
      preview: "/images/products/product-2.jpg",
      name: "product-2.jpg",
      size: 36208,
      type: "image/jpeg",
    },
  ]);

  const { getRootProps, getInputProps } = useDropzone({
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

  const handleRemoveImage = (file: any) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.name != file.name));
  };

  const thumbs = files.map((file) => (
    <Box
      key={file.name}
      className="border-grey-100 flex-non flex w-80 cursor-default flex-row items-start rounded-sm border p-1"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <img
        alt={file.name}
        src={file.preview}
        className="h-12 w-16 rounded-xs object-cover"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <Box className="flex flex-1 flex-row items-center justify-between gap-1 px-3 py-2">
        <Box className="flex flex-col">
          <Typography variant="body1" component="p" className="line-clamp-1 leading-3.5">
            {file.name}
          </Typography>
          <Typography variant="body2" component="p" className="text-text-secondary">
            {Math.round(file.size / 1000)} KB
          </Typography>
        </Box>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            handleRemoveImage(file);
          }}
          className="icon-only hover:text-primary! flex-none"
          size="tiny"
          color="grey"
          variant="pastel"
          startIcon={<NiBinEmpty size={"tiny"} />}
        />
      </Box>
    </Box>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <FormControl className="outlined" variant="standard" size="small">
      <FormLabel component="label">Initial Files</FormLabel>
      <Box
        {...getRootProps({ className: "dropzone" })}
        className="bg-grey-25 hover:bg-grey-50 flex min-h-22.5 flex-row flex-wrap gap-2.5 rounded-md p-4 transition-all"
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          thumbs
        ) : (
          <Typography variant="body1" className="pointer-events-none w-full self-center text-center">
            Drag and drop some files here, or click to select files
          </Typography>
        )}
      </Box>
    </FormControl>
  );
}

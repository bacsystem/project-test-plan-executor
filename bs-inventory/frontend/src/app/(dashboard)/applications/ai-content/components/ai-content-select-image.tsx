import { Box, Radio } from "@mui/material";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmpty } from "@/icons/form/mui-radiobutton";

type AIContentSelectImageProps = {
  id: string;
  imagePath: string;
  checked: boolean;
  onChange: () => void;
};

export default function AIContentSelectImage({ imagePath, checked, onChange }: AIContentSelectImageProps) {
  return (
    <Box className="hover:outline-primary/40 relative cursor-pointer rounded-lg hover:outline-2" onClick={onChange}>
      <img src={imagePath} alt={"lightbox image"} loading="lazy" className="h-full w-full rounded-lg object-cover" />
      <Radio
        checked={checked}
        onChange={onChange}
        value="a"
        name="radio-buttons"
        className="bg-background-paper/40 pointer-events-none absolute inset-s-4 top-4"
        icon={<RadiobuttonSmallEmpty />}
        checkedIcon={<RadiobuttonSmallChecked />}
      />
    </Box>
  );
}

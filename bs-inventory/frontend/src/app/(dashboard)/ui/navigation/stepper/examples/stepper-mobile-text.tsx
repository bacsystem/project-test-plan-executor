import * as React from "react";

import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { NextureIconsProps } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

export default function StepperMobileText({ className }: NextureIconsProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 6;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="text"
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      className={cn("static max-w-96 grow p-0", className)}
      nextButton={
        <Button
          color="primary"
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === 5}
          endIcon={<NiChevronRightSmall size={"medium"} className="rtl:rotate-180" />}
        >
          Next
        </Button>
      }
      backButton={
        <Button
          color="primary"
          variant="contained"
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<NiChevronLeftSmall size={"medium"} className="rtl:rotate-180" />}
        >
          Back
        </Button>
      }
    />
  );
}

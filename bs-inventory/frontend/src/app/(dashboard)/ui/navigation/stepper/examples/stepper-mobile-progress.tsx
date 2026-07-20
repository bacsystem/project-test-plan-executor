import * as React from "react";

import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { NextureIconsProps } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

export default function StepperMobileProgress({ className }: NextureIconsProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 7;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      className={cn("static flex max-w-96 grow gap-4 p-0", className)}
      nextButton={
        <Button
          className="shrink-0"
          color="primary"
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === 6}
          endIcon={<NiChevronRightSmall size={"medium"} className="rtl:rotate-180" />}
        >
          Next
        </Button>
      }
      backButton={
        <Button
          className="shrink-0"
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

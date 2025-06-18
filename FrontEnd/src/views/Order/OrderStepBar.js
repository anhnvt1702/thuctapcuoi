import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Paper } from '@mui/material';

const steps = ['Bước 1', 'Bước 2', 'Bước 3'];

const OrderStepBar = ({current_step}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h5">Step Bar</Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
    </Paper>
  );
};

export default OrderStepBar;

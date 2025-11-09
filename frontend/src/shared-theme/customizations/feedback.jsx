import { alpha } from '@mui/material/styles';
import { gray, orange, red, green } from '../themePrimitives';
import { blue } from "@mui/material/colors";

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const severityColors = {
          error: {
            backgroundColor: red[100],
            border: `1px solid ${alpha(red[300], 0.5)}`,
            iconColor: red[700],
          },
          warning: {
            backgroundColor: orange[100],
            border: `1px solid ${alpha(orange[300], 0.5)}`,
            iconColor: orange[700],
          },
          info: {
            backgroundColor: blue[100],
            border: `1px solid ${alpha(blue[300], 0.5)}`,
            iconColor: blue[700],
          },
          success: {
            backgroundColor: green[100],
            border: `1px solid ${alpha(green[300], 0.5)}`,
            iconColor: green[700],
          },
        };

        const selectedColors = severityColors[ownerState.severity] || severityColors.info;

        return {
          borderRadius: 10,
          backgroundColor: selectedColors.backgroundColor,
          color: (theme.vars || theme).palette.text.primary,
          border: selectedColors.border,
          "& .MuiAlert-icon": {
            color: selectedColors.iconColor,
          },
          ...theme.applyStyles("dark", {
            backgroundColor: `${alpha(selectedColors.backgroundColor, 0.5)}`,
            border: `1px solid ${alpha(selectedColors.iconColor, 0.5)}`,
          }),
        };
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
};

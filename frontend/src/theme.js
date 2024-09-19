import { defaultTheme } from 'react-admin';
import { deepmerge } from '@mui/utils';
import pink from '@mui/material/colors/pink';

export default deepmerge(defaultTheme, {
  palette: {
    primary: pink,
    secondary: pink
  }
});

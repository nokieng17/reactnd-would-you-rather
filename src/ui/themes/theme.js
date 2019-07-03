import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: {
        main: "#43a047",
        light: "#68b36b",
        dark: "#2e7031",
        contrastText: "#fff"
    },
    // secondary: {
    //     main: "#2962ff",
    //     light: "#5381ff",
    //     dark: "#1c44b2",
    //     contrastText: "#fff"
    // }

}

const themeName = 'Blue Ribbon Grenadier Polar Bear';

export default createMuiTheme({ palette, themeName });
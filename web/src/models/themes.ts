import { cssDeclarationsToString, type CssDeclaration } from "../utils/css";
import type { Color } from "./colors";
import * as colors from "./colors";

export type Theme = {
  name: string;

  cssFiles: string[];
  inlineCss: string;
};

export const themes: Theme[] = [];

function createTheme(newTheme: Theme): Theme {
  themes.push(newTheme);
  return newTheme;
}

export type MaterialTheme = {
  name: string;

  // https://m2.material.io/design/color/the-color-system.html
  primaryColor: Color;
  primaryVariantColor: Color;
  onPrimaryColor: Color;
  secondaryColor: Color;
  secondaryVariantColor: Color;
  onSecondaryColor: Color;
  backgroundColor: Color;
  onBackgroundColor: Color;
  surfaceColor: Color;
  onSurfaceColor: Color;
  errorColor: Color;
  onErrorColor: Color;

  // Added stuff :)
  logo?: string;
  backgroundImage?: string;
  linkColor?: Color;
  linkHoverColor?: Color;

  warningColor: Color;
  onWarningColor: Color;
  successColor: Color;
  onSuccessColor: Color;

  cssFiles?: string[];
};

function createMaterialTheme(materialTheme: MaterialTheme): Theme {
  const cssDeclarations: CssDeclaration[] = [
    {
      selector: ":root",
      content: {
        "--primary-color": materialTheme.primaryColor.cssValue,
        "--primary-variant-color": materialTheme.primaryVariantColor.cssValue,
        "--secondary-color": materialTheme.secondaryColor.cssValue,
        "--secondary-variant-color":
          materialTheme.secondaryVariantColor.cssValue,
        "--background-color": materialTheme.backgroundColor.cssValue,
        "--surface-color": materialTheme.surfaceColor.cssValue,
        "--error-color": materialTheme.errorColor.cssValue,
        "--on-primary-color": materialTheme.onPrimaryColor.cssValue,
        "--on-secondary-color": materialTheme.onSecondaryColor.cssValue,
        "--on-background-color": materialTheme.onBackgroundColor.cssValue,
        "--on-surface-color": materialTheme.onSurfaceColor.cssValue,
        "--on-error-color": materialTheme.onErrorColor.cssValue,
        "--warning-color": materialTheme.warningColor.cssValue,
        "--on-warning-color": materialTheme.onWarningColor.cssValue,
        "--success-color": materialTheme.successColor.cssValue,
        "--on-success-color": materialTheme.onSuccessColor.cssValue,
      } as React.CSSProperties,
    },
  ];

  if (materialTheme.logo) {
    cssDeclarations.push({
      selector: ".logo",
      content: {
        content: `url(${materialTheme.logo})`,
      },
    });
  }

  if (materialTheme.backgroundImage) {
    cssDeclarations.push({
      selector: "body::before",
      content: {
        content: '""',
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${materialTheme.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // opacity: "0.1",
        zIndex: "-1",
      },
    });
  }

  const newTheme: Theme = {
    ...materialTheme,
    cssFiles: [
      "css/common.css",
      "css/material.css",
      ...(materialTheme.cssFiles || []),
    ],
    inlineCss: cssDeclarationsToString(cssDeclarations),
  };
  return createTheme(newTheme);
}

export const bones = createTheme({
  name: "Bones",

  cssFiles: [],
  inlineCss: "",
});

export const common = createTheme({
  name: "Common",
  cssFiles: ["css/common.css"],
  inlineCss: "",
});

export const vite = createMaterialTheme({
  name: "Vite",

  primaryColor: colors.ViteLinkColor,
  primaryVariantColor: colors.ViteLinkHoverColor,
  onPrimaryColor: colors.ViteForeground,
  secondaryColor: colors.ViteLightPurple,
  secondaryVariantColor: colors.ViteDarkPurple,
  onSecondaryColor: colors.ViteForeground,
  backgroundColor: colors.ViteBackground,
  onBackgroundColor: colors.ViteForeground,
  surfaceColor: colors.ViteDarkPurple,
  onSurfaceColor: colors.ViteForeground,
  errorColor: colors.ViteBackground,
  onErrorColor: colors.ViteForeground,

  warningColor: colors.ViteBackground,
  onWarningColor: colors.ViteForeground,
  successColor: colors.ViteBackground,
  onSuccessColor: colors.ViteForeground,

  logo: "/vite-logo.svg",
  linkColor: colors.ViteLinkColor,
  linkHoverColor: colors.ViteLinkHoverColor,
});

export const react = createMaterialTheme({
  name: "React",

  primaryColor: colors.ReactBlue,
  primaryVariantColor: colors.TypeScriptBlue,
  onPrimaryColor: colors.ReactSurface,
  secondaryColor: colors.TypeScriptBlue,
  secondaryVariantColor: colors.ReactBlue,
  onSecondaryColor: colors.ReactSurface,
  backgroundColor: colors.ReactBackground,
  onBackgroundColor: colors.ReactText,
  surfaceColor: colors.ReactSurface,
  onSurfaceColor: colors.ReactText,
  errorColor: colors.ReactBackground,
  onErrorColor: colors.ReactText,

  warningColor: colors.JavaScriptYellow,
  onWarningColor: colors.ReactSurface,
  successColor: colors.JavaScriptYellow,
  onSuccessColor: colors.ReactSurface,

  logo: "/react-logo.svg",

  cssFiles: ["css/react.css"],
});

export const relaxedEleganceMaterial = createMaterialTheme({
  name: "Relaxed Elegance Material",

  primaryColor: colors.MochaMousse,
  primaryVariantColor: colors.BalticAmber,
  onPrimaryColor: colors.CannoliCream,
  secondaryColor: colors.Sirocco,
  secondaryVariantColor: colors.CreamTan,
  onSecondaryColor: colors.CannoliCream,
  backgroundColor: colors.CannoliCream,
  onBackgroundColor: colors.ChocolateMartini,
  surfaceColor: colors.Safari,
  onSurfaceColor: colors.ChocolateMartini,
  errorColor: colors.BalticAmber,
  onErrorColor: colors.CannoliCream,
  warningColor: colors.Chanterelle,
  onWarningColor: colors.CannoliCream,
  successColor: colors.CreamTan,
  onSuccessColor: colors.ChocolateMartini,
});

export const powderedPastels = createMaterialTheme({
  name: "Powdered Pastels",
  primaryColor: colors.LemonIcing,
  primaryVariantColor: colors.PeachDust,
  onPrimaryColor: colors.NimbusCloud,
  secondaryColor: colors.IceMelt,
  secondaryVariantColor: colors.AlmostAqua,
  onSecondaryColor: colors.NimbusCloud,
  backgroundColor: colors.transparent,
  onBackgroundColor: colors.OrchidTint,
  surfaceColor: colors.NimbusCloud,
  onErrorColor: colors.CloudDancer,
  errorColor: colors.RaindropsOnRoses,
  onSurfaceColor: colors.CloudDancer,
  warningColor: colors.LemonIcing,
  onWarningColor: colors.NimbusCloud,
  successColor: colors.AlmostAqua,
  onSuccessColor: colors.NimbusCloud,

  backgroundImage: "powdered-pastels-background.png",
});

export const takeABreak = createMaterialTheme({
  name: "Take A Break",

  primaryColor: colors.Papaya,
  primaryVariantColor: colors.IcedCoffee,
  onPrimaryColor: colors.CloudDancer,
  secondaryColor: colors.MangoMojito,
  secondaryVariantColor: colors.Caramel,
  onSecondaryColor: colors.CloudDancer,
  backgroundColor: colors.Tea,
  onBackgroundColor: colors.CocoaCreme,
  surfaceColor: colors.CocoaCreme,
  onErrorColor: colors.CloudDancer,
  errorColor: colors.PinkLemonade,
  onSurfaceColor: colors.CloudDancer,
  warningColor: colors.MangoMojito,
  onWarningColor: colors.CloudDancer,
  successColor: colors.Tea,
  onSuccessColor: colors.CloudDancer,
});

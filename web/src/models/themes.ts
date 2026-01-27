import type { Color } from "./colors";
import * as colors from "./colors";
import * as palettes from "./palettes";

export type Theme = {
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

  cssFiles: string[];
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
  const newTheme: Theme = {
    ...materialTheme,
    cssFiles: [
      "css/common.css",
      "css/material.css",
      ...(materialTheme.cssFiles || []),
    ],
  };
  return createTheme(newTheme);
}

export type AricsTheme = {
  name: string;

  tableHeaderForegroundColor: Color;
  tableHeaderBackgroundColor: Color;
  tableForegroundColors: Color[];
  tableBackgroundColors: Color[];
  sectionForegroundColors: Color[];
  sectionBackgroundColors: Color[];
  errorColor: Color;
  warningColor: Color;
  successColor: Color;
};

function createAricsTheme(aricsTheme: AricsTheme): Theme {
  const newTheme: MaterialTheme = {
    ...aricsTheme,
    primaryColor: aricsTheme.sectionBackgroundColors[2],
    primaryVariantColor: aricsTheme.sectionBackgroundColors[3],
    onPrimaryColor: aricsTheme.sectionForegroundColors[2],
    secondaryColor: aricsTheme.sectionBackgroundColors[4],
    secondaryVariantColor: aricsTheme.sectionBackgroundColors[5],
    onSecondaryColor: aricsTheme.sectionForegroundColors[3],
    backgroundColor: aricsTheme.sectionBackgroundColors[0],
    onBackgroundColor: aricsTheme.sectionForegroundColors[0],
    surfaceColor: aricsTheme.sectionBackgroundColors[1],
    onSurfaceColor: aricsTheme.sectionForegroundColors[1],
    errorColor: aricsTheme.errorColor,
    onErrorColor: aricsTheme.sectionForegroundColors[4],

    warningColor: aricsTheme.warningColor,
    onWarningColor: aricsTheme.sectionForegroundColors[5],
    successColor: aricsTheme.successColor,
    onSuccessColor:
      aricsTheme.sectionForegroundColors[6] ||
      aricsTheme.sectionForegroundColors[0],
  };
  return createMaterialTheme(newTheme);
}

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

  logo: "/public/vite-logo.svg",
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

  logo: "/public/react-logo.svg",

  cssFiles: ["css/react.css"],
});

export const libations = createAricsTheme({
  name: "Libations",
  tableHeaderForegroundColor: colors.PeachFuzz,
  tableHeaderBackgroundColor: colors.BrandiedApricot,
  tableForegroundColors: palettes.libations.colors,
  tableBackgroundColors: palettes.libations.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.libations.colors,
  sectionBackgroundColors: palettes.libations.dim("Dark", 0.2).colors,
  errorColor: colors.Marsala,
  successColor: colors.PeachFuzz,
  warningColor: colors.BrandiedApricot,
});

export const convergence = createAricsTheme({
  name: "Convergence",
  tableHeaderForegroundColor: colors.ConvergencePink,
  tableHeaderBackgroundColor: colors.ConvergencePurple,
  tableForegroundColors: palettes.convergence.colors,
  tableBackgroundColors: palettes.convergence.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.convergence.colors,
  sectionBackgroundColors: palettes.convergence.dim("Dark", 0.2).colors,
  errorColor: colors.ConvergenceOrange,
  successColor: colors.ConvergenceLime,
  warningColor: colors.ConvergencePeach,
});

export const flavorFull = createAricsTheme({
  name: "Flavor-Full",
  tableHeaderForegroundColor: colors.Marsala,
  tableHeaderBackgroundColor: colors.PeachFuzz,
  tableForegroundColors: palettes.flavorFull.colors,
  tableBackgroundColors: palettes.flavorFull.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.flavorFull.colors,
  sectionBackgroundColors: palettes.flavorFull.dim("Dark", 0.2).colors,
  errorColor: colors.Marsala,
  successColor: colors.PeachFuzz,
  warningColor: colors.BrandiedApricot,
});

export const hybridHues = createAricsTheme({
  name: "Hybrid Hues",
  tableHeaderForegroundColor: colors.Marsala,
  tableHeaderBackgroundColor: colors.PeachFuzz,
  tableForegroundColors: palettes.hybridHues.colors,
  tableBackgroundColors: palettes.hybridHues.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.hybridHues.colors,
  sectionBackgroundColors: palettes.hybridHues.dim("Dark", 0.2).colors,
  errorColor: colors.Marsala,
  successColor: colors.PeachFuzz,
  warningColor: colors.BrandiedApricot,
});

export const peachPlethora = createAricsTheme({
  name: "Peach Plethora",
  tableHeaderForegroundColor: colors.Marsala,
  tableHeaderBackgroundColor: colors.PeachFuzz,
  tableForegroundColors: palettes.peachPlethora.colors,
  tableBackgroundColors: palettes.peachPlethora.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.peachPlethora.colors,
  sectionBackgroundColors: palettes.peachPlethora.dim("Dark", 0.2).colors,
  errorColor: colors.Marsala,
  successColor: colors.PeachFuzz,
  warningColor: colors.BrandiedApricot,
});

export const pairings = createAricsTheme({
  name: "Pairings",
  tableHeaderForegroundColor: colors.Marsala,
  tableHeaderBackgroundColor: colors.PeachFuzz,
  tableForegroundColors: palettes.pairings.colors,
  tableBackgroundColors: palettes.pairings.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.pairings.colors,
  sectionBackgroundColors: palettes.pairings.dim("Dark", 0.2).colors,
  errorColor: colors.Marsala,
  successColor: colors.PeachFuzz,
  warningColor: colors.BrandiedApricot,
});

export const relaxedElegance = createAricsTheme({
  name: "Relaxed Elegance",
  tableHeaderForegroundColor: colors.CreamTan,
  tableHeaderBackgroundColor: colors.MochaMousse,
  tableForegroundColors: palettes.relaxedElegance.colors,
  tableBackgroundColors: palettes.relaxedElegance.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.relaxedElegance.colors,
  sectionBackgroundColors: palettes.relaxedElegance.dim("Dark", 0.2).colors,
  errorColor: colors.MochaMousse,
  successColor: colors.CannoliCream,
  warningColor: colors.Sirocco,
});

export const floralPathways = createAricsTheme({
  name: "Floral Pathways",
  tableHeaderForegroundColor: colors.CornflowerBlue,
  tableHeaderBackgroundColor: colors.MochaMousse,
  tableForegroundColors: palettes.floralPathways.colors,
  tableBackgroundColors: palettes.floralPathways.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.floralPathways.colors,
  sectionBackgroundColors: palettes.floralPathways.dim("Dark", 0.2).colors,
  errorColor: colors.RoseTan,
  successColor: colors.Tendril,
  warningColor: colors.Willow,
});

export const uniquelyBalanced = createAricsTheme({
  name: "Uniquely Balanced",
  tableHeaderForegroundColor: colors.OperaMauve,
  tableHeaderBackgroundColor: colors.MochaMousse,
  tableForegroundColors: palettes.uniquelyBalanced.colors,
  tableBackgroundColors: palettes.uniquelyBalanced.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.uniquelyBalanced.colors,
  sectionBackgroundColors: palettes.uniquelyBalanced.dim("Dark", 0.2).colors,
  errorColor: colors.DesertFlower,
  successColor: colors.BlueCuracao,
  warningColor: colors.SpicyMustard,
});

export const deliciousness = createAricsTheme({
  name: "Deliciousness",
  tableHeaderForegroundColor: colors.PeachCobbler,
  tableHeaderBackgroundColor: colors.Winery,
  tableForegroundColors: palettes.deliciousness.colors,
  tableBackgroundColors: palettes.deliciousness.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.deliciousness.colors,
  sectionBackgroundColors: palettes.deliciousness.dim("Dark", 0.2).colors,
  errorColor: colors.PartyPunch,
  successColor: colors.Bonbon,
  warningColor: colors.Caramel,
});

export const subtleContrasts = createAricsTheme({
  name: "Subtle Contrasts",
  tableHeaderForegroundColor: colors.LaurelOak,
  tableHeaderBackgroundColor: colors.MochaMousse,
  tableForegroundColors: palettes.subtleContrasts.colors,
  tableBackgroundColors: palettes.subtleContrasts.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.subtleContrasts.colors,
  sectionBackgroundColors: palettes.subtleContrasts.dim("Dark", 0.2).colors,
  errorColor: colors.MochaMousse,
  successColor: colors.Tapestry,
  warningColor: colors.BuffedBeige,
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

export const atmospheric = createAricsTheme({
  name: "Atmospheric",

  //   primaryColor: colors.,
  // primaryVariantColor: colors.,
  // onPrimaryColor: colors.,
  // secondaryColor: colors.,
  // secondaryVariantColor: colors.,
  // onSecondaryColor: colors.,
  // backgroundColor: colors.,
  // onBackgroundColor: colors.,
  // surfaceColor: colors.,
  // onErrorColor: colors.,
  // errorColor: colors.,
  // onSurfaceColor: colors.,
  // warningColor: colors.,
  // onWarningColor: colors.,
  // successColor: colors.,
  // onSuccessColor: colors.,

  tableHeaderForegroundColor: colors.AlaskanBlue,
  tableHeaderBackgroundColor: colors.CloudDancer,
  tableForegroundColors: palettes.atmospheric.colors,
  tableBackgroundColors: palettes.atmospheric.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.atmospheric.colors,
  sectionBackgroundColors: palettes.atmospheric.dim("Dark", 0.2).colors,
  errorColor: colors.CosmicSky,
  successColor: colors.RinsingRivulet,
  warningColor: colors.DuskyCitron,
});

export const comfortZone = createAricsTheme({
  name: "Comfort Zone",
  tableHeaderForegroundColor: colors.RoseBrown,
  tableHeaderBackgroundColor: colors.CloudDancer,
  tableForegroundColors: palettes.comfortZone.colors,
  tableBackgroundColors: palettes.comfortZone.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.comfortZone.colors,
  sectionBackgroundColors: palettes.comfortZone.dim("Dark", 0.2).colors,
  errorColor: colors.CoralHaze,
  successColor: colors.MountainTrail,
  warningColor: colors.Amberlight,
});

export const tropicTonalities = createAricsTheme({
  name: "Tropic Tonalities",
  tableHeaderForegroundColor: colors.Capri,
  tableHeaderBackgroundColor: colors.CloudDancer,
  tableForegroundColors: palettes.tropicTonalities.colors,
  tableBackgroundColors: palettes.tropicTonalities.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.tropicTonalities.colors,
  sectionBackgroundColors: palettes.tropicTonalities.dim("Dark", 0.2).colors,
  errorColor: colors.ParadisePink,
  successColor: colors.KiwiColada,
  warningColor: colors.BlazingYellow,
});

export const lightAndShadow = createAricsTheme({
  name: "Light And Shadow",
  tableHeaderForegroundColor: colors.Hematite,
  tableHeaderBackgroundColor: colors.CloudDancer,
  tableForegroundColors: palettes.lightAndShadow.colors,
  tableBackgroundColors: palettes.lightAndShadow.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.lightAndShadow.colors,
  sectionBackgroundColors: palettes.lightAndShadow.dim("Dark", 0.2).colors,
  errorColor: colors.QuietViolet,
  successColor: colors.VeiledVista,
  warningColor: colors.GoldenMist,
});

export const glamourAndGleam = createAricsTheme({
  name: "Glamour And Gleam",
  tableHeaderForegroundColor: colors.StretchLimo,
  tableHeaderBackgroundColor: colors.CloudDancer,
  tableForegroundColors: palettes.glamourAndGleam.colors,
  tableBackgroundColors: palettes.glamourAndGleam.dim("Dark", 0.2).colors,
  sectionForegroundColors: palettes.glamourAndGleam.colors,
  sectionBackgroundColors: palettes.glamourAndGleam.dim("Dark", 0.2).colors,
  errorColor: colors.ScarletSmile,
  successColor: colors.Dragonfly,
  warningColor: colors.SatinSlipper,
});

// Utility function to get all theme names
export function getThemeNames(): string[] {
  return themes.map((theme) => theme.name);
}

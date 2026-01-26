import * as colors from "./colors";

export type Palette = {
  name: string;
  colors: colors.Color[];
  dim: (prefix: string, amount: number) => Palette;
};

export const palettes: Palette[] = [];

function newPalette(name: string, colors: colors.Color[]): Palette {
  return {
    name,
    colors,
    dim: (prefix: string, amount: number) => {
      const dimmedColors = colors.map((color) => {
        // Simple dimming logic: reduce each RGB component by the specified amount
        const r = Math.floor(Math.max(0, color.r * amount));
        const g = Math.floor(Math.max(0, color.g * amount));
        const b = Math.floor(Math.max(0, color.b * amount));
        return {
          name: `${prefix} ${color.name}`,
          r,
          g,
          b,
          a: color.a,
          rgbaString: `rgba(${r}, ${g}, ${b}, ${color.a})`,
        };
      });
      return newPalette(`${prefix} ${name}`, dimmedColors);
    },
  };
}

function createPalette(name: string, colors: colors.Color[]): Palette {
  const palette = newPalette(name, colors);
  palettes.push(palette);
  return palette;
}

export const libations = createPalette("Libations", [
  colors.BrandiedApricot,
  colors.PeachFuzz,
  colors.Marsala,
  colors.Almondine,
  colors.AlmondPeach,
  colors.Grapeade,
  colors.Sauterne,
]);

export const flavorFull = createPalette("Flavor Full", [
  colors.MangoMint,
  colors.PartyPunch,
  colors.Grapemist,
  colors.Blueberry,
  colors.GreenBanana,
  colors.Dijon,
  colors.HoneyYellow,
  colors.PeachFuzz,
]);

export const hybridHues = createPalette("Hybrid Hues", [
  colors.PalePansy,
  colors.Myristica,
  colors.Phlox,
  colors.SuperLemon,
  colors.PeachFuzz,
  colors.SunDriedTomato,
  colors.JadeGreen,
  colors.Porcelain,
]);

export const peachPlethora = createPalette("Peach Plethora", [
  colors.Pristine,
  colors.PeachFuzz,
  colors.HoneyPeach,
  colors.PeachPuree,
  colors.PeachPink,
  colors.GeorgiaPeach,
  colors.PeachBlossom,
  colors.PeachPearl,
]);

export const pairings = createPalette("Pairings", [
  colors.PinkYarrow,
  colors.AuroraPink,
  colors.PeachFuzz,
  colors.BlazingOrange,
  colors.Bermuda,
  colors.Baltic,
  colors.NauticalBlue,
  colors.LittleBoyBlue,
]);

export const convergence = createPalette("Convergence", [
  colors.ConvergencePurple,
  colors.ConvergenceOrange,
  colors.ConvergencePeach,
  colors.ConvergenceLime,
  colors.ConvergencePink,
  colors.ConvergenceSalmon,
]);

export const relaxedElegance = createPalette("Relaxed Elegance", [
  colors.CannoliCream,
  colors.CreamTan,
  colors.Safari,
  colors.Sirocco,
  colors.MochaMousse,
  colors.Chanterelle,
  colors.BalticAmber,
  colors.ChocolateMartini,
]);

export const floralPathways = createPalette("Floral Pathways", [
  colors.Tendril,
  colors.CornflowerBlue,
  colors.Viola,
  colors.RoseTan,
  colors.MochaMousse,
  colors.Cobblestone,
  colors.Willow,
  colors.Gardenia,
]);

export const uniquelyBalanced = createPalette("Uniquely Balanced", [
  colors.DesertFlower,
  colors.CattleyaOrchid,
  colors.OperaMauve,
  colors.BlueCuracao,
  colors.SpicyMustard,
  colors.MochaMousse,
  colors.Arabesque,
]);

export const deliciousness = createPalette("Deliciousness", [
  colors.Bonbon,
  colors.PartyPunch,
  colors.Winery,
  colors.MandarinOrange,
  colors.PinkLemonade,
  colors.MochaMousse,
  colors.Caramel,
  colors.PeachCobbler,
]);

export const subtleContrasts = createPalette("Subtle Contrasts", [
  colors.MochaMousse,
  colors.Tapestry,
  colors.LaurelOak,
  colors.CoffeeQuartz,
  colors.Arona,
  colors.WarmTaupe,
  colors.DullGold,
  colors.BuffedBeige,
]);

export const powderedPastels = createPalette("Powdered Pastels", [
  colors.LemonIcing,
  colors.NimbusCloud,
  colors.RaindropsOnRoses,
  colors.CloudDancer,
  colors.IceMelt,
  colors.PeachDust,
  colors.AlmostAqua,
  colors.OrchidTint,
]);

export const takeABreak = createPalette("Take A Break", [
  colors.IcedCoffee,
  colors.MangoMojito,
  colors.CocoaCreme,
  colors.PinkLemonade,
  colors.Tea,
  colors.Papaya,
  colors.CloudDancer,
  colors.Caramel,
]);

export const atmospheric = createPalette("Atmospheric", [
  colors.NantucketBreeze,
  colors.CloudDancer,
  colors.AlaskanBlue,
  colors.CosmicSky,
  colors.AquaGray,
  colors.Regatta,
  colors.RinsingRivulet,
  colors.DuskyCitron,
]);

export const comfortZone = createPalette("Comfort Zone", [
  colors.ShiftingSand,
  colors.CoralHaze,
  colors.MountainTrail,
  colors.Amberlight,
  colors.AshesOfRoses,
  colors.Woodrose,
  colors.RoseBrown,
  colors.CloudDancer,
]);

export const tropicTonalities = createPalette("Tropic Tonalities", [
  colors.CloudDancer,
  colors.IrisOrchid,
  colors.Capri,
  colors.KiwiColada,
  colors.SunnyLime,
  colors.BrightMarigold,
  colors.ParadisePink,
  colors.BlazingYellow,
]);

export const lightAndShadow = createPalette("Light And Shadow", [
  colors.CloudDancer,
  colors.VeiledVista,
  colors.BalticSea,
  colors.GoldenMist,
  colors.QuietViolet,
  colors.CloudCover,
  colors.Hematite,
  colors.BlueFusion,
]);

export const glamourAndGleam = createPalette("Glamour And Gleam", [
  colors.StretchLimo,
  colors.CloudDancer,
  colors.ScarletSmile,
  colors.Bordeaux,
  colors.Dragonfly,
  colors.Graphite,
  colors.SatinSlipper,
  colors.Micron,
]);

export const samplePalette: Palette = createPalette("Sample Palette", [
  colors.sampleColor1,
  colors.sampleColor2,
  colors.sampleColor3,
]);

export const vitePalette: Palette = createPalette("Vite", [
  colors.ViteBackground,
  colors.ViteDarkPurple,
  colors.ViteForeground,
  colors.ViteLightPurple,
  colors.ViteLinkColor,
  colors.ViteLinkHoverColor,
]);

export const reactPalette: Palette = createPalette("React", [
  colors.ReactBackground,
  colors.ReactBlue,
  colors.ReactSurface,
  colors.ReactText,
  colors.TypeScriptBlue,
  colors.JavaScriptYellow,
]);
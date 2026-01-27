export type Color = {
  name: string;
  cssValue: string;
};

export const colors: Color[] = [];

function createColor(color: Color): Color {
  colors.push(color);
  return color;
}

function fromCss(name: string, cssValue: string): Color {
  return createColor({ name, cssValue });
}

function fromHex(name: string, hex: string): Color {
  return createColor({ name, cssValue: hex });
}

function fromRgb(name: string, r: number, g: number, b: number): Color {
  return createColor({ name, cssValue: `rgb(${r}, ${g}, ${b})` });
}

function fromRgba(
  name: string,
  r: number,
  g: number,
  b: number,
  a: number,
): Color {
  return createColor({ name, cssValue: `rgba(${r}, ${g}, ${b}, ${a})` });
}

export const transparent = fromRgba("Transparent", 0, 0, 0, 0);

export const oklchWhite = fromCss("OKLCH White", "oklch(100% 0 0 / 1)");
export const oklchBlack = fromCss("OKLCH Black", "oklch(0% 0 0 / 1)");
export const oklchRed = fromCss("OKLCH Red", "oklch(53% 0.23 29 / 1)");
export const oklchGreen = fromCss("OKLCH Green", "oklch(71% 0.22 136 / 1)");
export const oklchBlue = fromCss("OKLCH Blue", "oklch(44% 0.23 306 / 1)");

export const sampleColor1: Color = fromHex("Red", "#FF0000");
export const sampleColor2: Color = fromHex("Green", "#00FF00");
export const sampleColor3: Color = fromHex("Blue", "#0000FF");

export const ViteBackground = fromHex("Vite Background", "#242424");
export const ViteForeground = fromRgba("Vite Foreground", 255, 255, 255, 0.87);
export const ViteLinkColor = fromHex("Vite Link Color", "#0061AA");
export const ViteLinkHoverColor = fromHex("Vite Link Hover Color", "#535BF2");
export const ViteDarkPurple = fromHex("Vite Dark Purple", "#3b3440");
export const ViteLightPurple = fromHex("Vite Light Purple", "#9d87e0");

export const ReactText = fromRgba("React Text", 235, 236, 240, 1);
export const ReactBackground = fromRgba("React Background", 35, 39, 47, 1);
export const ReactSurface = fromRgba("React Surface", 25, 27, 33, 1);
export const ReactBlue = fromHex("React Blue", "#61DAFB");
export const TypeScriptBlue = fromHex("TypeScript Blue", "#3178C6");
export const JavaScriptYellow = fromHex("JavaScript Yellow", "#F7DF1E");

export const Almondine = fromRgb("Almondine", 167, 140, 123);
export const AlmondPeach = fromRgb("Almond Peach", 216, 200, 189);
export const BrandiedApricot = fromRgb("Brandied Apricot", 202, 132, 138);
export const Grapeade = fromRgb("Grapeade", 133, 103, 123);
export const Marsala = fromRgb("Marsala", 150, 79, 76);
export const PeachFuzz = fromRgb("Peach Fuzz", 254, 190, 152);
export const Sauterne = fromRgb("Sauterne", 197, 162, 83);
export const MangoMint = fromRgb("Mango Mint", 205, 177, 39);
export const PartyPunch = fromRgb("Party Punch", 197, 73, 102);
export const Grapemist = fromRgb("Grapemist", 131, 152, 202);
export const Blueberry = fromRgb("Blueberry", 44, 51, 62);
export const GreenBanana = fromRgb("Green Banana", 186, 188, 114);
export const Dijon = fromRgb("Dijon", 151, 117, 76);
export const HoneyYellow = fromRgb("Honey Yellow", 202, 148, 86);
export const PalePansy = fromRgb("Pale Pansy", 179, 128, 170);
export const Myristica = fromRgb("Myristica", 132, 97, 87);
export const Phlox = fromRgb("Phlox", 105, 45, 93);
export const SuperLemon = fromRgb("Super Lemon", 228, 191, 69);
export const SunDriedTomato = fromRgb("Sun-Dried Tomato", 117, 35, 41);
export const JadeGreen = fromRgb("Jade Green", 117, 148, 101);
export const Porcelain = fromRgb("Porcelain", 93, 156, 164);
export const Pristine = fromRgb("Pristine", 242, 232, 218);
export const HoneyPeach = fromRgb("Honey Peach", 220, 189, 158);
export const PeachPuree = fromRgb("Peach Puree", 239, 207, 186);
export const PeachPink = fromRgb("Peach Pink", 250, 154, 133);
export const GeorgiaPeach = fromRgb("Georgia Peach", 249, 114, 114);
export const PeachBlossom = fromRgb("Peach Blossom", 222, 130, 134);
export const PeachPearl = fromRgb("Peach Pearl", 255, 178, 165);
export const PinkYarrow = fromRgb("Pink Yarrow", 206, 51, 117);
export const AuroraPink = fromRgb("Aurora Pink", 232, 129, 166);
export const BlazingOrange = fromRgb("Blazing Orange", 255, 167, 79);
export const Bermuda = fromRgb("Bermuda", 96, 200, 179);
export const Baltic = fromRgb("Baltic", 39, 157, 159);
export const NauticalBlue = fromRgb("Nautical Blue", 27, 80, 145);
export const LittleBoyBlue = fromRgb("Little Boy Blue", 110, 161, 212);
export const ConvergencePurple = fromRgb("Convergence Purple", 131, 62, 141);
export const ConvergenceOrange = fromRgb("Convergence Orange", 226, 88, 0);
export const ConvergencePeach = fromRgb("Convergence Peach", 240, 178, 133);
export const ConvergenceLime = fromRgb("Convergence Lime", 210, 225, 119);
export const ConvergencePink = fromRgb("Convergence Pink", 251, 131, 173);
export const ConvergenceSalmon = fromRgb("Convergence Salmon", 240, 133, 146);
export const MochaMousse = fromRgb("Mocha Mousse", 164, 120, 100);
export const CannoliCream = fromRgb("Cannoli Cream", 241, 240, 226);
export const CreamTan = fromRgb("Cream Tan", 228, 199, 183);
export const Safari = fromRgb("Safari", 187, 170, 145);
export const Sirocco = fromRgb("Sirocco", 195, 157, 136);
export const Chanterelle = fromRgb("Chanterelle", 162, 135, 118);
export const BalticAmber = fromRgb("Baltic Amber", 139, 100, 90);
export const ChocolateMartini = fromRgb("Chocolate Martini", 86, 68, 63);
export const Tendril = fromRgb("Tendril", 137, 160, 107);
export const CornflowerBlue = fromRgb("Cornflower Blue", 115, 145, 200);
export const Viola = fromRgb("Viola", 166, 146, 186);
export const RoseTan = fromRgb("Rose Tan", 209, 156, 151);
export const Cobblestone = fromRgb("Cobblestone", 168, 154, 142);
export const Willow = fromRgb("Willow", 154, 139, 79);
export const Gardenia = fromRgb("Gardenia", 241, 233, 223);
export const Bonbon = fromRgb("Bonbon", 241, 166, 204);
export const Winery = fromRgb("Winery", 126, 33, 42);
export const MandarinOrange = fromRgb("Mandarin Orange", 236, 106, 55);
export const PinkLemonade = fromRgb("Pink Lemonade", 238, 109, 138);
export const Caramel = fromRgb("Caramel", 195, 124, 84);
export const PeachCobbler = fromRgb("Peach Cobbler", 255, 177, 129);
export const DesertFlower = fromRgb("Desert Flower", 255, 150, 135);
export const CattleyaOrchid = fromRgb("Cattleya Orchid", 156, 76, 141);
export const OperaMauve = fromRgb("Opera Mauve", 202, 128, 177);
export const BlueCuracao = fromRgb("Blue Curacao", 51, 190, 204);
export const SpicyMustard = fromRgb("Spicy Mustard", 216, 174, 72);
export const Arabesque = fromRgb("Arabesque", 216, 174, 72);
export const Tapestry = fromRgb("Tapestry", 67, 101, 115);
export const LaurelOak = fromRgb("Laurel Oak", 145, 140, 126);
export const CoffeeQuartz = fromRgb("Coffee Quartz", 105, 86, 80);
export const Arona = fromRgb("Arona", 105, 86, 80);
export const WarmTaupe = fromRgb("Warm Taupe", 175, 148, 131);
export const DullGold = fromRgb("Dull Gold", 175, 148, 131);
export const BuffedBeige = fromRgb("Buffed Beige", 189, 161, 130);
export const LemonIcing = fromRgb("Lemon Icing", 245, 235, 200);
export const NimbusCloud = fromRgb("Nimbus Cloud", 213, 213, 215);
export const RaindropsOnRoses = fromRgb("Raindrops on Roses", 235, 216, 220);
export const IceMelt = fromRgb("Ice Melt", 212, 228, 241);
export const PeachDust = fromRgb("Peach Dust", 240, 217, 204);
export const AlmostAqua = fromRgb("Almost Aqua", 201, 211, 192);
export const OrchidTint = fromRgb("Orchid Tint", 219, 211, 220);
export const IcedCoffee = fromRgb("Iced Coffee", 178, 143, 107);
export const MangoMojito = fromRgb("Mango Mojito", 215, 157, 49);
export const CocoaCreme = fromRgb("Cocoa Creme", 135, 109, 88);
export const Tea = fromRgb("Tea", 154, 155, 134);
export const Papaya = fromRgb("Papaya", 255, 162, 102);
export const NantucketBreeze = fromRgb("Nantucket Breeze", 183, 208, 234);
export const AlaskanBlue = fromRgb("Alaskan Blue", 110, 169, 210);
export const CosmicSky = fromRgb("Cosmic Sky", 170, 171, 196);
export const AquaGray = fromRgb("Aqua Gray", 166, 178, 169);
export const Regatta = fromRgb("Regatta", 73, 122, 183);
export const RinsingRivulet = fromRgb("Rinsing Rivulet", 93, 198, 195);
export const DuskyCitron = fromRgb("Dusky Citron", 228, 204, 130);
export const ShiftingSand = fromRgb("Shifting Sand", 216, 192, 173);
export const CoralHaze = fromRgb("Coral Haze", 227, 142, 132);
export const MountainTrail = fromRgb("Mountain Trail", 138, 117, 106);
export const Amberlight = fromRgb("Amberlight", 227, 190, 162);
export const AshesOfRoses = fromRgb("Ashes of Roses", 181, 172, 171);
export const Woodrose = fromRgb("Woodrose", 174, 140, 142);
export const RoseBrown = fromRgb("Rose Brown", 128, 86, 91);
export const IrisOrchid = fromRgb("Iris Orchid", 168, 103, 164);
export const Capri = fromRgb("Capri", 69, 187, 202);
export const KiwiColada = fromRgb("Kiwi Colada", 189, 202, 36);
export const SunnyLime = fromRgb("Sunny Lime", 224, 238, 136);
export const BrightMarigold = fromRgb("Bright Marigold", 255, 142, 0);
export const ParadisePink = fromRgb("Paradise Pink", 228, 70, 94);
export const BlazingYellow = fromRgb("Blazing Yellow", 254, 232, 21);
export const VeiledVista = fromRgb("Veiled Vista", 199, 228, 202);
export const BalticSea = fromRgb("Baltic Sea", 121, 182, 216);
export const GoldenMist = fromRgb("Golden Mist", 214, 205, 149);
export const QuietViolet = fromRgb("Quiet Violet", 167, 147, 172);
export const CloudCover = fromRgb("Cloud Cover", 154, 147, 147);
export const Hematite = fromRgb("Hematite", 117, 111, 106);
export const BlueFusion = fromRgb("Blue Fusion", 74, 98, 117);
export const StretchLimo = fromRgb("Stretch Limo", 43, 44, 48);
export const CloudDancer = fromRgb("Cloud Dancer", 240, 239, 235);
export const ScarletSmile = fromRgb("Scarlet Smile", 159, 35, 54);
export const Bordeaux = fromRgb("Bordeaux", 151, 99, 124);
export const Dragonfly = fromRgb("Dragonfly", 42, 93, 105);
export const Graphite = fromRgb("Graphite", 85, 84, 59);
export const SatinSlipper = fromRgb("Satin Slipper", 148, 138, 118);
export const Micron = fromRgb("Micron", 100, 102, 103);

import type { CSSProperties } from "react";

export type CssDeclaration = {
  selector: string;
  content: CSSProperties;
};

export function cssDeclarationsToString(
  declarations: CssDeclaration[],
): string {
  return declarations
    .map((declaration) => {
      const contentString = Object.entries(declaration.content)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          const kebabKey = key
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .toLowerCase();
          return `  ${kebabKey}: ${value};`;
        })
        .join("\n");
      return `${declaration.selector} {\n${contentString}\n}`;
    })
    .join("\n\n");
}

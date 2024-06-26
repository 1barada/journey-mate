import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColorOptions {
    main?: string;
    hoverColor?: string;
  }

  interface Palette {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
  }

  interface TypeText {
    placeholder: string;
  }

  interface PaletteOptions {
    text?: Partial<TypeText>;
  }
}

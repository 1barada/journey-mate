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
    accent: string;
    accentTransparentHover: string;
    hover: string;
    text: ModalTypeText;
  }

  interface ModalTypeText {
    primary: string;
    primaryTransparent: string;
    secondary: string;
  }

  interface PaletteOptions {
    text?: Partial<TypeText>;
    modal?: Partial<TypeText>;
  }

  interface BreakpointOverrides {
    xs: false;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }

  interface TypographyVariants {
    modal: React.CSSProperties | React.InsHTMLAttributes;
  }
  interface TypographyVariantsOptions {
    modal?: React.CSSProperties | React.InsHTMLAttributes;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    modal: true;
  }
}

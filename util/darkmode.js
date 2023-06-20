
export function togglePrimarySecondary(isPrimary, el) {
    const styleProp = el && el.style ? el.style : document.documentElement.style;
    
    if (isPrimary) {
        styleProp.setProperty("--mdc-theme-primary", "var(--mdc-theme-secondary)");
        styleProp.setProperty("--mdc-theme-primary-darker", "var(--mdc-theme-secondary-lighter)");
        styleProp.setProperty("--lumo-primary-text-color", "var(--mdc-theme-secondary)");
        styleProp.setProperty("--lumo-primary-color", "var(--mdc-theme-secondary)");
        styleProp.setProperty("--lumo-primary-color-10pct", "var(--mdc-theme-secondary-10pct)");
        styleProp.setProperty("--lumo-primary-color-50pct", "var(--mdc-theme-secondary-50pct)");
        styleProp.setProperty("--pulse-shadow", "var(--pulse-shadow-secondary)");
        styleProp.setProperty("--pulse-shadow-0", "var(--pulse-shadow-secondary-0)");
        styleProp.setProperty("--pulse-shadow-70", "var(--pulse-shadow-secondary-70)");
        styleProp.setProperty("--pulse-shadow-100", "var(--pulse-shadow-secondary-100)");
        document.body.style.setProperty("--mdc-theme-header", "var(--mdc-theme-header-secondary)")
    } else {
        styleProp.removeProperty("--mdc-theme-primary");
        styleProp.removeProperty("--mdc-theme-primary-darker");
        styleProp.removeProperty("--lumo-primary-text-color");
        styleProp.removeProperty("--lumo-primary-color");
        styleProp.removeProperty("--lumo-primary-color-10pct");
        styleProp.removeProperty("--lumo-primary-color-50pct");
        styleProp.removeProperty("--pulse-shadow");
        styleProp.removeProperty("--pulse-shadow-0");
        styleProp.removeProperty("--pulse-shadow-70");
        styleProp.removeProperty("--pulse-shadow-100");
        document.body.style.removeProperty("--mdc-theme-header");
    }
}

export function setDarkmode(isDark) {
    let root = document.documentElement;
    if (isDark) {
        root.style.setProperty("--mdc-theme-primary", "#bb86fc");
        root.style.setProperty("--mdc-theme-primary-darker", "#a359fc");
        root.style.setProperty("--mdc-theme-secondary", "#03dac6");
        root.style.setProperty("--mdc-theme-secondary-10pct", "#1C3432");
        root.style.setProperty("--mdc-theme-secondary-50pct", "#137269");
        root.style.setProperty("--mdc-theme-secondary-lighter", "rgba(1, 135, 134, .8)");
        root.style.setProperty("--mdc-theme-background", "#121212");
        root.style.setProperty("--mdc-theme-surface", "#1f1f1f");
        root.style.setProperty("--mdc-theme-header", "var(--mdc-theme-surface)");
        root.style.setProperty("--mdc-theme-header-secondary", "var(--mdc-theme-surface)");
        root.style.setProperty("--mdc-theme-error", "#cf6679");
        root.style.setProperty("--mdc-theme-on-primary", "#000");
        root.style.setProperty("--mdc-theme-on-secondary", "#000");
        root.style.setProperty("--mdc-theme-on-surface", "hsla(214, 96%, 96%, 0.9)");
        root.style.setProperty("--mdc-theme-on-header", "var(--mdc-theme-on-surface)");
        root.style.setProperty("--mdc-theme-on-error", "#000");
        root.style.setProperty("--mdc-theme-text-primary-on-background", "var(--lumo-body-text-color)"); // Body Text
        root.style.setProperty("--mdc-theme-text-secondary-on-background", "rgba(255, 255, 255, 0.6)");
        root.style.setProperty("--mdc-theme-text-hint-on-background", "rgba(255, 255, 255, 0.6)");
        root.style.setProperty("--mdc-theme-text-disabled-on-background", "rgba(255, 255, 255, 0.38)");
        root.style.setProperty("--mdc-theme-text-divider-on-background", "rgba(255, 255, 255, 0.12)");
        root.style.setProperty("--mdc-theme-text-light-hover-on-background", "rgba(255, 255, 255, 0.05)");
        root.style.setProperty("--mdc-theme-text-light-primary-on-background", "#bb86fc");
        root.style.setProperty("--mdc-theme-text-icon-on-background", "#fff");
        root.style.setProperty("--mdc-theme-text-primary-on-light", "#fff");
        root.style.setProperty("--mdc-theme-text-secondary-on-light", "#fff");
        root.style.setProperty("--mdc-theme-text-hint-on-light", "#fff");
        root.style.setProperty("--mdc-theme-text-disabled-on-light", "#fff");
        root.style.setProperty("--mdc-theme-text-icon-on-light", "#fff");

        root.style.setProperty("--pulse-shadow", "0 0 0 0 rgb(187, 134, 252, 1)");
        root.style.setProperty("--pulse-shadow-0", "0 0 0 0 rgb(187, 134, 252, 0.7)");
        root.style.setProperty("--pulse-shadow-70", "0 0 0 20px rgb(187, 134, 252, 0)");
        root.style.setProperty("--pulse-shadow-100", "0 0 0 0 rgb(187, 134, 252, 0)");

        root.style.setProperty("--pulse-shadow-gold", "0 0 0 0 rgb(218,198,3, 1)");
        root.style.setProperty("--pulse-shadow-gold-0", "0 0 0 0 rgb(218,198,3, 0.7)");
        root.style.setProperty("--pulse-shadow-gold-70", "0 0 0 20px rgb(218,198,3, 0)");
        root.style.setProperty("--pulse-shadow-gold-100", "0 0 0 0 rgb(218,198,3, 0)");

        root.style.setProperty("--pulse-shadow-secondary", "0 0 0 0 rgb(3, 218, 198, 1)");
        root.style.setProperty("--pulse-shadow-secondary-0", "0 0 0 0 rgb(3, 218, 198, 0.7)");
        root.style.setProperty("--pulse-shadow-secondary-70", "0 0 0 20px rgb(3, 218, 198, 0)");
        root.style.setProperty("--pulse-shadow-secondary-100", "0 0 0 0 rgb(3, 218, 198, 0)");
        
        // Lumo
        root.style.setProperty("--lumo-base-color", "var(--mdc-theme-surface)");

        root.style.setProperty("--lumo-tint-5pct", "hsla(214, 65%, 85%, 0.06)");
        root.style.setProperty("--lumo-tint-10pct", "hsla(214, 60%, 80%, 0.14)");
        root.style.setProperty("--lumo-tint-20pct", "hsla(214, 64%, 82%, 0.23)");
        root.style.setProperty("--lumo-tint-30pct", "hsla(214, 69%, 84%, 0.32)");
        root.style.setProperty("--lumo-tint-40pct", "hsla(214, 73%, 86%, 0.41)");
        root.style.setProperty("--lumo-tint-50pct", "hsla(214, 78%, 88%, 0.5)");
        root.style.setProperty("--lumo-tint-60pct", "hsla(214, 82%, 90%, 0.6)");
        root.style.setProperty("--lumo-tint-70pct", "hsla(214, 87%, 92%, 0.7)");
        root.style.setProperty("--lumo-tint-80pct", "hsla(214, 91%, 94%, 0.8)");
        root.style.setProperty("--lumo-tint-90pct", "hsla(214, 96%, 96%, 0.9)");
        root.style.setProperty("--lumo-tint", "hsl(214, 100%, 98%)");

        root.style.setProperty("--lumo-shade-5pct", "hsla(214, 0%, 0%, 0.07)");
        root.style.setProperty("--lumo-shade-10pct", "hsla(214, 4%, 2%, 0.15)");
        root.style.setProperty("--lumo-shade-20pct", "hsla(214, 8%, 4%, 0.23)");
        root.style.setProperty("--lumo-shade-30pct", "hsla(214, 12%, 6%, 0.32)");
        root.style.setProperty("--lumo-shade-40pct", "hsla(214, 16%, 8%, 0.41)");
        root.style.setProperty("--lumo-shade-50pct", "hsla(214, 20%, 10%, 0.5)");
        root.style.setProperty("--lumo-shade-60pct", "hsla(214, 24%, 12%, 0.6)");
        root.style.setProperty("--lumo-shade-70pct", "hsla(214, 28%, 13%, 0.7)");
        root.style.setProperty("--lumo-shade-80pct", "hsla(214, 32%, 13%, 0.8)");
        root.style.setProperty("--lumo-shade-90pct", "hsla(214, 33%, 13%, 0.9)");
        root.style.setProperty("--lumo-shade", "hsl(214, 33%, 13%)");

        root.style.setProperty("--lumo-contrast-5pct", "var(--lumo-tint-5pct)");
        root.style.setProperty("--lumo-contrast-10pct", "var(--lumo-tint-10pct)");
        root.style.setProperty("--lumo-contrast-20pct", "var(--lumo-tint-20pct)");
        root.style.setProperty("--lumo-contrast-30pct", "var(--lumo-tint-30pct)");
        root.style.setProperty("--lumo-contrast-40pct", "var(--lumo-tint-40pct)");
        root.style.setProperty("--lumo-contrast-50pct", "var(--lumo-tint-50pct)");
        root.style.setProperty("--lumo-contrast-60pct", "var(--lumo-tint-60pct)");
        root.style.setProperty("--lumo-contrast-70pct", "var(--lumo-tint-70pct)");
        root.style.setProperty("--lumo-contrast-80pct", "var(--lumo-tint-80pct)");
        root.style.setProperty("--lumo-contrast-90pct", "var(--lumo-tint-90pct)");
        root.style.setProperty("--lumo-contrast", "var(--lumo-tint)");

        root.style.setProperty("--mdc-theme-surface-surface", "#33373b");
        root.style.setProperty("--mdc-theme-on-surface-surface", "var(--lumo-tint-50pct)");
        root.style.setProperty("--lumo-header-text-color", "var(--lumo-contrast)");
        root.style.setProperty("--lumo-body-text-color", "var(--lumo-contrast-90pct)");
        root.style.setProperty("--lumo-secondary-text-color", "var(--lumo-contrast-70pct)");
        root.style.setProperty("--lumo-tertiary-text-color", "var(--lumo-contrast-50pct)");
        root.style.setProperty("--lumo-disabled-text-color", "var(--lumo-contrast-30pct)");

        root.style.setProperty("--lumo-primary-color", "var(--mdc-theme-primary)");
        root.style.setProperty("--lumo-primary-color-50pct", "#6d548d");
        root.style.setProperty("--lumo-primary-color-10pct", "#302936");
        root.style.setProperty("--lumo-primary-text-color", "var(--mdc-theme-primary)");
        root.style.setProperty("--lumo-primary-contrast-color", "#FFF");

        root.style.setProperty("--lumo-error-color", "hsl(3, 90%, 63%)");
        root.style.setProperty("--lumo-error-color-50pct", "hsla(3, 90%, 63%, 0.5)");
        root.style.setProperty("--lumo-error-color-10pct", "hsla(3, 90%, 63%, 0.1)");
        root.style.setProperty("--lumo-error-text-color", "hsl(3, 100%, 67%)");
        
        root.style.setProperty("--lumo-success-color", "hsl(145, 65%, 42%)");
        root.style.setProperty("--lumo-success-color-50pct", "hsla(145, 65%, 42%, 0.5)");
        root.style.setProperty("--lumo-success-color-10pct", "hsla(145, 65%, 42%, 0.1)");
        root.style.setProperty("--lumo-success-text-color", "hsl(145, 85%, 47%)");
    } else {
        root.style.setProperty("--mdc-theme-primary", "#6200ee");
        root.style.setProperty("--mdc-theme-primary-darker", "#5000c1");
        root.style.setProperty("--mdc-theme-secondary", "#018786");
        root.style.setProperty("--mdc-theme-secondary-10pct", "#E3F2F2");
        root.style.setProperty("--mdc-theme-secondary-50pct", "#72BCBC");
        root.style.setProperty("--mdc-theme-secondary-lighter", "rgba(1, 135, 134, .5)");
        root.style.setProperty("--mdc-theme-background", "#fff");
        root.style.setProperty("--mdc-theme-surface", "#fff");
        root.style.setProperty("--mdc-theme-header", "var(--mdc-theme-primary)");
        root.style.setProperty("--mdc-theme-header-secondary", "var(--mdc-theme-secondary)");
        root.style.setProperty("--mdc-theme-error", "#b00020");
        root.style.setProperty("--mdc-theme-on-primary", "#fff");
        root.style.setProperty("--mdc-theme-on-secondary", "#fff");
        root.style.setProperty("--mdc-theme-on-surface", "#000");
        root.style.setProperty("--mdc-theme-on-header", "var(--mdc-theme-on-primary)");
        root.style.setProperty("--mdc-theme-on-error", "#fff");
        root.style.setProperty("--mdc-theme-text-primary-on-background", "var(--lumo-body-text-color)");
        root.style.setProperty("--mdc-theme-text-secondary-on-background", "rgba(0, 0, 0, 0.54)");
        root.style.setProperty("--mdc-theme-text-hint-on-background", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-disabled-on-background", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-divider-on-background", "rgba(0, 0, 0, 0.12)");
        root.style.setProperty("--mdc-theme-text-light-hover-on-background", "#f5f5f5");
        root.style.setProperty("--mdc-theme-text-light-primary-on-background", "rgb(243, 235, 254)");

        root.style.setProperty("--mdc-theme-text-icon-on-background", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-primary-on-light", "rgba(0, 0, 0, 0.87)");
        root.style.setProperty("--mdc-theme-text-secondary-on-light", "rgba(0, 0, 0, 0.54)");
        root.style.setProperty("--mdc-theme-text-hint-on-light", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-disabled-on-light", "rgba(0, 0, 0, 0.38)");
        root.style.setProperty("--mdc-theme-text-icon-on-light", "rgba(0, 0, 0, 0.38)");

        root.style.setProperty("--pulse-shadow", "0 0 0 0 rgb(98, 0, 238, 1)");
        root.style.setProperty("--pulse-shadow-0", "0 0 0 0 rgb(98, 0, 238, 0.7)");
        root.style.setProperty("--pulse-shadow-70", "0 0 0 20px rgb(98, 0, 238, 0)");
        root.style.setProperty("--pulse-shadow-100", "0 0 0 0 rgb(98, 0, 238, 0)");

        root.style.setProperty("--pulse-shadow-gold", "0 0 0 0 rgb(135,134,1, 1)");
        root.style.setProperty("--pulse-shadow-gold-0", "0 0 0 0 rgb(135,134,1, 0.7)");
        root.style.setProperty("--pulse-shadow-gold-70", "0 0 0 20px rgb(135,134,1, 0)");
        root.style.setProperty("--pulse-shadow-gold-100", "0 0 0 0 rgb(135,134,1, 0)");

        root.style.setProperty("--pulse-shadow-secondary", "0 0 0 0 rgb(1, 135, 134, 1)");
        root.style.setProperty("--pulse-shadow-secondary-0", "0 0 0 0 rgb(1, 135, 134, 0.7)");
        root.style.setProperty("--pulse-shadow-secondary-70", "0 0 0 20px rgb(1, 135, 134, 0)");
        root.style.setProperty("--pulse-shadow-secondary-100", "0 0 0 0 rgb(1, 135, 134, 0)");

        // Lumo
        root.style.setProperty("--lumo-base-color", "var(--mdc-theme-surface)");

        root.style.setProperty("--lumo-tint-5pct", "hsla(0, 0%, 100%, 0.3)");
        root.style.setProperty("--lumo-tint-10pct", "hsla(0, 0%, 100%, 0.37)");
        root.style.setProperty("--lumo-tint-20pct", "hsla(0, 0%, 100%, 0.44)");
        root.style.setProperty("--lumo-tint-30pct", "hsla(0, 0%, 100%, 0.5)");
        root.style.setProperty("--lumo-tint-40pct", "hsla(0, 0%, 100%, 0.57)");
        root.style.setProperty("--lumo-tint-50pct", "hsla(0, 0%, 100%, 0.64)");
        root.style.setProperty("--lumo-tint-60pct", "hsla(0, 0%, 100%, 0.7)");
        root.style.setProperty("--lumo-tint-70pct", "hsla(0, 0%, 100%, 0.77)");
        root.style.setProperty("--lumo-tint-80pct", "hsla(0, 0%, 100%, 0.84)");
        root.style.setProperty("--lumo-tint-90pct", "hsla(0, 0%, 100%, 0.9)");
        root.style.setProperty("--lumo-tint", "#FFF");

        root.style.setProperty("--lumo-shade-5pct", "hsla(214, 61%, 25%, 0.05)");
        root.style.setProperty("--lumo-shade-10pct", "hsla(214, 57%, 24%, 0.1)");
        root.style.setProperty("--lumo-shade-20pct", "hsla(214, 53%, 23%, 0.16)");
        root.style.setProperty("--lumo-shade-30pct", "hsla(214, 50%, 22%, 0.26)");
        root.style.setProperty("--lumo-shade-40pct", "hsla(214, 47%, 21%, 0.38)");
        root.style.setProperty("--lumo-shade-50pct", "hsla(214, 45%, 20%, 0.5)");
        root.style.setProperty("--lumo-shade-60pct", "hsla(214, 43%, 19%, 0.61)");
        root.style.setProperty("--lumo-shade-70pct", "hsla(214, 42%, 18%, 0.72)");
        root.style.setProperty("--lumo-shade-80pct", "hsla(214, 41%, 17%, 0.83)");
        root.style.setProperty("--lumo-shade-90pct", "hsla(214, 40%, 16%, 0.94)");
        root.style.setProperty("--lumo-shade", "hsl(214, 35%, 15%)");

        root.style.setProperty("--lumo-contrast-5pct", "var(--lumo-shade-5pct)");
        root.style.setProperty("--lumo-contrast-10pct", "var(--lumo-shade-10pct)");
        root.style.setProperty("--lumo-contrast-20pct", "var(--lumo-shade-20pct)");
        root.style.setProperty("--lumo-contrast-30pct", "var(--lumo-shade-30pct)");
        root.style.setProperty("--lumo-contrast-40pct", "var(--lumo-shade-40pct)");
        root.style.setProperty("--lumo-contrast-50pct", "var(--lumo-shade-50pct)");
        root.style.setProperty("--lumo-contrast-60pct", "var(--lumo-shade-60pct)");
        root.style.setProperty("--lumo-contrast-70pct", "var(--lumo-shade-70pct)");
        root.style.setProperty("--lumo-contrast-80pct", "var(--lumo-shade-80pct)");
        root.style.setProperty("--lumo-contrast-90pct", "var(--lumo-shade-90pct)");
        root.style.setProperty("--lumo-contrast", "var(--lumo-shade)");

        root.style.setProperty("--mdc-theme-surface-surface", "#e7ebee");
        root.style.setProperty("--mdc-theme-on-surface-surface", "var(--lumo-shade-50pct)");
        root.style.setProperty("--lumo-header-text-color", "var(--lumo-contrast)");
        root.style.setProperty("--lumo-body-text-color", "var(--lumo-contrast-90pct)");
        root.style.setProperty("--lumo-secondary-text-color", "var(--lumo-contrast-70pct)");
        root.style.setProperty("--lumo-tertiary-text-color", "var(--lumo-contrast-50pct)");
        root.style.setProperty("--lumo-disabled-text-color", "var(--lumo-contrast-30pct)");

        root.style.setProperty("--lumo-primary-color", "var(--mdc-theme-primary)");
        root.style.setProperty("--lumo-primary-color-50pct", "#b18ef9");
        root.style.setProperty("--lumo-primary-color-10pct", "#f0e8fd");
        root.style.setProperty("--lumo-primary-text-color", "var(--mdc-theme-primary)");
        root.style.setProperty("--lumo-primary-contrast-color", "#FFF");

        root.style.setProperty("--lumo-error-color", "hsl(3, 100%, 61%)");
        root.style.setProperty("--lumo-error-color-50pct", "hsla(3, 100%, 60%, 0.5)");
        root.style.setProperty("--lumo-error-color-10pct", "hsla(3, 100%, 60%, 0.1)");
        root.style.setProperty("--lumo-error-text-color", "hsl(3, 92%, 53%)");
        root.style.setProperty("--lumo-error-contrast-color", "#FFF");
        
        root.style.setProperty("--lumo-success-color", "hsl(145, 80%, 42%)");
        root.style.setProperty("--lumo-success-color-50pct", "hsla(145, 76%, 44%, 0.55)");
        root.style.setProperty("--lumo-success-color-10pct", "hsla(145, 76%, 44%, 0.12)");
        root.style.setProperty("--lumo-success-text-color", "hsl(145, 100%, 32%)");
        root.style.setProperty("--lumo-success-contrast-color", "#FFF");
    }
};
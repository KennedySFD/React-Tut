import StyledComponentsRegistry from "@/lib/registry";
import ThemeProvider from "@/theme/ThemeProvider";

export const metadata = {
  title: "Component Library",
  description:
    "A token-driven React component library built with Next.js and styled-components.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

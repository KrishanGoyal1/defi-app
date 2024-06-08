import "../../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./Providers";

function SwapLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>{children}</Providers>
  );
}

export default SwapLayout;
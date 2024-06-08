import ConnectButton from "@/components/Button";
import HomeComnponent from "@/components/Home";
import Navbar from "@/components/Navbar";
import TrendingCoins from "@/components/TrendingCoins";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="">
        <TrendingCoins />
        <HomeComnponent />
      </div>
    </div>
  );
}

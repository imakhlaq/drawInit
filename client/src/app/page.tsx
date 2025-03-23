import Image from "next/image";
import Canvas from "@/app/_components/canvas";
import ToolBox from "@/app/_components/ToolTip";

//font-[family-name:var(--font-geist-mono)]
export default function Home() {
  return (
    <section className="">
      <ToolBox />
      <Canvas />
    </section>
  );
}
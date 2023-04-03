import Image from "next/image";

function Cursor({ x, y }: { x: number; y: number }) {
  return (
    <Image
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
        transition: "transform 120ms linear",
      }}
      src="https://liveblocks.io/images/cursor.svg"
      alt={"just a block"}
      width={32}
      height={32}
    />
  );
}

export default Cursor;

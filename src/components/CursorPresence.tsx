// import { type BaseUserMeta, type User } from "@liveblocks/client";
// import { useOthers, useUpdateMyPresence } from "liveblocks.config";
// import {
//   type PointerEvent,
//   type PointerEventHandler,
//   type ReactNode,
// } from "react";
// import Cursor from "./Cursor";

// const CursorPresence = ({ children }: { children: ReactNode }) => {
//   type Presence = {
//     cursor: { x: number; y: number } | null;
//   };
//   const updateMyPresence = useUpdateMyPresence();
//   const onPointerMove: PointerEventHandler<HTMLDivElement> = (
//     event: PointerEvent
//   ) => {
//     updateMyPresence({
//       cursor:
//         {
//           x: Math.round(event.clientX),
//           y: Math.round(event.clientY),
//         } || null,
//     });
//   };

//   const onPointerLeave = () => {
//     updateMyPresence({
//       cursor: null,
//     });
//   };

//   const others = useOthers();

//   const showOther = ({ user }: { user: User<Presence, BaseUserMeta> }) => {
//     if (!user.presence || !user.presence.cursor) return null;
//     const { x, y } = user.presence.cursor;

//     return <Cursor key={user.connectionId} x={x} y={y} />;
//   };

//   return (
//     <div onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
//       {others.map((user) => showOther({ user }))}
//       {children}
//     </div>
//   );
// };

// export default CursorPresence;

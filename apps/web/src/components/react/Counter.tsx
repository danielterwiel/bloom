import { useState } from "react";
import { Button } from "@repo/ui";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => setCount((c) => c - 1)}>-</Button>
      <span className="text-lg font-semibold">{count}</span>
      <Button onClick={() => setCount((c) => c + 1)}>+</Button>
    </div>
  );
}

import React, { Suspense } from "react";
import Generate from "../app/generate/Generate";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Generate />
    </Suspense>
  );
}

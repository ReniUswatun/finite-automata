import dynamic from "next/dynamic";
const MermaidComponent = dynamic(
  () => import("@/components/mermaidComponent"),
  { ssr: false }
);
export default function page() {
  let mermaidCode = `
  flowchart LR
  idB(( B )) --> |0| idB(( B ))
  idB(( B )) --> |1| idD(( D ))
  idD(( D )) --> |0| idB(( B ))
  idD(( D )) --> |1| idE(( E ))
  idE(( E )) --> |0| idB(( B ))
  idE(( E )) --> |1| idC(( C ))
  idE((( E )))
  idAC(( AC )) --> |0| idB(( B ))
  idAC(( AC )) --> |1| idC(( C ))
  start --> idAC(( AC ))`;
  return (
    <>
      <MermaidComponent code={mermaidCode}></MermaidComponent>
    </>
  );
}

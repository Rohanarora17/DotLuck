import Lottery from "./Lottery"



export default async  function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
   const id = (await params).id
  return <Lottery id={parseInt(id)} />
}


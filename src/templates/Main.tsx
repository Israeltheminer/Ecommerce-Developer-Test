import type { ReactNode } from 'react'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

const Main = (props: IMainProps) => (
  <div className="w-full text-gray-700 antialiased">
    { props.meta }
    <div className="mx-auto">
      <div className="content text-xl">{ props.children }</div>
    </div>
  </div>
)

export { Main }

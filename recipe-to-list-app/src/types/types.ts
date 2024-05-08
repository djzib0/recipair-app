export type PostProps = {
    key: number,
    id: number,
    title: string,
    body: string
}

export type MenuItem = {
    id: number,
    icon: JSX.Element;
    linkTo: string
}
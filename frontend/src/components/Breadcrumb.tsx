import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'

export type Page = {
    name: string,
    url?: string,
    icon?: string
}

type BreadcrumbProps = {
    pages?: Page[]
}

const BreadcrumbPage = ({ pages }: BreadcrumbProps) => (
    <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item href="/">
            <Link to="/"><Icon type="home" /> Home</Link>
        </Breadcrumb.Item>
        {pages && pages.map((p) => {
            let item: JSX.Element = <>{p.icon && <Icon type="user" />}{p.name}</>
            if (p.url) {
                item = <Link to={p.url}>{item}</Link>
            }
            return <Breadcrumb.Item href={p.url}>
                {item}
            </Breadcrumb.Item>
        })}
    </Breadcrumb>
)

export default BreadcrumbPage

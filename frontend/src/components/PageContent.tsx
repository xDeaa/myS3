import React from 'react'
import BreadcrumbPage, { Page } from './Breadcrumb'

type PageContentProps = {
    breadcrumbPages?: Page[],
    title: string
}

const PageContent: React.FC<PageContentProps> = ({ breadcrumbPages, title, children }) => ( 
    <>
        <BreadcrumbPage pages={breadcrumbPages} />
        <div style={{ background: '#fff', padding: 24, minHeight: 280, borderRadius: 10 }}>
            <h1>{title}</h1>
            {children}
        </div>
    </>
)

export default PageContent

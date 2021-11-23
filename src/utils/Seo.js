import React from 'react'
import { Helmet } from 'react-helmet-async'
import Logo from '../images/image-logo.png'

const Seo = ({
	title,
	description = 'Shop bán hàng đầu hàng Việt Nam',
	image,
}) => {
	return (
		<Helmet>
			<meta name="description" content={description} />
			<meta property="og:description" content={description} />
			<meta name="twitter:description" content={description} />
			<meta property="og:image" content={image ? image : Logo} />
			<meta property="og:image:alt" content="l1rf-store" />
			<meta property="og:url" content="https://l1rf.online" />
			<meta property="og:title" content={title} />
			<title>{title}</title>
		</Helmet>
	)
}

export default Seo

import React from 'react'
import Helmet from 'react-helmet'

const Seo = ({
	title,
	description = 'Shop bán hàng đầu hàng Việt Nam',
	image = 'https://l1rf.online/image-logo.png',
}) => {
	return (
		<Helmet>
			<meta name="description" content={description} />
			<meta property="og:description" content={description} />
			<meta name="twitter:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:image:alt" content="l1rf-store" />
			<meta property="og:url" content="https://l1rf.online" />
			<meta property="og:title" content={title} />
			<meta property="fb:app_id" content="512680796465992" />
			<meta property="og:type" content="article" />
			<meta name="author" content="Toàn" />
			<title>{title}</title>
		</Helmet>
	)
}

export default Seo

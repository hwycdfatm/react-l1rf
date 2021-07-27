import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Carousel(props) {
	const Customslider = (props) => (
		<div
			className={`flex items-center justify-center w-full h-56 md:h-50v ${props.bgColor}`}
		>
			<img src={props.carousel} alt="" className="object-contain h-full" />
		</div>
	)

	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		cssEase: 'linear',
	}
	return (
		<div>
			<Slider {...settings}>
				{props.carousels.map((carousel, index) => (
					<Customslider
						key={index}
						bgColor={carousel.bgColor}
						carousel={carousel.image}
					/>
				))}
			</Slider>
		</div>
	)
}

import React from 'react'
import Title from '../components/Title';
import {assets} from '../assets/assets';
import NewsLetter from '../components/NewsLetter';
 
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 botder-t'>
        < Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          
          <p>Welcome to SHOPZORA, your ultimate destination for trendsetting fashion and lifestyle products. We believe shopping should be as delightful as the products you buy—fast, easy, and tailored to your style. At SHOPZORA, we curate a wide range of clothing, accessories, and essentials that blend quality with affordability, all while ensuring a seamless user experience. Whether you’re revamping your wardrobe or looking for a unique gift, SHOPZORA brings the best of fashion right to your fingertips.</p>

          <p>Built with passion and precision, SHOPZORA isn’t just a store—it’s a community. Our mission is to empower every shopper with the confidence to express their identity through style. Developed using modern web technologies like the MERN stack, SHOPZORA is designed for speed, reliability, and scalability. We’re constantly evolving to offer the best features, intuitive navigation, and secure transactions—because at SHOPZORA, we don’t just sell products, we deliver experience.</p>

          <b className='text-gray-800'>Our Mission</b>
          <p>At SHOPZORA, we aim to make fashion accessible, affordable, and enjoyable for everyone.
             We focus on delivering quality products with a smooth and secure shopping experience.
            Our mission is to empower individuals to express their style with confidence.</p>
        </div>
      </div>
      <div className='py-2 text-4xl'>
        < Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-2'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>✅ Quality Assurance:</b>
          <p className='text-gray-500'>
            At SHOPZORA, we ensure every product is carefully selected, well-inspected, and meets our quality standards—so you always get the best.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>💡 Convenience:</b>
          <p className='text-gray-500'>
            At SHOPZORA, we make shopping simple and stress-free. With a user-friendly interface, secure checkout, and fast delivery, everything you need is just a few clicks away.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>🤝 Exceptional Customer Service:</b>
          <p className='text-gray-500'>
            At SHOPZORA, your satisfaction is our priority. Our support team is always ready to help with quick responses, easy returns, and a smooth shopping experience from start to finish.
          </p>
        </div>
      </div>
      < NewsLetter />
    </div>
  )
}

export default About
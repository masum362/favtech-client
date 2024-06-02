import React from 'react'

const CustomBtn = ({ text, style, btnType }) => {
  return (
    <button type={btnType ? btnType : 'button'} className={`${style} btn bg-themePrimary text-white hover:bg-themeSecondary hover:text-black hover:border-themePrimary duration-300`} >{text}</button>
  )
}

export default CustomBtn
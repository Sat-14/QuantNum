import { TypeAnimation } from 'react-type-animation';
import '@south-paw/typeface-minecraft';
export default function MyComponent({myarr})  {
    myarr = myarr.flatMap((item)=> [item, 1000])
  return (
    <TypeAnimation
      sequence={myarr}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block', fontFamily: '"Minecraft",Arial, sans-serif' }}
      repeat={Infinity}
    />
  );
};
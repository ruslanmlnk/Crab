"use client"
import Image from 'next/image'
import { DecorativeLines } from './DecorativeLines'
import { GetInTouch } from './GetInTouch'

interface FooterProps {
  showGetInTouch?: boolean
}

export const Footer: React.FC<FooterProps> = ({ showGetInTouch = true }) => {
  return (
    <footer className="w-full flex flex-col bg-blue-dark relative">
      {showGetInTouch && <GetInTouch />}
      <DecorativeLines color="rgba(255, 255, 255, 1)" opacity={0.15} fade="bottom" showCenterLine={false} showMobile={false} />
      {/* Footer Top Bar / Logo Slider Strip - Redesigned Marquee */}
      <div className="w-full h-[180px] md:h-[264px] bg-[#071A26] overflow-hidden flex items-center relative border-y border-white/10">
        <div className="flex animate-scroll whitespace-nowrap items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-[68px] shrink-0 h-full px-[34px]">
              {/* Social Media Icons Strip */}
              <div className="w-[1200px] md:w-[1527px] h-[140px] md:h-[180px] relative flex-shrink-0">
                <Image 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/11bdb529da883f593c2ed24deff050957841da58?width=3053" 
                  alt="Social Media and Links" 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 1200px, 1527px"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Info - Redesigned per Figma with Mobile adjustments */}
      <div className="w-full bg-[#071A26] border-t border-[#85A7B7]/20">
        <div className="container-custom py-6 lg:py-[70px] flex flex-col lg:flex-row items-stretch lg:items-start gap-6 lg:gap-[40px]">
          {/* Left: Contact Info */}
          <div className="flex flex-col md:flex-row lg:flex-row w-full lg:w-[609.5px] justify-between items-start md:items-center lg:items-center gap-6 lg:gap-0 relative">
            <div className="flex flex-col items-start gap-4">
              <a href="tel:+4796678293" className="text-white hover:text-ice-mist transition-colors text-base font-normal leading-[145%]">+47 96678293</a>
              <a href="mailto:Daniil.radishevskiy@icloud.com" className="text-white hover:text-ice-mist transition-colors text-base font-normal leading-[145%]">Daniil.radishevskiy@icloud.com</a>
            </div>

            <button className="flex px-6 py-3 items-center gap-2 rounded-[40px] border border-white group transition-all duration-300 hover:bg-white/10">
              <div className="flex flex-col items-start">
                <span className="text-white text-base font-semibold lowercase leading-[145%]">contact us</span>
                <div className="h-[1px] w-full bg-white transition-all" />
              </div>
              <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="white"/>
                </svg>
              </div>
            </button>
          </div>

          {/* Divider: Horizontal on mobile, Vertical on desktop */}
          <div className="w-full lg:w-[1px] h-[1px] lg:h-[92px] bg-[#85A7B7]/20 self-center" />

          {/* Right: About Section */}
          <div className="flex w-full lg:w-[609.5px] items-center lg:items-start gap-6 lg:gap-[140px] relative">
            <div className="flex-1 text-white/60 text-sm lg:text-base font-normal leading-[145%]">
              We share real offshore experience and practical knowledge about crab fishing, 
              helping people understand life and work on Norwegian vessels
            </div>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-[50px] h-[50px] rounded-[50px] bg-white flex items-center justify-center shrink-0 transition-transform hover:scale-110 cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4717 5.0215L11.8447 4.6582L12.1924 5.0449L16.1055 9.4023L15.3613 10.0703L12.2881 6.6494V19H11.2881V6.5967L7.69727 10.0947L7 9.3779L11.4717 5.0215Z" fill="#071A26"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>

    </footer>
  )
}

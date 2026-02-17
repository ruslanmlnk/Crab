"use client"
import Image from 'next/image'
import { DecorativeLines } from './DecorativeLines'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col bg-blue-dark relative">
      <DecorativeLines color="rgba(255, 255, 255, 1)" opacity={0.15} fade="bottom" showCenterLine={false} />
      {/* Footer Top Bar / Logo Slider Strip */}
      <div className="w-full h-[263px] bg-blue-dark overflow-hidden flex items-center relative border-b border-white/10">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-[68px] mx-[34px]">
              <div className="w-[150px] h-[40px] relative">
                <Image 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/09c56b150f502440ef166c7b7c035306d19395a8?width=300" 
                  alt="Logo" 
                  fill
                  className="object-contain opacity-50"
                  sizes="150px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="container-custom py-12 md:py-[70px] grid grid-cols-1 md:grid-cols-2 gap-10 items-start border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <a href="tel:+4796678293" className="text-white hover:text-ice-mist transition-colors text-base">+47 96678293</a>
            <a href="mailto:Daniil.radishevskiy@icloud.com" className="text-white hover:text-ice-mist transition-colors text-base lowercase">Daniil.radishevskiy@icloud.com</a>
          </div>

          <button className="btn-base btn-white group">
            <div className="flex flex-col items-start border-0">
              <span className="text-white font-semibold lowercase leading-[145%]">contact us</span>
              <div className="h-[1px] w-full bg-white transition-transform origin-left group-hover:scale-x-0" />
            </div>
            <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="white"/>
              </svg>
            </div>
          </button>
        </div>

        <div className="flex justify-between items-start w-full gap-8 border-l border-white/20 pl-6">
          <p className="text-white/60 text-sm md:text-base leading-[145%]">
            We share real offshore experience and practical knowledge about crab fishing, helping people understand life and work on Norwegian vessels
          </p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shrink-0 transition-transform hover:scale-110 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-90">
              <path d="M18.9785 11.4717L19.3418 11.8447L18.9551 12.1924L14.5977 16.1055L13.9297 15.3613L17.3506 12.2881H5V11.2881H17.4033L13.9053 7.69727L14.6221 7L18.9785 11.4717Z" fill="#071A26"/>
            </svg>
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </footer>
  )
}

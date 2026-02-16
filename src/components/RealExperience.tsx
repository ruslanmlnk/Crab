import React from 'react'

export const RealExperience: React.FC = () => {
  const experiences = [
    {
      id: '01.',
      label: 'Real path, not theory',
      title: 'Built on firsthand experience — from fishing vessel entry level in Africa, Nederland to work on norwegian fishing/crab boat. More that 6 years experience',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0d446201a3dad7bfb8c419afbb32531a9a882784?width=2880'
    },
    {
      id: '02.',
      label: 'Practical guidance',
      title: 'No abstract advice. Only real information about work conditions and what to expect at sea',
    },
    {
      id: '03.',
      label: 'Personal involvement',
      title: 'Direct guidance from someone who has been through this path and understands its challenges',
    }
  ]

  return (
    <section className="w-full">
      {experiences.map((exp, index) => (
        <div 
          key={exp.id}
          className={`w-full h-[700px] flex items-center relative overflow-hidden bg-cover bg-center`}
          style={{ 
            backgroundImage: exp.image ? `linear-gradient(0deg, rgba(11, 31, 49, 0.30) 0%, rgba(11, 31, 49, 0.30) 100%), url('${exp.image}')` : 'none',
            backgroundColor: exp.image ? 'transparent' : '#071A26'
          }}
        >
          <div className="container-custom flex items-center justify-between">
            <div className={`max-w-[632px] p-12 glass-card flex gap-8 ${index % 2 === 1 ? 'ml-auto' : ''}`}>
              <span className="text-[20px] font-normal leading-[145%] text-white">{exp.id}</span>
              <div className="flex flex-col gap-4">
                <span className="text-label text-ice-mist">{exp.label}</span>
                <h3 className="text-h3 text-white leading-[145%]">{exp.title}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export function OurTeamSection() {
  const coreTeamMembers = [
    {
      id: '1',
      name: 'Rashid Mahmood',
      fatherName: 'Zahid Mahmood',
      role: 'Country Head - PAK',
      image: '/placeholder-avatar.jpg',
    },
    {
      id: '2',
      name: 'John Smith',
      fatherName: 'James Smith',
      role: 'Technical Lead',
      image: '/placeholder-avatar.jpg',
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      fatherName: 'Michael Johnson',
      role: 'Operations Manager',
      image: '/placeholder-avatar.jpg',
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Our Team</h2>
          <p className="text-slate-400">Meet our core team of talented professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition text-center"
            >
              <div className="w-32 h-32 rounded-full bg-slate-800 mx-auto mb-4 overflow-hidden flex items-center justify-center border-2 border-red-600">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">👤</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-red-600 font-semibold mb-2">{member.role}</p>
              <p className="text-slate-400 text-sm">Father: {member.fatherName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

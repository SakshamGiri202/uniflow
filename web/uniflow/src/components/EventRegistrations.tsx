import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  eventId: string;
  eventName: string;
  onBack: () => void;
}

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  year_of_study: string;
  department: string;
  dietary_preferences: string;
  created_at: string;
}

export default function EventRegistrations({ eventId, eventName, onBack }: Props) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
      } else {
        setRegistrations(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadCSV = () => {
    if (registrations.length === 0) {
      alert('No registrations to download');
      return;
    }

    const headers = ['Full Name', 'Email', 'Phone', 'College', 'Year of Study', 'Department', 'Dietary Preferences', 'Registered At'];
    const csvContent = [
      headers.join(','),
      ...registrations.map(reg =>
        [
          `"${reg.full_name}"`,
          `"${reg.email}"`,
          `"${reg.phone}"`,
          `"${reg.college}"`,
          `"${reg.year_of_study}"`,
          `"${reg.department}"`,
          `"${reg.dietary_preferences}"`,
          `"${new Date(reg.created_at).toLocaleDateString()}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventName}-registrations.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-dvh bg-[#090C12] text-white">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#0D1119]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-white/70 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <div>
              <div className="text-3xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">Event Registrations</h1>
          <p className="text-white/70">📍 {eventName}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#12161E] overflow-hidden">
          <div className="border-b border-white/10 bg-[#0A0D14] p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-white/50">Total Registrations</p>
                <p className="text-3xl font-black text-sky-300">{registrations.length}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#161B22] px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
              />
              <button
                onClick={handleDownloadCSV}
                className="rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-2 text-sm font-bold text-white hover:scale-105 transition-transform"
              >
                📥 Export CSV
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <p className="text-white/50">Loading registrations...</p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-white/50">
                {registrations.length === 0 ? 'No registrations yet' : 'No registrations match your search'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10 bg-[#0A0D14]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white/70 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white/70 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white/70 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white/70 uppercase tracking-wider">College</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white/70 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white/70 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white/70 uppercase tracking-wider">Dietary</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white/70 uppercase tracking-wider">Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg, idx) => (
                    <tr
                      key={reg.id}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        idx % 2 === 0 ? 'bg-[#161A20]' : 'bg-[#12161E]'
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-white font-medium">{reg.full_name}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{reg.email}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{reg.phone}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{reg.college}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{reg.year_of_study}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{reg.department}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{reg.dietary_preferences || '—'}</td>
                      <td className="px-6 py-4 text-sm text-white/70">{new Date(reg.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

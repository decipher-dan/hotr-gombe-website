// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Modal from "../components/Modal";
// import Hero from "../components/Hero";

// const HomePage = () => {
//     const [events, setEvents] = useState([]);
//     const [sermons, setSermons] = useState([]);
//     const [storyOpen, setStoryOpen] = useState(false);

//     useEffect(() => {
//         const fetchPreview = async () => {
//             try {
//                 const [eventsRes, sermonsRes] = await Promise.all([
//                     fetch(`${import.meta.env.VITE_API_URL}/events`),
//                     fetch(`${import.meta.env.VITE_API_URL}/sermon`),
//                 ]);

//                 if (eventsRes.ok) {
//                     const data = await eventsRes.json();
//                     setEvents(data.result.slice(0, 3));
//                 }

//                 if (sermonsRes.ok) {
//                     const data = await sermonsRes.json();
//                     setSermons(data.result.slice(0, 2));
//                 }
//             } catch (err) {
//                 console.error("homepage preview fetch failed:", err);
//             }
//         };

//         fetchPreview();
//     }, []);

//     return (
//         <div className="w-full">
//             {/* Hero */}
//                 <Hero />

//             {/* About teaser */}
//             <section className="py-20 px-6 max-w-3xl mx-auto text-center">
//                 <h2 className="font-display text-3xl font-semibold mb-4">Who We Are</h2>
//                 <p className="text-gray-600 mb-6">
//                     We are a Christ-centered community committed to worship, discipleship,
//                     and reaching our city with the gospel. Whether you're exploring faith
//                     for the first time or looking for a church home, we'd love to have you.
//                 </p>
//                 <button
//                     onClick={() => setStoryOpen(true)}
//                     className="text-gold font-medium hover:underline"
//                 >
//                     Discover Our Story →
//                 </button>
//             </section>

//             {/* Upcoming events preview */}
//             <section className="py-20 px-6 bg-gray-50">
//                 <h2 className="font-display text-3xl font-semibold text-center mb-10">Upcoming Events</h2>
//                 <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//                     {events.map((event) => (
//                         <div key={event.id} className="bg-white rounded-xl shadow p-6">
//                             <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
//                             <p className="text-gray-500 text-sm mb-2">{event.venue}</p>
//                             <p className="text-gray-600 text-sm">{event.description}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="text-center mt-10">
//                     <Link to="/events" className="text-gold font-medium hover:underline">
//                         View all events →
//                     </Link>
//                 </div>
//             </section>

//             {/* Latest sermons preview */}
//             <section className="py-20 px-6 max-w-5xl mx-auto">
//                 <h2 className="font-display text-3xl font-semibold text-center mb-10">Latest Sermons</h2>
//                 <div className="grid md:grid-cols-2 gap-6">
//                     {sermons.map((sermon) => (
//                         <div key={sermon.id} className="bg-white rounded-xl shadow p-6">
//                             <h3 className="text-xl font-semibold mb-1">{sermon.title}</h3>
//                             <p className="text-gray-500 text-sm mb-2">{sermon.preacher}</p>
//                             <p className="text-gray-600 text-sm">{sermon.description}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="text-center mt-10">
//                     <Link to="/sermons" className="text-gold font-medium hover:underline">
//                         View all sermons →
//                     </Link>
//                 </div>
//             </section>

//             {/* CTA strip */}
//             <section className="py-20 px-6 bg-ink text-paper text-center">
//                 <h2 className="font-display text-3xl font-semibold mb-4">Get Involved</h2>
//                 <p className="text-paper/70 mb-8 max-w-xl mx-auto">
//                     Partner with us, book a time with a pastor, or reach out with a prayer request.
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-4">
//                     <Link to="/partnership" className="bg-gold text-ink px-6 py-3 rounded-full font-medium hover:brightness-110 transition">
//                         Become a Partner
//                     </Link>
//                     <Link to="/contact" className="border border-paper/40 px-6 py-3 rounded-full font-medium hover:bg-paper hover:text-ink transition">
//                         Book an Appointment
//                     </Link>
//                 </div>
//             </section>

//             <Modal isOpen={storyOpen} onClose={() => setStoryOpen(false)} title="Our Story">
//                 <p className="text-gray-600 mb-4">
//                     House of the Redeemer began as a small gathering of believers committed to
//                     seeing lives transformed by the gospel. Over the years, we've grown into a
//                     diverse community united by worship, the Word, and genuine fellowship.
//                 </p>
//                 <p className="text-gray-600">
//                     Our mission is simple: to help people encounter God, grow in faith, and
//                     discover their purpose — together.
//                 </p>
//             </Modal>
//         </div>
//     );
// };

// export default HomePage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Hero from "../components/Hero";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [storyOpen, setStoryOpen] = useState(false);

  // Testimonials state and data setup
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "Joining this community completely reshaped my walk with God. I found real fellowship and true discipleship.",
      author: "Sarah Jenkins"
    },
    {
      id: 2,
      quote: "The Word Feast on Thursdays has given me a deeper understanding of scripture than I ever thought possible.",
      author: "David Alao"
    },
    {
      id: 3,
      quote: "We walked through a rough season last year, but the family service reminded us we aren't alone.",
      author: "The Emmanuel Family"
    }
  ];

  // Auto-advance testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const [eventsRes, sermonsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/events`),
          fetch(`${import.meta.env.VITE_API_URL}/sermon`),
        ]);

        if (eventsRes.ok) {
          const data = await eventsRes.json();
          setEvents(data.result.slice(0, 3));
        }

        if (sermonsRes.ok) {
          const data = await sermonsRes.json();
          setSermons(data.result.slice(0, 2));
        }
      } catch (err) {
        console.error("homepage preview fetch failed:", err);
      }
    };

    fetchPreview();
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <Hero />

      {/* About teaser */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl font-semibold mb-4 text-stone-900">Who We Are</h2>
        <p className="text-gray-600 mb-6">
          We are a Christ-centered community committed to worship, discipleship,
          and reaching our city with the gospel. Whether you're exploring faith
          for the first time or looking for a church home, we'd love to have you.
        </p>
        <button
          onClick={() => setStoryOpen(true)}
          className="text-amber-500 font-medium hover:underline"
        >
          Discover Our Story →
        </button>
      </section>

      {/* 1. Service Days & 2. Types of Services (Non-Card Layout) */}
      <section className="py-20 px-6 bg-white border-t border-gray-100 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Service Days Schedule */}
          <div>
            <span className="text-amber-500 font-semibold uppercase tracking-wider text-sm">Gather With Us</span>
            <h2 className="font-display text-3xl font-semibold mt-2 mb-8 text-stone-900">Weekly Service Days</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-medium text-stone-900">Prayer Feast</h3>
                  <p className="text-gray-500 text-sm mt-1">Deep intercession and seeking God's face</p>
                </div>
                <span className="text-amber-500 font-semibold text-right whitespace-nowrap">Tuesdays</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-medium text-stone-900">Word Feast</h3>
                  <p className="text-gray-500 text-sm mt-1">Uncompromising exposition of the scriptures</p>
                </div>
                <span className="text-amber-500 font-semibold text-right whitespace-nowrap">Thursdays</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-xl font-medium text-stone-900">Sunday Services</h3>
                  <p className="text-gray-500 text-sm mt-1">Celebration worship and transformative word</p>
                </div>
                <span className="text-amber-500 font-semibold text-right whitespace-nowrap">Sundays</span>
              </div>
            </div>
          </div>

          {/* Sunday Experiences Rhythm */}
          <div className="bg-stone-50 rounded-2xl p-8 md:p-10 border border-stone-100">
            <span className="text-gray-400 font-semibold uppercase tracking-wider text-sm">Monthly Rhythm</span>
            <h2 className="font-display text-2xl font-semibold mt-2 mb-6 text-stone-900">Our Sunday Services</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-stone-200/60">
                <span className="text-xs font-bold text-amber-500 uppercase">1st Sunday</span>
                <h4 className="font-semibold text-stone-800 text-base mt-1">Communion Service</h4>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200/60">
                <span className="text-xs font-bold text-amber-500 uppercase">2nd Sunday</span>
                <h4 className="font-semibold text-stone-800 text-base mt-1">Family Service</h4>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200/60">
                <span className="text-xs font-bold text-amber-500 uppercase">3rd Sunday</span>
                <h4 className="font-semibold text-stone-800 text-base mt-1">New Wine Service</h4>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200/60">
                <span className="text-xs font-bold text-amber-500 uppercase">4th Sunday</span>
                <h4 className="font-semibold text-stone-800 text-base mt-1">Thanksgiving Service</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 & 4. Upcoming events preview (Kept from original codebase) */}
      <section className="py-20 px-6 bg-stone-50">
        <h2 className="font-display text-3xl font-semibold text-center mb-10 text-stone-900">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
              <h3 className="text-xl font-semibold mb-2 text-stone-900">{event.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{event.venue}</p>
              <p className="text-gray-600 text-sm">{event.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/events" className="text-amber-500 font-medium hover:underline">
            View all events →
          </Link>
        </div>
      </section>

      {/* 5. Latest sermons preview (Kept from original codebase) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-semibold text-center mb-10 text-stone-900">Latest Sermons</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sermons.map((sermon) => (
            <div key={sermon.id} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
              <h3 className="text-xl font-semibold mb-1 text-stone-900">{sermon.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{sermon.preacher}</p>
              <p className="text-gray-600 text-sm">{sermon.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/sermons" className="text-amber-500 font-medium hover:underline">
            View all sermons →
          </Link>
        </div>
      </section>

      {/* 6. Testimonies in an Elegant Carousel */}
      <section className="py-20 px-6 bg-stone-100 border-t border-b border-stone-200/50 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="text-amber-500 font-semibold uppercase tracking-wider text-sm block mb-4">Testimonies</span>
          <h2 className="font-display text-3xl font-semibold mb-12 text-stone-900">Stories of Grace</h2>
          
          <div className="min-h-[140px] flex items-center justify-center transition-all duration-500 ease-in-out">
            <p className="text-xl md:text-2xl text-stone-700 italic max-w-2xl font-serif">
              "{testimonials[currentTestimonial].quote}"
            </p>
          </div>
          <h4 className="mt-6 font-medium text-stone-900">— {testimonials[currentTestimonial].author}</h4>
          
          {/* Carousel Pagination Controllers */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? "bg-amber-500 w-8" : "bg-stone-300 w-2.5"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 px-6 bg-stone-900 text-amber-100 text-center">
        <h2 className="font-display text-3xl font-semibold mb-4">Get Involved</h2>
        <p className="text-amber-100/70 mb-8 max-w-xl mx-auto">
        Partner with us, book a time with a pastor, or reach out with a prayer request.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/partnership" className="bg-amber-500 text-stone-900 px-6 py-3 rounded-full font-medium hover:brightness-110 transition">
            Become a Partner
          </Link>
          <Link to="/contact" className="border border-amber-100/40 px-6 py-3 rounded-full font-medium hover:bg-amber-100 hover:text-stone-900 transition">
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* Modal matching original logic */}
      <Modal isOpen={storyOpen} onClose={() => setStoryOpen(false)} title="Our Story">
        <p className="text-gray-600 mb-4">
          House of the Redeemer began as a small gathering of believers committed to
          seeing lives transformed by the gospel. Over the years, we've grown into a
          diverse community united by worship, the Word, and genuine fellowship.
        </p>
        <p className="text-gray-600">
          Our mission is simple: to help people encounter God, grow in faith, and
          discover their purpose — together.
        </p>
      </Modal>
    </div>
  );
};

export default HomePage;

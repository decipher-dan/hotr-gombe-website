import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Hero from "../components/Hero";
import Location from "../components/Location";
import ServiceRhythm from "../components/ServiceRhythm";
import NewHereBand from "../components/NewHereBand";
import UpcomingEventPhone from "../components/UpcomingEventPhone";
import RecentSermons from "../components/RecentSermons";
import SermonOfTheDay from "../components/SermonOfTheDay";
import ChurchFacets from "../components/ChurchFacets";
import PastorsMessage from "../components/PastorsMessage";
import Testimonies from "../components/Testimonies";
import whoweare from '../assets/whoweare.jpg'

const HomePage = () => {
    const [storyOpen, setStoryOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Hero */}
            <Hero />

{/* About teaser */}
<section id="about" className="py-15 px-6">
    <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
        {/* Photo with floating stat */}
        <div className="relative">
            <div className="rounded-2xl overflow-hidden h-96">
                <img
                    src={whoweare}
                    alt="House on the Rock congregation"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-paper rounded-xl shadow-lg border border-ink/10 px-6 py-4">
                <p className="font-display text-2xl font-semibold text-ink">Matthew 7:24</p>
                <p className="text-ink/50 text-xs">built on the rock</p>
            </div>
        </div>

        {/* Who we are */}
        <div>
            <h2 className="font-display text-3xl font-semibold mb-4 text-ink">Who We Are</h2>
            <p className="text-ink/60 mb-8 leading-relaxed">
                We are a Christ-centered community committed to worship, discipleship,
                and reaching our city with the gospel. Whether you're exploring faith
                for the first time or looking for a church home, we'd love to have you.
            </p>
            <button
                onClick={() => setStoryOpen(true)}
                className="group relative text-hotr-green font-medium"
            >
                Discover Our Story
                <span className="absolute left-0 -bottom-1 h-px w-full bg-hotr-green origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </button>
        </div>
    </div>
</section>

            {/* A word from the pastor */}
            <PastorsMessage />

            {/* How we gather — Tue/Thu/Sun rhythm */}
            <ServiceRhythm />

            {/* Ministries / facets of the church */}
            <ChurchFacets />

            {/* Next event, phone-mockup countdown */}
            <UpcomingEventPhone />

            {/* New here CTA band */}
            <NewHereBand />

            {/* Sermon of the day — inline player */}
            <SermonOfTheDay />

            {/* Full-bleed map + service times */}
            <Location />

            {/* Recent sermons — featured + grid */}
            <RecentSermons />

            {/* Testimonies — stones of testimony */}
            <Testimonies />

            {/* CTA strip */}
            <section id="plan-visit" className="py-20 px-6 bg-gray-900 text-paper text-center">
                <h2 className="font-display text-3xl font-semibold mb-4">Get Involved</h2>
                <p className="text-paper/70 mb-8 max-w-xl mx-auto">
                    Partner with us, book a time with a pastor, or reach out with a prayer request.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/partnership" className="bg-hotr-green text-ink px-6 py-3 rounded-full font-medium hover:brightness-110 transition">
                        Become a Partner
                    </Link>
                    <Link to="/contact" className="border border-paper/40 px-6 py-3 rounded-full font-medium hover:bg-paper hover:text-ink transition">
                        Book an Appointment
                    </Link>
                </div>
            </section>

            {/* Our Story modal */}
            <Modal isOpen={storyOpen} onClose={() => setStoryOpen(false)} title="Our Story">
                <p className="text-ink/60 mb-4">
                    House on the Rock began as a small gathering of believers committed to
                    seeing lives transformed by the gospel. Over the years, we've grown into a
                    diverse community united by worship, the Word, and genuine fellowship.
                </p>
                <p className="text-ink/60">
                    Our mission is simple: to help people encounter God, grow in faith, and
                    discover their purpose — together.
                </p>
            </Modal>
        </div>
    );
};

export default HomePage;
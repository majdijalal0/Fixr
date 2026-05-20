import electrician from './services/electrician.png'
import painter from './services/painter.png'
import plumber from './services/plumber.png'
import flooring from './services/flooring.png'
import appliance from './services/homeappliance.png'
import hvac from './services/hvac.png'
import gardening from './services/gardening.jpg'
import cleaning from './services/cleaning.jpg'
import carpentry from './services/carpentry.jpg'
import roofing from './services/roofing.jpg'


const services = [
    {
        id: 1,
        name: "Electrical",
        description: "Keep your home safe and powered. Our licensed electricians handle everything from flickering lights and faulty outlets to full panel upgrades and smart home installations. All work is up to code and fully insured.",
        image: electrician,
        icon: 'Zap'
    },
    {
        id: 2,
        name: "Painting",
        description: "Transform your living space with a fresh coat of color. We provide expert interior and exterior painting services, including wall preparation, priming, and clean, sharp edges. We use premium, low-VOC paints for a lasting finish.",
        image: painter,
        icon: 'Paintbrush'
    },
    {
        id: 3,
        name: "Plumbing",
        description: "From leaky faucets to emergency pipe repairs, our plumbers are on call to keep your water flowing. We specialize in drain cleaning, water heater maintenance, and bathroom fixture installations with a satisfaction guarantee.",
        image: plumber,
        icon: 'Droplets'
    },
    {
        id: 4,
        name: "Flooring",
        description: "Upgrade your walk with durable and beautiful flooring. Whether you prefer hardwood, luxury vinyl plank, tile, or laminate, our installers ensure a level, seamless fit that enhances your home’s value and comfort.",
        image: flooring,
        icon: 'Grid3X3'
    },
    {
        id: 5,
        name: "Appliance installation",
        description: "Bought a new fridge, dishwasher, or laundry set? Don't risk a DIY disaster. We provide professional hookups, leveling, and testing to ensure your high-end appliances run efficiently from day one.",
        image: appliance,
        icon: 'Refrigerator'
    },
    {
        id: 6,
        name: "Hvac",
        description: "Expert installation, maintenance, and repair for heating, ventilation, and air conditioning systems. Keep your home comfortable in every season.",
        image: hvac,
        icon: 'Wind'
    },
    {
        id: 7,
        name: "Carpentry",
        description: "From custom shelving and cabinetry to structural framing and deck repairs, our skilled carpenters deliver beautiful, durable, and custom wood craftsmanship tailored perfectly to your home.",
        image: carpentry,
        icon: 'Hammer'
    },
    {
        id: 8,
        name: "Cleaning",
        description: "Enjoy a pristine, sanitized living environment. Our professional deep-cleaning experts specialize in seasonal cleanups, routine maintenance, and high-impact sanitization for absolute peace of mind.",
        image: cleaning,
        icon: 'Sparkles'
    },
    {
        id: 9,
        name: "Gardening & Landscaping",
        description: "Boost your home's curb appeal with professional outdoor care. We handle lawn mowing, hedge shaping, weeding, and landscape design to keep your garden lush, green, and beautiful.",
        image: gardening,
        icon: 'Sprout'
    },
    {
        id: 10,
        name: "Roofing",
        description: "Shield your home from weather damage. Our roofers identify leaks, replace old shingles, perform gutter maintenance, and execute structural roof repairs with top-tier materials.",
        image: roofing,
        icon: 'Home'
    }
]

export default services
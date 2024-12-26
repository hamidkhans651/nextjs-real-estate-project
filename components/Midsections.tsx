"use client"

import React from 'react'
import { useState } from 'react';
import { useTheme } from 'next-themes';  // Import useTheme from next-themes


const Midsections = () => {
  const { theme } = useTheme();  // Get the current theme (light or dark)

  const [formData, setFormData] = useState({
    location: 'Chicago',
    email: 'redfin@redfin.com',
    phone: '',
    helpWith: 'I\'m interested in buying, selling or a free consult with a Redfin agent.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };
  return (
    <main>
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-black-900 text-white border-white' : 'bg-gray-100 text-black border-black'}`}  // Apply conditional styling based on theme
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Buy */}
            <div className="  border-solid border-2 shadow-2xl rounded-lg p-6 flex flex-col items-center text-center"
            >
              <img src="/assets/images/redfinagent.png" alt="Buy" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold  mb-4">Buy</h3>
              <p className=" mb-6">
                Redfin agents are among the most experienced in the industry and can help you win in today’s market.
              </p>
              <a href="#find-agent" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Find an agent
              </a>
            </div>

            {/* Card 2 - Sell */}
            <div className="border-solid border-2 shadow-2xl rounded-lg p-6 flex flex-col items-center text-center">
              <img src="/assets/images/Sell.png" alt="Sell" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold  mb-4">Sell</h3>
              <p className=" mb-6">
                We know how to price, market, and sell your home for top dollar. And we do it all for half the listing fee others often charge.
              </p>
              <a href="#learn-more" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                Learn more
              </a>
            </div>

            {/* Card 3 - Rent */}
            <div className="border-solid border-2 shadow-2xl rounded-lg p-6 flex flex-col items-center text-center">
              <img src="/assets/images/Rent.png" alt="Rent" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold  mb-4">Rent</h3>
              <p className=" mb-6">
                Whether you’re searching for apartments, condos, or rental homes, we make it easy to find a place you’ll love.
              </p>
              <a href="#rent-place" className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition duration-300">
                Explore rentals
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-black-900 text-white border-white' : 'bg-gray-100 text-black border-black'}`}  // Apply conditional styling based on theme
      >        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src="/assets/images/familypic.jpg"
              alt="Touring Homes"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right side - Text Content */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h2 className="text-3xl font-semibold  mb-4">
              Start touring homes, no strings attached
            </h2>
            <p className=" mb-6">
              Unlike many other agents, Redfin agents won't ask you to sign an exclusive commitment before they'll take you on a first tour.
            </p>
            <a
              href="#search-homes"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Search for homes
            </a>
          </div>
        </div>
      </section>
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-black-900 text-white border-white' : 'bg-gray-100 text-black border-black'}`}  // Apply conditional styling based on theme
      >        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Heading and Paragraph */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h2 className="text-4xl font-bold  mb-4">
              Talk to a Redfin agent
            </h2>
            <p className=" mb-6">
              You’ll be connected with an expert local agent—there’s no pressure or obligation.
            </p>
          </div>

          {/* Right side - Form */}
          <div className="lg:w-1/2 w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-sm font-semibold  mb-2 focus:outline-none">Where are you searching for homes?</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md  focus:outline-none  "
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md  focus:outline-none "
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold  focus:outline-none mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full p-3 border rounded-md  focus:outline-none "
                />
              </div>

              <div>
                <label htmlFor="helpWith" className="block text-sm font-semibold  mb-2">What can we help you with?</label>
                <textarea
                  id="helpWith"
                  name="helpWith"
                  value={formData.helpWith}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md  focus:outline-none "
                  rows={4}
                />
              </div>

              <button type="submit" className="w-full bg-blue-600  p-3 rounded-md hover:bg-blue-700 transition duration-300">
                Submit
              </button>

              <p className="text-xs 500 mt-2">
                You are creating a Redfin account and agree to our <a href="#" className="text-blue-500">privacy and policy</a>.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Midsections







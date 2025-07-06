import React from 'react'
import { Github, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
  
        <div className="text-lg font-semibold mb-4 md:mb-0">
          2025 <span className="text-blue-400">Job Portal</span>.
        </div>

        <div className="flex space-x-6">
          <a
            href="https://github.com/ranjeet229"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/ranjeet-kumar-1a5877336/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import './App.css'

function App() {
  return (
    <div>
      <header className='p-4'>
        <a href="" className='flex items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff0000" class="w-8 h-8 -rotate-90">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span className='text-red-600 font-bold text-xl'>airbnb</span>
        </a>
      </header>
    </div>
  )
}

export default App

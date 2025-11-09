
import Navbar from './components/custom/navbar.jsx'
import Button from './components/custom/button.jsx'
import SearchBar from './components/custom/searchbar.jsx'
function App() {
  

  return (
 <main>
      <Navbar />
      <Button  style="bg-white text-black shadow-lg shadow-red-500/50 w-42 rounded-md" fct={()=>{
        console.log('HELLO WORLD')
      }} title="HELLO WORLD" />
      {/* <SearchBar /> */}
 </main>
  )
}

export default App

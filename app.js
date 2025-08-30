import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient("https://wwcedhbbdoyrmquokyjj.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Y2VkaGJiZG95cm1xdW9reWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzYyNjUsImV4cCI6MjA3MTYxMjI2NX0.s29eO4ZQ74R6Jktn5zKZ-AiH6_QYC-_9WFqAS_m1kj4")

const toast=document.getElementById("toast")
function showToast(msg){toast.textContent=msg;toast.style.display="block";setTimeout(()=>toast.style.display="none",3000)}

const profilePic=document.getElementById("profilePic")
const dropdown=document.getElementById("dropdownMenu")
profilePic.onclick=()=>{dropdown.style.display=dropdown.style.display==="block"?"none":"block"}

async function logout(){await supabase.auth.signOut();showToast("Logged out");setTimeout(()=>window.location.href="login.html",1000)}
window.logout=logout

let currentUser=null
let intervalId=null

async function loadUser(){
  const { data:{ user } }=await supabase.auth.getUser()
  if(!user){window.location.href="login.html";return}
  currentUser=user
  const {data}=await supabase.from("profiles").select("*").eq("id",user.id).single()
  if(data){
    document.getElementById("usernameFlash").outerHTML=`<h2 id="username">${data.username||"Player"}</h2>`
    document.getElementById("pointsFlash").outerHTML=`<p id="points">Points: ${data.points}</p>`
    let rank="Player"
    if(data.points>=1000000) rank="🌌 God"
    else if(data.points>=10000) rank="👑 Crown"
    document.getElementById("rankFlash").outerHTML=`<p class="rank" id="rank">Rank: ${rank}</p>`
    profilePic.src=data.avatar_url||"https://www.tyvila.online/cdn/default-avatar.png"
    startPointsLoop(data.points)
  }
}
async function startPointsLoop(initialPoints){
  let points=initialPoints
  if(intervalId) clearInterval(intervalId)
  intervalId=setInterval(async()=>{
    points+=1
    document.getElementById("points").textContent="Points: "+points
    await supabase.from("profiles").update({points}).eq("id",currentUser.id)
  },1000)
}
async function addGamePoints(){
  const el=document.getElementById("points")
  let current=parseInt(el.textContent.replace(/\D/g,''))||0
  current+=120
  el.textContent="Points: "+current
  await supabase.from("profiles").update({points:current}).eq("id",currentUser.id)
}
async function loadGames(){
  try{
    const res=await fetch("https://www.tyvila.online/games/game-app/game.json")
    const games=await res.json()
    document.getElementById("gameCountFlash").outerHTML=`<p id="gameCount">Games Available: ${games.length}</p>`
    const grid=document.getElementById("gamesGrid")
    games.forEach(g=>{
      const card=document.createElement("div")
      card.className="gameCard"
      card.innerHTML=`
        <img src="${g.image}" alt="${g.title}">
        <div class="content">
          <h3>${g.title}</h3>
          <p>${g.description.substring(0,80)}...</p>
          <button>Play</button>
        </div>`
      card.querySelector("button").onclick=()=>{
        addGamePoints()
        window.location.href="games.html?game="+encodeURIComponent(g.title)
      }
      grid.appendChild(card)
    })
  }catch{showToast("Error loading games")}
}
loadUser()
loadGames()

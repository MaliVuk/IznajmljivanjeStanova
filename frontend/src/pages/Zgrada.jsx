import slika from '../assets/Zgrada.png'


export default function Zgrada(){
    return(
         <>
         <div style={{width: '100%', backgroundColor: '#26273f', textAlign: 'center', padding: '50px'}}>
                <img src={slika} style={{maxWidth: 600, border: '2px solid blue'}}/>
         </div>
         
         </>
    )
}
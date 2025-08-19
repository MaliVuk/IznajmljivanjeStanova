import slika from '../assets/ERA.png'

export default function Pocetna(){
    return(
         <>
         Dobrodošli <hr />
         <img src={slika} style={{maxWidth: 600, border: '2px solid red'}}/>
         </>
    )
}
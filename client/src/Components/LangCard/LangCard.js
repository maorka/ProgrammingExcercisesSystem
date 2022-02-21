
export default function LangCard(props) {
    
    return (
        <button  className="langCardMain">   
           <span className='langCard'>
               { props.prog_lang}</span>
         {<img src={props.icon} width="50" height="50" 
         className='icon' />}
        </button>
    )
}


import React, { Component } from 'react';  
import { BearCounter, Controls, FetchDataZustand, Pokemons } from './Test/bears';
import { item } from './Test/bears';
// import Pokemons from './Pokemons';


class Categorie extends Component {  
  constructor() {  
    super();  
    this.state = {  
      categories: [  
        {id: 1, value: "Angular"},  
        {id: 2, value: "React"},  
        {id: 3, value: "PHP"},  
        {id: 4, value: "Laravel"}  
      ],
      checkedItems: new Map()
    };  
    
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);  
   
  }

  
  //eerst laden van de standaard state?
  // Waar is de state beschikbaar? in meerdere app's?

  ///Change event handler, functie wordt aangeroepen als er een checkbox veranderd
  handleChange(event) {  
        var isChecked = event.target.checked;  
        var item = event.target.value;  
           
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        
        
        // Dit werkt gewoon. De state veranderd en wordt getoond in de console
        console.log(this.state); 
        // console.log(GetVacature())   
  }  
       
  handleSubmit(event) {  
    // Keuze is dus "on Submit" of "onChange"
    // this.setState({ vacatures : useStore((state) => state.vacatures)});
    console.log(this.state);  
    event.preventDefault();  
  }  
       
  render() {  
    return (  
      <div>  
        <h1> Examples of Multiple Checkbox in React </h1>

        <form onSubmit={this.handleSubmit}>  
             
          {  
            this.state.categories.map(item => (  
              <li>  
                <label>  
                  <input  
                    type="checkbox"  
                    value={item.id}  
                    onChange={this.handleChange}  
                  /> {item.value}  
                </label>  
              </li>  
            ))  
          }  
             
          <br/> 
          <input type="submit" value="Submit" />  
        </form>  
        <br/>

        {/* <BearCounter />  */}
        <Pokemons />

        {/* <Controls /> */}
      </div>  
    );  
  }  
}  
export default Categorie

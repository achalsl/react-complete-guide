import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
//while using Radium, enclose final export in Radium() (for eg. export default Radium(App))
// and wrap the primary div in a StyleRoot component
// import Radium, { StyleRoot } from 'radium';
import styled from 'styled-components';

class App extends Component {
    state = {
        persons: [
            { id: '1', name: 'Max', age: 28 },
            { id: '2', name: 'Manu', age: 26 },
            { id: '3', name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value',
        showPersons: false
    };

    switchNameHandler = (newName) => {
        // console.log('Was clicked!');
        // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
        this.setState({
            persons: [
                { name: newName, age: 28 },
                { name: 'Manu', age: 26 },
                { name: 'Stephanie', age: 27 }
            ]
        });
    };

    deletePersonHandler = (personIndex) => {
        // // because arrays and objects are reference types, the below approach is not recommended as we're editing the pointer to the original state
        // const persons = this.state.persons;

        // // this is a better way as slice would make a copy of the original array
        // const persons = this.state.persons.slice();

        // this is an ES6 approach which uses the spread operator, modern approach (recommended)
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };
    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        // // optional way to do the same thing as spread operator, neither approach is better or worse
        // // spread operator is more modern ES6 approach
        // const person = Object.assign({}, this.state.persons[personIndex])
        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;
        const persons = [...this.state.persons]
        persons[personIndex] = person;

        this.setState({
            persons: persons
        });
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    render() {

        // // with radium and inline styles the css properties are in the form of
        // // JS (camel case notation for properties and style object is written like a JS object,
        // // with styled-components we write plain CSS between the tagged template
        // const style = {
        //     backgroundColor: 'green',
        //     color: 'white',
        //     font: 'inherit',
        //     border: '1px solid blue',
        //     padding: '8px',
        //     cursor: 'pointer',
        //     ':hover': {
        //         backgroundColor: 'lightgreen',
        //         color: 'black'
        //     }
        // };

        //with styled components we write css as per css rules (semi-colon at the end, no camel case notation)
        //as all of the styles within the `` will be written into the head of the html file
        //for pseudo selectors use & before the selector to tell styled-components that it's a pseudo selector
        //you can add props to your styled-components to execute styles based on conditions outside of the component
        const StyledButton = styled.button`
            background-color: ${props => props.alt ? 'red' : 'green'};
            color: white;
            font: inherit;
            border: 1px solid blue;
            padding: 8px;
            cursor: pointer;
            
            &:hover {
                background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
                color: black;
            }
        `;

        let persons = null;
        if(this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={(this.deletePersonHandler.bind(this, index))}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}
                        />
                    })}
                </div>
            )
            // style.backgroundColor = 'red';
            // style[':hover'] = {
            //     backgroundColor: 'salmon',
            //     color: 'black'
            // };
        }

        const classes = [];
        if(this.state.persons.length <= 2) {
            classes.push('red');
        }
        if(this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p className={classes.join(' ')}>This is really working!</p>
                {/*use bind method (as used on click property of Person instance) instead of an arrow function for better efficiency*/}
                <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>
                    Toggle Persons
                </StyledButton>
                {persons}
            </div>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
}

export default App;
